import { validarGasto } from "../utils/validacion.js";
import { closeModal } from "./modal.js";
import { agregarGasto } from "../services/storage.js";
import { renderGastos } from "../views/gastos.js";

const form = document.getElementById('form-gasto');

function leerDatos() {
    const formData = new FormData(form);
    return {
    descripcion: formData.get('descripcion').trim(),
    monto: Number(formData.get('monto')),
    categoria: formData.get('categoria'),
    fecha: formData.get('fecha'),
  };
}

function limpiarErrores() {
  form.querySelectorAll('.form__error').forEach((span) => {
    span.textContent = '';
  });
}

function mostrarErrores(errores) {
  Object.keys(errores).forEach((campo) => {
    const span = form.querySelector(`[data-error-for="${campo}"]`);
    if (span) span.textContent = errores[campo];
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  limpiarErrores();

  const datos = leerDatos();
  const errores = validarGasto(datos);

  if (Object.keys(errores).length > 0) {
    mostrarErrores(errores);
    return;
  }

  agregarGasto(datos);
  form.reset();
  closeModal();
  renderGastos();
});