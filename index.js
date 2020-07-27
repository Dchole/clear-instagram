import { config } from "dotenv";
import puppeteer from "puppeteer";

config();
const iPhoneX = puppeteer.devices["iPhone X"];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.emulate(iPhoneX);

  await page.goto("https://www.instagram.com/");
  await page
    .waitForXPath(
      '//*[@id="react-root"]/section/main/article/div/div/div/div[2]/button'
    )
    .then(btn => btn.click());

  await page.waitForSelector('input[name="username"]');

  await page.type('input[name="username"]', process.env.IG_USERNAME);
  await page.type('input[name="password"]', process.env.IG_PASSWORD);

  await page.click('form button[type="submit"]');

  await page
    .waitForXPath('//*[@id="react-root"]/section/main/div/div/div/button')
    .then(btn => btn.click());

  await page
    .waitForXPath("/html/body/div[4]/div/div/div/div[3]/button[2]")
    .then(cancelBtn => cancelBtn?.click());

  await page
    .waitForXPath(
      '//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a'
    )
    .then(account => account.click());

  for (let i = 0; i < 33; i++) {
    await page
      .waitForXPath(
        '//*[@id="react-root"]/section/main/div/div[4]/article/div/div/div[1]/div[1]/a'
      )
      .then(post => post.click());

    await page
      .waitForXPath(
        '//*[@id="react-root"]/section/main/div/div/article/div[1]/button'
      )
      .then(options => options.click());

    await page
      .waitForXPath("/html/body/div[4]/div/div/div/div/button[1]")
      .then(deleteBtn => deleteBtn.click());

    await page
      .waitForXPath("/html/body/div[4]/div/div/div/div[2]/button[1]")
      .then(confirmDeleteBtn => confirmDeleteBtn.click());

    await page.waitFor(3000);
  }

  await browser.close();
})();
