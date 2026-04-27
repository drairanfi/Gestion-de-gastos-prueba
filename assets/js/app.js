import { openModal } from "./components/modal.js";
import { llenarCategorias } from "./components/categoriaSelect.js";
import { renderGastos } from "./views/gastos.js";
import './components/formGasto.js';

const selectCategoria = document.getElementById('categoria');
llenarCategorias(selectCategoria);

renderGastos();

const btnNuevo = document.getElementById('btn-nuevo-gasto');
btnNuevo.addEventListener('click', () => {
  openModal();
});
