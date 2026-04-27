import { CATEGORIAS } from "../data/categorias.js";

export function llenarCategorias(selectElement) {
    CATEGORIAS.forEach((categoria) => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectElement.appendChild(option);
    });
}