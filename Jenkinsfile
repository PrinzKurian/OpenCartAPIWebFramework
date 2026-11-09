// ═══════════════════════════════════════════════════════════════
// Jenkinsfile — Master CI/CD Pipeline
// Playwright TypeScript Framework
// Naveen Automation Labs
// ═══════════════════════════════════════════════════════════════
// Tests run from THIS repo (PrinzKurian/OpenCartAPIWebFramework),
// which the job checks out into the workspace root.
//
// ENVIRONMENT = "run up to environment" (same gate as .github/workflows/e2e.yml):
//   Prod  → Build → DEV → QA → STAGE → PROD (default: full pipeline)
//   stage → Build → DEV → QA → STAGE
//   QA    → Build → DEV → QA
//   dev   → Build → DEV
// PROD always waits for manual approval first ("Yes, Deploy!" or "Abort").
// A failed stage skips every stage after it.
//
// Reports per test stage:
//   1. PW HTML Report    → reports/html-report/
//   2. Allure Report     → reports-{env}/allure/
//   3. ReportingLabs     → reporting-labs/ (published only when the project produces it)
//
// Works on Linux/macOS agents (sh) and Windows agents (bat).
// ═══════════════════════════════════════════════════════════════

// True when the selected ENVIRONMENT reaches `target` in the promotion chain.
def runsUpTo(String target) {
    def chain = ['dev', 'QA', 'stage', 'Prod']
    return chain.indexOf(params.ENVIRONMENT ?: 'Prod') >= chain.indexOf(target)
}

// Pass one command per call: on Windows npm/npx/mvn are .cmd files, and a bat
// script that runs one without `call` never returns to its next line.
def runCmd(String cmd) {
    if (isUnix()) {
        sh cmd
    } else {
        bat cmd
    }
}

def installPlaywrightBrowsers() {
    // --with-deps installs Linux system packages; Windows agents don't need it.
    runCmd(isUnix() ? 'npx playwright install --with-deps chromium' : 'npx playwright install chromium')
}

// Secrets reach the tests as env vars from Jenkins credentials:
// config/.env.* is gitignored, so it does not exist in the workspace.
def runPlaywright(String envName, String loginCredsId, String baseUrlCredsId, String grepTag) {
    // Clear the previous stage's output so each stage reports only its own run.
    dir('allure-results') { deleteDir() }
    dir('reports') { deleteDir() }
    dir('test-results') { deleteDir() }

    withCredentials([
        usernamePassword(credentialsId: loginCredsId,
            usernameVariable: 'APP_USERNAME', passwordVariable: 'APP_PASSWORD'),
        string(credentialsId: baseUrlCredsId, variable: 'BASE_URL'),
        string(credentialsId: 'api-base-url', variable: 'API_BASE_URL'),
        string(credentialsId: 'api-token', variable: 'API_TOKEN'),
        string(credentialsId: 'oauth_client_id', variable: 'OAUTH_CLIENT_ID'),
        string(credentialsId: 'OAUTH_CLIENT_SECRET', variable: 'OAUTH_CLIENT_SECRET'),
        string(credentialsId: 'GRANT_TYPE', variable: 'GRANT_TYPE')
    ]) {
        withEnv(["ENV=${envName}"]) {
            def grepArg = grepTag ? " --grep \"${grepTag}\"" : ''
            runCmd("npx playwright test --project=chromium${grepArg}")
        }
    }
}

def publishReports(String envName, String label) {
    def allureDir = "reports-${envName}/allure"
    if (fileExists('allure-results')) {
        // Uses the project's pinned allure-commandline (devDependency); Java comes from the jdk tool.
        catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS', message: 'Allure report generation failed') {
            runCmd("npx allure generate allure-results --clean -o ${allureDir}")
        }
    }
    publishHTML(target: [
        reportName: "${label} - PW HTML Report",
        reportDir: 'reports/html-report',
        reportFiles: 'index.html',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
    ])
    publishHTML(target: [
        reportName: "${label} - Allure Report",
        reportDir: allureDir,
        reportFiles: 'index.html',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
    ])
    if (fileExists('reporting-labs/index.html')) {
        publishHTML(target: [
            reportName: "${label} - ReportingLabs Report",
            reportDir: 'reporting-labs',
            reportFiles: 'index.html',
            keepAll: true,
            alwaysLinkToLastBuild: true
        ])
    }
}

pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
        maven 'Maven-3.9'
        jdk 'JDK-21'
    }

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['Prod', 'stage', 'QA', 'dev'],
            description: 'Run up to environment. Prod (default) runs the full pipeline: dev → QA → stage → Prod (with approval)'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'smoke', 'regression', 'api-smoke'],
            description: 'Select test suite'
        )
    }

    environment {
        SLACK_CHANNEL = '#all-pwtesting'
        // playwright.config.ts runs headless, with retries and forbidOnly, only when CI is set.
        CI = 'true'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
    }

    stages {

        // ═════════════════════════════════════════════════
        // STAGE 1: BUILD APP + UNIT TESTS
        // ═════════════════════════════════════════════════
        stage('Build & Unit Tests') {
            steps {
                echo "========================================="
                echo "  Building App + Running Unit Tests"
                echo "========================================="
                dir('dev-app') {
                    git url: 'https://github.com/jglick/simple-maven-project-with-tests.git',
                        branch: 'master'
                    runCmd('mvn clean install -Dmaven.test.failure.ignore=true')
                }
            }
            post {
                always {
                    junit 'dev-app/target/surefire-reports/*.xml'
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 2: INSTALL PLAYWRIGHT DEPENDENCIES
        // ═════════════════════════════════════════════════
        stage('Install Dependencies') {
            steps {
                echo "========================================="
                echo "  Installing Playwright Dependencies"
                echo "========================================="
                runCmd('npm ci')
                installPlaywrightBrowsers()
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 3: DEPLOY DEV + SANITY
        // ═════════════════════════════════════════════════
        stage('Deploy to DEV') {
            steps {
                echo "========================================="
                echo "  Deploying to DEV..."
                echo "========================================="
                echo "DEV deployment complete ✅"
            }
        }

        stage('DEV - Sanity Tests') {
            steps {
                echo "========================================="
                echo "  Running SANITY @smoke on DEV"
                echo "========================================="
                runPlaywright('dev', 'dev-credentials', 'dev-base-url', '@smoke')
            }
            post {
                always {
                    publishReports('dev', 'DEV Sanity')
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 4: DEPLOY QA + REGRESSION
        // ═════════════════════════════════════════════════
        stage('Deploy to QA') {
            when { expression { runsUpTo('QA') } }
            steps {
                echo "========================================="
                echo "  Deploying to QA..."
                echo "========================================="
                echo "QA deployment complete ✅"
            }
        }

        stage('QA - Regression Tests') {
            when { expression { runsUpTo('QA') } }
            steps {
                echo "========================================="
                echo "  Running REGRESSION (all tests) on QA"
                echo "========================================="
                runPlaywright('qa', 'qa-credentials', 'qa-base-url', null)
            }
            post {
                always {
                    publishReports('qa', 'QA Regression')
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 5: DEPLOY STAGE + SANITY
        // ═════════════════════════════════════════════════
        stage('Deploy to STAGE') {
            when { expression { runsUpTo('stage') } }
            steps {
                echo "========================================="
                echo "  Deploying to STAGE..."
                echo "========================================="
                echo "STAGE deployment complete ✅"
            }
        }

        stage('STAGE - Sanity Tests') {
            when { expression { runsUpTo('stage') } }
            steps {
                echo "========================================="
                echo "  Running SANITY @smoke on STAGE"
                echo "========================================="
                // The Jenkins credential is saved with the ID 'stage-base-ur' (missing the final 'l').
                runPlaywright('stage', 'stage-credentials', 'stage-base-ur', '@smoke')
            }
            post {
                always {
                    publishReports('stage', 'STAGE Sanity')
                }
            }
        }

        // ═════════════════════════════════════════════════
        // STAGE 6: DEPLOY PROD + SMOKE (with approval)
        // Nested under one top-level stage because "Restart from Stage" only offers
        // top-level stages: any restart into PROD goes back through the approval.
        // ═════════════════════════════════════════════════
        stage('PROD') {
            when { expression { runsUpTo('Prod') } }
            stages {
                stage('Approval for PROD') {
                    steps {
                        input id: 'ProdApproval',
                            message: 'Deploy to PROD?',
                            ok: 'Yes, Deploy!',
                            submitter: 'admin,naveen,princekurian'
                    }
                }

                stage('Deploy to PROD') {
                    steps {
                        echo "========================================="
                        echo "  Deploying to PROD..."
                        echo "========================================="
                        echo "PROD deployment complete ✅"
                    }
                }

                stage('PROD - Smoke Tests') {
                    steps {
                        echo "========================================="
                        echo "  Running SMOKE @smoke on PROD"
                        echo "========================================="
                        runPlaywright('prod', 'prod-credentials', 'prod-base-url', '@smoke')
                    }
                    post {
                        always {
                            publishReports('prod', 'PROD Smoke')
                        }
                    }
                }
            }
        }
    }

    // ═════════════════════════════════════════════════════
    // POST — EMAIL + SLACK NOTIFICATIONS
    // ═════════════════════════════════════════════════════
    post {
        always {
            script {
                def buildStatus = currentBuild.currentResult
                def statusEmoji = buildStatus == 'SUCCESS' ? '✅' : '❌'
                def statusColor = buildStatus == 'SUCCESS' ? 'good' : 'danger'

                // Slack Notification
                slackSend(
                    channel: env.SLACK_CHANNEL,
                    color: statusColor,
                    message: """
🎭 *Playwright CI/CD Pipeline Report*

*Overall: ${statusEmoji} ${buildStatus}*
*Environment:* `${params.ENVIRONMENT}`
*Branch:* `${env.BRANCH_NAME ?: env.GIT_BRANCH ?: 'master'}`
*Build:* #${env.BUILD_NUMBER}
*Duration:* ${currentBuild.durationString.replace(' and counting', '')}

📊 <${env.BUILD_URL}|View Reports in Jenkins>
🔍 <${env.BUILD_URL}console|View Console Logs>
                    """
                )

                // Email Notification: goes to the user who triggered the build (Jenkins profile email)
                emailext(
                    recipientProviders: [requestor()],
                    subject: "🎭 CI/CD Pipeline — ${statusEmoji} ${buildStatus} — Build #${env.BUILD_NUMBER}",
                    mimeType: 'text/html',
                    body: """
                        <html>
                        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
                            <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; padding: 30px; text-align: center;">
                                    <h1 style="margin: 0; font-size: 24px;">🎭 Playwright CI/CD Dashboard</h1>
                                    <p style="margin: 8px 0 0; opacity: 0.8;">Master Pipeline Report</p>
                                    <span style="display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-top: 12px; background: ${buildStatus == 'SUCCESS' ? '#28a745' : '#dc3545'}; color: white;">
                                        ${statusEmoji} ${buildStatus}
                                    </span>
                                </div>
                                <div style="padding: 24px;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr><td style="padding: 10px; color: #666;">Environment</td><td style="padding: 10px; font-weight: bold;">${params.ENVIRONMENT}</td></tr>
                                        <tr><td style="padding: 10px; color: #666;">Build</td><td style="padding: 10px; font-weight: bold;">#${env.BUILD_NUMBER}</td></tr>
                                        <tr><td style="padding: 10px; color: #666;">Duration</td><td style="padding: 10px; font-weight: bold;">${currentBuild.durationString.replace(' and counting', '')}</td></tr>
                                        <tr><td style="padding: 10px; color: #666;">Triggered by</td><td style="padding: 10px; font-weight: bold;">${currentBuild.getBuildCauses()[0]?.shortDescription ?: 'Manual'}</td></tr>
                                    </table>
                                </div>
                                <div style="background: #f8f9fa; padding: 20px 24px; border-top: 1px solid #eee;">
                                    <h3 style="margin: 0 0 12px;">📊 Reports (3 per test stage)</h3>
                                    <p style="color: #666; font-size: 13px; margin: 0 0 12px;">Each test stage publishes PW HTML + Allure (+ ReportingLabs when present)</p>
                                    <p style="color: #666; font-size: 13px; margin: 0 0 12px;">Click below to open Jenkins build page → Reports in sidebar</p>
                                    <a href="${env.BUILD_URL}" style="display: inline-block; padding: 10px 20px; background: #1a1a2e; color: white; text-decoration: none; border-radius: 6px; margin: 4px;">📁 Open Jenkins Build</a>
                                    <a href="${env.BUILD_URL}console" style="display: inline-block; padding: 10px 20px; background: #6c757d; color: white; text-decoration: none; border-radius: 6px; margin: 4px;">🔍 Console Logs</a>
                                </div>
                                <div style="text-align: center; padding: 16px; color: #999; font-size: 12px; border-top: 1px solid #eee;">
                                    Naveen Automation Labs | Playwright Framework
                                </div>
                            </div>
                        </body>
                        </html>
                    """
                )
            }
        }
        success {
            echo '═══════════════════════════════════════════'
            echo '  PIPELINE: ✅ SUCCESS'
            echo '═══════════════════════════════════════════'
        }
        failure {
            echo '═══════════════════════════════════════════'
            echo '  PIPELINE: ❌ FAILED'
            echo '═══════════════════════════════════════════'
        }
    }
}
