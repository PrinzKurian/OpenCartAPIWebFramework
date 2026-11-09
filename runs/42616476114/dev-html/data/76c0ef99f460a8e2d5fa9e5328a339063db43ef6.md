# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepagefix.spec.ts >> @smoke home page title test
- Location: tests/homepagefix.spec.ts:9:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "My Account"
Received: "Account Login"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - button "$ Currency " [ref=e7] [cursor=pointer]:
        - strong [ref=e8]: $
        - text: Currency
        - generic [ref=e9]: 
      - list [ref=e11]:
        - listitem [ref=e12]:
          - link "" [ref=e13] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
            - generic [ref=e14]: 
          - text: "123456789"
        - listitem [ref=e15]:
          - link " My Account" [ref=e16] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - generic [ref=e17]: 
            - text: My Account
        - listitem [ref=e19]:
          - link " Wish List (0)" [ref=e20] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - generic [ref=e21]: 
            - text: Wish List (0)
        - listitem [ref=e22]:
          - link " Shopping Cart" [ref=e23] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart
            - generic [ref=e24]: 
            - text: Shopping Cart
        - listitem [ref=e25]:
          - link " Checkout" [ref=e26] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout
            - generic [ref=e27]: 
            - text: Checkout
  - banner [ref=e28]:
    - generic [ref=e30]:
      - link "naveenopencart" [ref=e33] [cursor=pointer]:
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
        - img "naveenopencart" [ref=e34]
      - generic [ref=e36]:
        - textbox "Search" [ref=e37]
        - button "" [ref=e39] [cursor=pointer]:
          - generic [ref=e40]: 
      - button " 0 item(s) - $0.00" [ref=e43] [cursor=pointer]:
        - generic [ref=e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=e46]:
    - generic: 
    - list [ref=e48]:
      - listitem [ref=e49]:
        - link "Desktops" [ref=e50] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20
      - listitem [ref=e51]:
        - link "Laptops & Notebooks" [ref=e52] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=18
      - listitem [ref=e53]:
        - link "Components" [ref=e54] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=25
      - listitem [ref=e55]:
        - link "Tablets" [ref=e56] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=57
      - listitem [ref=e57]:
        - link "Software" [ref=e58] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=17
      - listitem [ref=e59]:
        - link "Phones & PDAs" [ref=e60] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=24
      - listitem [ref=e61]:
        - link "Cameras" [ref=e62] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=33
      - listitem [ref=e63]:
        - link "MP3 Players" [ref=e64] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=34
  - generic [ref=e65]:
    - list [ref=e66]:
      - listitem [ref=e67]:
        - link "" [ref=e68] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
          - generic [ref=e69]: 
      - listitem [ref=e70]:
        - link "Account" [ref=e71] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
      - listitem [ref=e72]:
        - link "Login" [ref=e73] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/login
    - generic [ref=e74]:
      - generic [ref=e75]: 
      - text: "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
    - generic [ref=e76]:
      - generic [ref=e78]:
        - generic [ref=e80]:
          - heading "New Customer" [level=2] [ref=e81]
          - paragraph [ref=e82]:
            - strong [ref=e83]: Register Account
          - paragraph [ref=e84]: By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
          - link "Continue" [ref=e85] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/register
        - generic [ref=e87]:
          - heading "Returning Customer" [level=2] [ref=e88]
          - paragraph [ref=e89]:
            - strong [ref=e90]: I am a returning customer
          - generic [ref=e91]:
            - generic [ref=e92]:
              - generic [ref=e93]: E-Mail Address
              - textbox "E-Mail Address" [ref=e94]
            - generic [ref=e95]:
              - generic [ref=e96]: Password
              - textbox "Password" [ref=e97]
              - link "Forgotten Password" [ref=e98] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten
            - button "Login" [ref=e99] [cursor=pointer]
      - complementary [ref=e100]:
        - generic [ref=e101]:
          - link "Login" [ref=e102] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/login
          - link "Register" [ref=e103] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/register
          - link "Forgotten Password" [ref=e104] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten
          - link "My Account" [ref=e105] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
          - link "Address Book" [ref=e106] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/address
          - link "Wish List" [ref=e107] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
          - link "Order History" [ref=e108] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
          - link "Downloads" [ref=e109] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/download
          - link "Recurring payments" [ref=e110] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/recurring
          - link "Reward Points" [ref=e111] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/reward
          - link "Returns" [ref=e112] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return
          - link "Transactions" [ref=e113] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/transaction
          - link "Newsletter" [ref=e114] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
  - contentinfo [ref=e115]:
    - generic [ref=e116]:
      - generic [ref=e117]:
        - generic [ref=e118]:
          - heading "Information" [level=5] [ref=e119]
          - list [ref=e120]:
            - listitem [ref=e121]:
              - link "About Us" [ref=e122] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4
            - listitem [ref=e123]:
              - link "Delivery Information" [ref=e124] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6
            - listitem [ref=e125]:
              - link "Privacy Policy" [ref=e126] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3
            - listitem [ref=e127]:
              - link "Terms & Conditions" [ref=e128] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5
        - generic [ref=e129]:
          - heading "Customer Service" [level=5] [ref=e130]
          - list [ref=e131]:
            - listitem [ref=e132]:
              - link "Contact Us" [ref=e133] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
            - listitem [ref=e134]:
              - link "Returns" [ref=e135] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return/add
            - listitem [ref=e136]:
              - link "Site Map" [ref=e137] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/sitemap
        - generic [ref=e138]:
          - heading "Extras" [level=5] [ref=e139]
          - list [ref=e140]:
            - listitem [ref=e141]:
              - link "Brands" [ref=e142] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/manufacturer
            - listitem [ref=e143]:
              - link "Gift Certificates" [ref=e144] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/voucher
            - listitem [ref=e145]:
              - link "Affiliate" [ref=e146] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=affiliate/login
            - listitem [ref=e147]:
              - link "Specials" [ref=e148] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/special
        - generic [ref=e149]:
          - heading "My Account" [level=5] [ref=e150]
          - list [ref=e151]:
            - listitem [ref=e152]:
              - link "My Account" [ref=e153] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - listitem [ref=e154]:
              - link "Order History" [ref=e155] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
            - listitem [ref=e156]:
              - link "Wish List" [ref=e157] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - listitem [ref=e158]:
              - link "Newsletter" [ref=e159] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
      - separator [ref=e160]
      - paragraph [ref=e161]:
        - text: Powered By
        - link "OpenCart" [ref=e162] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: naveenopencart © 2026
