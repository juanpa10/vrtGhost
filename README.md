# README - Comparación de Funcionalidades de Ghost

Este proyecto facilita la comparación visual de las funcionalidades entre las versiones 3.42 y 5.80 de Ghost utilizando capturas de pantalla.

## Prerrequisitos

- **Node.js**: Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo desde [Node.js official website](https://nodejs.org/).
- **Resemble.js**: Necesitas tener Resemble.js instalado. Puedes instalarlo mediante npm con el comando:
  ```bash
  npm install resemblejs
  ```
- **Backstop.js**: Necesitas tener Backstop.js instalado. Puedes instalarlo mediante npm con el comando:
   ```bash
   npm install -g backstopjs
   ```
## Configuración Inicial

### Paso 1: Organizar Capturas de Pantalla

- **Para Ghost versión 3.42:**
  - Crea una carpeta llamada `screenshots_3.42` en la raíz del proyecto.
  - Almacena todas las capturas de pantalla de la versión 3.42 de Ghost en esta carpeta.

- **Para Ghost versión 5.80:**
  - Crea una carpeta llamada `screenshots_5.80` en la raíz del proyecto.
  - Almacena todas las capturas de pantalla de la versión 5.80 de Ghost en esta carpeta.

### Paso 2: Ejecutar Scripts de Configuración y Pruebas

- Abre una terminal o línea de comandos.
- Navega hasta el directorio raíz de tu proyecto.
- Ejecuta los siguientes comandos en orden:

  ##### Compara las capturas de pantalla para Resemblejs
  ```bash
  node myComparisonScript.js       
  ```
  ##### Configura BackstopJS
  ```bash
  node setBackStop.js              
  ```
  ##### Crea referencias para BackstopJS
  ```bash
  backstop reference               
  ```
  ##### Ejecuta las pruebas de BackstopJS
  ```bash
  backstop test                    
  ```


### Paso 3: Abrir reporte html


- Abre el archivo index.html en la raiz del proyecto.
- En esta pagina deberías poder ver el reporte tanto de Resemble como de Backstop.


