const fs = require('fs');
const path = require('path');
const resemble = require('resemblejs');

const folder1 = 'screenshots_5.80';
const folder2 = 'screenshots_3.42';
const reportFolder = 'path_to_reports';
const backstopFolder = '../backstop_data/html_report/index.html';


const compareImages = (img1, img2, reportPath, imageName) => {
    return new Promise((resolve, reject) => {
      resemble(img1)
        .compareTo(img2)
        .ignoreColors()
        .onComplete((data) => {
          const reportFileName = `${imageName.replace(/\.[^/.]+$/, "")}_report.html`;
          const individualReportPath = `${reportPath}/${reportFileName}`;
          const reportOutput = `
  <div>
    <h2>${imageName}</h2>
    <div style="display: flex; justify-content: space-around;">
      <div>
        <h3>Version 1</h3>
        <img src="../${folder1}/${imageName}" alt="Version 1 Image" style="width: 45%;">
      </div>
      <div>
        <h3>Version 2</h3>
        <img src="../${folder2}/${imageName}" alt="Version 2 Image" style="width: 45%;">
      </div>
    </div>
    <img src="${data.getImageDataUrl()}" alt="Differences" />
  </div>
`;
          fs.writeFileSync(individualReportPath, reportOutput);
          resolve(reportFileName);
        });
    });
  };
  
  // Función para generar el índice HTML
  const generateIndex = (reports, reportFolder) => {
    let links = reports.map(report => `<li><a href="${reportFolder}/${report}">${report.replace('.html','')}</a></li>`).join('\n');
    let indexContent = `
      <html>
      <head><title>Reportes VRT</title></head>
      <body>
        <h1>Rerpotes:</h1>
        <h3>Rerpote Backstop:</h1>
        <a href="${reportFolder}/${backstopFolder}">REPORTE BACKSTOP</a>
        <h3>Rerpotes Resemble:</h1>
        <ul>${links}</ul>
      </body>
      </html>
    `;
    fs.writeFileSync(`./index.html`, indexContent);
  };
  
  // Función para leer y procesar carpetas
  const processFolders = async (folder1, folder2, reportFolder) => {
    const reports = [];
    const files1 = fs.readdirSync(folder1);
    const files2 = fs.readdirSync(folder2);
  
    const promises = files1.filter(file => files2.includes(file)).map(file => {
      return compareImages(
        path.join(folder1, file),
        path.join(folder2, file),
        reportFolder,
        file
      );
    });
  
    Promise.all(promises).then((completedReports) => {
      generateIndex(completedReports, reportFolder);
    }).catch(error => console.error("Error during image comparison:", error));
  };
  
  // Iniciar el proceso
  processFolders(folder1, folder2, reportFolder);