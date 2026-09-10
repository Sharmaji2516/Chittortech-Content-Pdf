const puppeteer = require('puppeteer');
const path = require('path');

const brochures = [
  {
    htmlFile: 'brochure-template.html',
    outputPdf: 'ChittorTech_Services_Guide_2026.pdf'
  },
  {
    htmlFile: path.join('templates', 'website-development-brochure.html'),
    outputPdf: 'ChittorTech_Website_Development_Guide.pdf'
  },
  {
    htmlFile: path.join('templates', 'application-development-brochure.html'),
    outputPdf: 'ChittorTech_Application_Development_Guide.pdf'
  },
  {
    htmlFile: path.join('templates', 'google-play-publishing-brochure.html'),
    outputPdf: 'ChittorTech_Google_Play_Publishing_Guide.pdf'
  },
  {
    htmlFile: path.join('templates', 'seo-services-brochure.html'),
    outputPdf: 'ChittorTech_SEO_Services_Guide.pdf'
  },
  {
    htmlFile: path.join('templates', 'ai-solutions-brochure.html'),
    outputPdf: 'ChittorTech_AI_Solutions_Guide.pdf'
  },
  {
    htmlFile: path.join('templates', 'about-us-brochure.html'),
    outputPdf: 'ChittorTech_Company_Profile.pdf'
  }
];

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  
  for (const brochure of brochures) {
    const htmlPath = path.join(__dirname, brochure.htmlFile);
    const fileUrl = require('url').pathToFileURL(htmlPath).href;

    console.log(`Loading HTML template at: ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 0 });
    console.log('Waiting 8 seconds for Tailwind CDN to inject styles...');
    await new Promise(r => setTimeout(r, 8000));

    console.log(`Generating PDF: ${brochure.outputPdf}...`);
    await page.pdf({
      path: path.join(__dirname, brochure.outputPdf),
      format: 'A4',
      printBackground: true,
      timeout: 0,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });
    console.log(`Successfully generated ${brochure.outputPdf}`);
  }

  await browser.close();
  console.log('All PDFs generated successfully!');
}

generatePDF().catch(console.error);
