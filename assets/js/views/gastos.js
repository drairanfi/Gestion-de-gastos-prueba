import { obtenerGastos } from "../services/storage.js";

const contenedor =document.getElementById('lista-gastos');

const formateadorMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

const formateadorFecha = new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

function crearCelda(texto) {
    const celda = document.createElement('span');
    celda.className = 'expenses-table__cell';
    celda.textContent = texto;
    return celda;
}

function creaFila(gasto) {
    const fila = document.createElement('div');
    fila.className = 'expenses-table__row';
    fila.dataset.id = gasto.id;

    const celdaCategoria = document.createElement('span');
    celdaCategoria.className = 'expenses-table__cell';
    const pill =document.createElement('span');
    pill.className = 'expenses-table__pill';
    pill.textContent = gasto.categoria;
    celdaCategoria.appendChild(pill);
    
    fila.append(
        crearCelda(gasto.descripcion),
        celdaCategoria,
        crearCelda(formateadorFecha.format(new Date(gasto.fecha))),
        crearCelda(formateadorMoneda.format(gasto.monto)),
        );
     return fila;   
}


export function renderGastos() {
    const gastos = obtenerGastos();
    contenedor.innerHTML = '';

    if (gastos.length === 0) {
        const vacio = document.createElement('p');
        vacio.className = 'empty-state';
        vacio.textContent = 'No hay gastos registrados.';
        contenedor.appendChild(vacio);
        return;
    }

    gastos.forEach((gasto) => {
        contenedor.appendChild(creaFila(gasto));
    });
}