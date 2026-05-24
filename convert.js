const pdf = require('html-pdf');
const fs = require('fs');

const htmlFile = 'sabari_sekaran_resume.html';
const pdfFile = 'sabari_sekaran_resume.pdf';

const options = {
  format: 'A4',
  orientation: 'portrait',
  margin: {
    top: '0mm',
    right: '0mm',
    bottom: '0mm',
    left: '0mm'
  },
  type: 'pdf',
  quality: 100,
  timeout: 60000
};

fs.readFile(htmlFile, 'utf8', (err, html) => {
  if (err) {
    console.error('Error reading HTML file:', err);
    process.exit(1);
  }
  
  // Inject comprehensive print styles to preserve colors and styling
  const printStyles = `
  <style>
    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
      html { margin: 0 !important; padding: 0 !important; }
      body { 
        background: white !important; 
        margin: 0 !important; 
        padding: 0 !important; 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .page { 
        box-shadow: none !important; 
        border-radius: 0 !important; 
        max-width: 100% !important; 
        margin: 0 !important; 
        padding: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .header { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .sidebar { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .project-card { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .skill-tag { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .title-badge { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .experience-header { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
  </style>
  `;
  
  const modifiedHtml = html.replace('</head>', printStyles + '</head>');
  
  pdf.create(modifiedHtml, options).toFile(pdfFile, (err, res) => {
    if (err) {
      console.error('Error creating PDF:', err);
      process.exit(1);
    }
    console.log(`PDF created successfully with full CSS styling: ${pdfFile}`);
    process.exit(0);
  });
});
