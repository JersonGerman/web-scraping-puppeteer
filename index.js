import puppetter from 'puppeteer';
import fs from 'fs/promises';

async function openWebPage() {
    const browser = await puppetter.launch({
        headless: false,
        slowMo: 400
    });
    const page = await browser.newPage();

    await page.goto('https://example.com');

    await browser.close();
}
// openWebPage();

async function captureScreenShot() {
    const browser = await puppetter.launch({
        headless: 'new',
    });
    const page = await browser.newPage();

    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
}
// captureScreenShot();

async function navigateWebPage() {
    const browser = await puppetter.launch({
        headless: false,
        slowMo: 400
    });
    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com');
    await page.click('a[href="/login"]');

    await new Promise(r => setTimeout(r, 5000));

    await browser.close();
}
// navigateWebPage();

async function getDataFromWebPage() {
    const browser = await puppetter.launch({
        headless: "new",
        // slowMo: 400
    });
    const page = await browser.newPage();

    // await page.goto('https://quotes.toscrape.com');
    await page.goto('https://example.com');

    const result = await page.evaluate(() => {
        const title = document.querySelector('h1').innerText;
        const description = document.querySelector('p').innerText;
        const more = document.querySelector('a').innerText;
        return {
            title,
            description,
            more
        }
    })

    console.log(result);

    await browser.close();
}
// getDataFromWebPage();

async function handDynamicWebPage() {
    const browser = await puppetter.launch({
        headless: false,
        slowMo: 400
    });
    const page = await browser.newPage();

    // await page.goto('https://quotes.toscrape.com');
    await page.goto('https://quotes.toscrape.com');

    const result = await page.evaluate(() => {
        const quotes = [...document.querySelectorAll('.quote')].map(e => {
            const quoteText = e.querySelector('.text').innerText;
            const author = e.querySelector('.author').innerText;
            const tags = [...e.querySelectorAll('.tags > .tag')].map(e => e.innerText)
            return { quoteText, author, tags }
        });
        return quotes
    })

    await fs.writeFile('quotes.json', JSON.stringify(result, null, 2));
    console.log(result);

    await browser.close();
}
// handDynamicWebPage();

async function userLogin(username, lastname) {
    const browser = await puppetter.launch({
        // headless: "new",
        headless: false,
        slowMo: 50
    });
    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com/');
    await page.click('a[href="/login"]');

    await page.type("#username", username);
    await page.type("#password", lastname);
    await page.click('input[type="submit"]');

    await new Promise(r => setTimeout(r, 3000))

    await page.click('a[href="/logout"]');

    await browser.close();
}
// setDataLogin("Alexander", "MiApellido");

async function searchRUC(nroRUC="") {
    const browser = await puppetter.launch({headless: "new"});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36')

    await page.goto('https://e-consultaruc.sunat.gob.pe/');
    // await page.click("#btnPorRuc");
    await page.type("#txtRuc", nroRUC.toString())
    await page.click("#btnAceptar");

    await page.waitForSelector(".panel-primary > .list-group");

    const datos = await page.evaluate(() => {
        const selector = ".panel-primary > .list-group > div:nth-child(1) > div > div:nth-child(2) > h4";
        const razonSocial = document.querySelector(selector).innerText;

        return {
            razonSocial: razonSocial.split(" - ")[1]
        }

    })

    console.log(datos);

    await browser.close();
}
// searchRUC(20603235780);

async function getProductListFallabella(){
    const browser = await puppetter.launch({
        headless: false,
        slowMo: 400
    });
    const page = await browser.newPage();

    await page.goto('https://www.falabella.com.pe/');
    await page.setViewport({width:1024, height: 754});


    const selector = "#testId-HamburgerBtn-toggle" ;
    await page.waitForSelector(selector);
    await page.click(selector);

    // await page.click(".SecondLevelCategories-module_thirdLevelCategory__2ZQFF > a");

    await new Promise(r => setTimeout(r,4000))
    await browser.close();
}
// getProductListFallabella();