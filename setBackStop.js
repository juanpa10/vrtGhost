const fs = require('fs');
const path = require('path');

const folder1 = 'screenshots_chrome';
const folder2 = 'screenshots_edge';
const outputPath = 'backstop_data';

// Leer los nombres de archivo en cada carpeta
const images1 = fs.readdirSync(folder1);
const images2 = fs.readdirSync(folder2);

// Filtrar archivos para obtener solo las imágenes PNG
const validImages1 = images1.filter(image => image.endsWith('.png'));
const validImages2 = images2.filter(image => image.endsWith('.png'));

// Crear escenarios solo para imágenes que existen en ambas carpetas
const scenarios = validImages1.reduce((acc, image) => {
  if (validImages2.includes(image)) {
    acc.push({
      "label": image,
      "url": '/'+folder2+'/'+image,
      "referenceUrl": '/'+folder1+'/'+image,
      "hideSelectors": [],
      "removeSelectors": [],
      "selectors": ["document"],
      "readyEvent": null,
      "delay": 500,
      "misMatchThreshold": 0.1
    });
  }
  return acc;
}, []);

// Configuración básica de BackstopJS
const backstopConfig = {
  "id": "project_comparison",
  "viewports": [{
    "label": "desktop",
    "width": 1920,
    "height": 1080
  }],
  "scenarios": scenarios,
  "paths": {
    "bitmaps_reference": path.join(outputPath, 'bitmaps_reference'),
    "bitmaps_test": path.join(outputPath, 'bitmaps_test'),
    "engine_scripts": path.join(outputPath, 'engine_scripts'),
    "html_report": path.join(outputPath, 'html_report'),
    "ci_report": path.join(outputPath, 'ci_report')
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
};

// Escribir el archivo de configuración
fs.writeFileSync('backstop.json', JSON.stringify(backstopConfig, null, 2));
console.log('backstop.json has been generated successfully.');