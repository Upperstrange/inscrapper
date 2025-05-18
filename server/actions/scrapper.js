import { chromium } from 'playwright';

export async function getImageSrc(pageUrl) {
  // Launch browser
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the page
    await page.goto(pageUrl);
    
    // Wait for the specific img tag and get its src
    const imgSrc = await page.locator('img.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x5yr21d.xl1xv1r.xh8yej3[referrerpolicy="origin-when-cross-origin"][alt=""]').getAttribute('src');
    
    // Return the src
    return imgSrc;
  } catch (error) {
    console.error('Error:', error);
    return null;
  } finally {
    // Close browser
    await browser.close();
  }
}