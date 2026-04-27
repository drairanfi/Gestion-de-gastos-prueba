import { CATEGORIAS } from "../data/categorias.js";

export function validarGasto(datos) {
    const errores = [];

    if (!datos.descripcion || datos.descripcion.trim().length === 0) {
        errores.descripcion = "La descripción es obligatoria.";
    }

    if (!datos.monto || parseFloat(datos.monto) <= 0) {
        errores.monto = "El monto es obligatorio y debe ser un número positivo.";
    }

    if (!datos.fecha) {
    errores.fecha = 'La fecha es obligatoria.';
  } else {
    const fechaIngresada = new Date(datos.fecha);
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999);
    if (Number.isNaN(fechaIngresada.getTime())) {
      errores.fecha = 'Fecha inválida.';
    } else if (fechaIngresada > hoy) {
      errores.fecha = 'La fecha no puede ser en el futuro.';
    }
  }

    if (!datos.categoria || !CATEGORIAS.includes(datos.categoria)) {
        errores.categoria = "La categoría es obligatoria y debe ser válida.";
    }

    return errores;
}