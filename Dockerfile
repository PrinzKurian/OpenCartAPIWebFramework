
# Must match the @playwright/test version in package-lock.json, otherwise the
# browsers baked into the image won't match what the test runner expects.
FROM mcr.microsoft.com/playwright:v1.64.1-noble

WORKDIR /app

ENV CI=true

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test", "--project=chromium"]