```

# Test source

```ts
  1  | import { test, expect } from '../src/fixtures/pagefixtures';
  2  | 
  3  | 
  4  | test.beforeEach(async ({ loginPage }) => {
  5  |     await loginPage.goToLoginPage();
  6  |     await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  7  | });
  8  | 
  9  | test('@smoke home page title test', async ({ homePage }) => {
  10 |     const pageTitle = await homePage.getPageTitle();
  11 |     console.log('home page title', pageTitle);
> 12 |     expect(pageTitle).toBe('My Account');
     |                       ^ Error: expect(received).toBe(expected) // Object.is equality
  13 | });
  14 | 
  15 | 
  16 | test('@smoke logout link exist test', async ({ homePage }) => {
  17 |     expect(await homePage.isLogoutLinkExist()).toBeTruthy();
  18 | });
  19 | 
  20 | 
  21 | test('@regression home page headers exist test', async ({ homePage }) => {
  22 |     let allHeaders = await homePage.getHomePageHeaders();
  23 |     console.log('home page headers: ', allHeaders);
  24 |     expect.soft(allHeaders).toHaveLength(4);
  25 |     expect.soft(allHeaders).toEqual([
  26 |         'My Account',
  27 |         'My Orders',
  28 |         'My Affiliate Account',
  29 |         'Newsletter'
  30 |     ]);
  31 | });
  32 | 
  33 | 
  34 | 
```