import { validateExpense } from '../utils/validation.js';
import { openModal, closeModal } from './modal.js';
import { addExpense, updateExpense } from '../services/storage.js';
import { renderExpenses } from '../views/expenses.js';

const form = document.getElementById('expense-form');
const title = document.getElementById('modal-title');
const subtitle = document.querySelector('.modal__subtitle');

let editingId = null;

function readData() {
  const formData = new FormData(form);
  return {
    description: formData.get('description').trim(),
    amount: Number(formData.get('amount')),
    category: formData.get('category'),
    date: formData.get('date'),
  };
}

function clearErrors() {
  form.querySelectorAll('.form__error').forEach((span) => {
    span.textContent = '';
  });
}

function showErrors(errors) {
  Object.keys(errors).forEach((field) => {
    const span = form.querySelector(`[data-error-for="${field}"]`);
    if (span) span.textContent = errors[field];
  });
}

export function openToCreate() {
  editingId = null;
  form.reset();
  clearErrors();
  title.textContent = 'Nuevo gasto';
  subtitle.textContent = 'Registra un nuevo gasto.';
  openModal();
}

export function openToEdit(expense) {
  editingId = expense.id;
  clearErrors();
  form.elements.description.value = expense.description;
  form.elements.amount.value = expense.amount;
  form.elements.category.value = expense.category;
  form.elements.date.value = expense.date;
  title.textContent = 'Editar gasto';
  subtitle.textContent = 'Modifica los campos y guarda los cambios.';
  openModal();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const data = readData();
  const errors = validateExpense(data);

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  if (editingId) {
    updateExpense(editingId, data);
  } else {
    addExpense(data);
  }

  renderExpenses();
  form.reset();
  editingId = null;
  closeModal();
});
