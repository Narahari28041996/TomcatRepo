import { test,expect } from "@playwright/test";
let page;

test.beforeAll(async ({browser}) => {
    page=await browser.newPage();
    await page.goto("https://demoblaze.com/");
    await expect(page).toHaveURL("https://demoblaze.com/");
    //Login
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("pavanol");
    await page.locator("#loginpassword").fill("test@123");
    await page.locator("//button[text()='Log in']").click();
});

test.afterAll(async ()=>{
    await page.locator("#logout2").click();
})

    //Homepage
    test("Homepage Test",async () => {
        const products=await page.$$(".hrefch");
        expect(products).toHaveLength(9);  
    });

test("Add Product to the Cart Test",async () => {
    //Add Product to Cart
    await page.locator("//a[normalize-space()='Samsung galaxy s6']").click();
    await page.locator("//a[normalize-space()='Add to cart']").click();

    //Verify that the product added alert box is accepted
    page.on('dialog',async dialog=>{
        expect(dialog.message()).toContain("Product added.");
        await dialog.accept();
    })
})