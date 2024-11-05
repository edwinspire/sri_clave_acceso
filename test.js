import { generaClaveAcceso } from "./src/index.js";

//const digitoVerificador = calcularDigitoVerificador(claveAcceso);
const claveAcceso = generaClaveAcceso(
  "03102024",
  "07",
  "1791984722001",
  "1",
  "001012",
  "000501756",
  "04001001",
  "1"
);

console.log(
  `El dígito verificador para la clave de acceso ${claveAcceso}`
);
