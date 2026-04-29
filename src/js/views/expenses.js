import { getExpenses } from "../services/storage.js";

const container = document.getElementById('expenses-list');

const currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

function createCell(text) {
    const cell = document.createElement('span');
    cell.className = 'expenses-table__cell';
    cell.textContent = text;
    return cell;
}

function createRow(expense) {
    const row = document.createElement('div');
    row.className = 'expenses-table__row';
    row.dataset.id = expense.id;

    const categoryCell = document.createElement('span');
    categoryCell.className = 'expenses-table__cell';
    const pill = document.createElement('span');
    pill.className = 'expenses-table__pill';
    pill.textContent = expense.category;
    categoryCell.appendChild(pill);

    const actionsCell = document.createElement('span');
    actionsCell.className = 'expenses-table__cell expenses-table__cell--actions';

    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.className = 'btn-icon';
    btnEdit.dataset.action = 'edit';
    btnEdit.textContent = 'Editar';

    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.className = 'btn-icon btn-icon--danger';
    btnDelete.dataset.action = 'delete';
    btnDelete.textContent = 'Eliminar';

    actionsCell.append(btnEdit, btnDelete);

    row.append(
        createCell(expense.description),
        categoryCell,
        createCell(dateFormatter.format(new Date(expense.date))),
        createCell(currencyFormatter.format(expense.amount)),
        actionsCell,
    );

    return row;
}

export function renderExpenses() {
    const expenses = getExpenses();
    container.innerHTML = '';

    if (expenses.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'No hay gastos registrados.';
        container.appendChild(empty);
        return;
    }

    expenses.forEach((expense) => {
        container.appendChild(createRow(expense));
    });
}
