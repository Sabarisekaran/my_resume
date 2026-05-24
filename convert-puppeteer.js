const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const htmlFile = 'd:\\RESUME\\sabari_sekaran_resume.html';
const pdfFile = 'd:\\RESUME\\sabari_sekaran_resume.pdf';

(async () => {
  try {
    const htmlPath = path.resolve(htmlFile);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match A4 page dimensions
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1
    });
    
    // Load the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
    
    // Wait for fonts and styles to load
    await page.waitForTimeout(2000);
    
    // Generate PDF with proper margins
    await page.pdf({
      path: pdfFile,
      format: 'A4',
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      },
      printBackground: true
    });
    
    await browser.close();
    
    console.log(`PDF created successfully with full styling: ${pdfFile}`);
    process.exit(0);
  } catch (err) {
    console.error('Error creating PDF:', err);
    process.exit(1);
  }
})();
