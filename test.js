import { generaClaveAcceso } from "./src/index.js";

//const digitoVerificador = calcularDigitoVerificador(claveAcceso);
const claveAcceso = generaClaveAcceso(
  "03102024",
  "07",
  "1700001234001",
  "1",
  "001001",
  "123456789",
  "98765432",
  "1"
);

console.log(
  `Clave de acceso ${claveAcceso.clave}. Error: ${claveAcceso.error} `
);
