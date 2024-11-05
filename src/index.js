export function generaClaveAcceso(
  fecha,
  tipo_comprobante,
  ruc_emisor,
  tipo_ambiente,
  serie,
  secuencial,
  codigo_numerico,
  tipo_emision
) {
  if (fecha.length !== 8) {
    throw new Error("La fecha debe tener 8 digitos con el formato ddmmaaaa");
  }

  if (tipo_comprobante.length !== 2) {
    throw new Error(`El tipo de comprobante debe tener 2 digitos.
FACTURA 01
LIQUIDACIÓN DE COMPRA DE BIENES Y PRESTACIÓN DE SERVICIOS 03
NOTA DE CRÉDITO 04
NOTA DE DÉBITO 05
GUÍA DE REMISIÓN 06
COMPROBANTE DE RETENCIÓN 07`);
  }

  if (ruc_emisor.length !== 13) {
    throw new Error("El RUC debe tener 13 digitos");
  }

  if (tipo_ambiente !== "1" && tipo_ambiente !== "2") {
    throw new Error(`Tipo de ambiente. 
        1   Pruebas
        2   Producción`);
  }

  if (serie.length !== 6) {
    throw new Error("Serie debe tener 6 digitos");
  }

  if (secuencial.length !== 9) {
    throw new Error("Número del comprobante (secuencial) debe tener 9 digitos");
  }

  if (codigo_numerico.length !== 8) {
    throw new Error("Número del comprobante (secuencial) debe tener 9 digitos");
  }

  if (tipo_emision != 1) {
    throw new Error(`Tipo de emisión:
        1   Emisión normal`);
  }

  let claveAcceso =
    fecha +
    tipo_comprobante +
    ruc_emisor +
    tipo_ambiente +
    serie +
    secuencial +
    codigo_numerico +
    tipo_emision;

  // Verificar que la clave de acceso tenga 48 dígitos
  if (claveAcceso.length !== 48) {
    throw new Error("La clave de acceso debe tener exactamente 48 dígitos.");
  }

  // Convertir la clave de acceso en un array de números
  const digitos = claveAcceso.split("").map(Number);

  let factor = 2; // Iniciar con el factor 2
  let suma = 0;

  // Paso 1 y 2: Multiplicar cada dígito por el factor de ponderación
  for (let i = digitos.length - 1; i >= 0; i--) {
    suma += digitos[i] * factor;
    factor = factor === 7 ? 2 : factor + 1; // Ciclar el factor entre 2 y 7
  }

  // Paso 3: Calcular el residuo de la suma con módulo 11
  const residuo = suma % 11;

  // Paso 4: Obtener el dígito verificador
  let digitoVerificador;
  if (residuo === 10) {
    digitoVerificador = 1;
  } else if (residuo === 11) {
    digitoVerificador = 0;
  } else {
    digitoVerificador = 11 - residuo;
  }

  return `${claveAcceso}${digitoVerificador}` ;
}
