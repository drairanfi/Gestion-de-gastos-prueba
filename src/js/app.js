import { fillCategories } from './components/categorySelect.js';
import { renderExpenses } from './views/expenses.js';
import { openToCreate, openToEdit } from './components/expenseForm.js';
import { getExpenseById, deleteExpense } from './services/storage.js';
import { setFilter, clearFilters } from './components/filters.js';

fillCategories(document.getElementById('category'));
fillCategories(document.getElementById('filter-category'));
renderExpenses();

document.getElementById('btn-new-expense').addEventListener('click', openToCreate);

const toggleBtn = document.getElementById('btn-toggle-filters');
const filtersPanel = document.getElementById('filters-panel');
toggleBtn.addEventListener('click', () => {
    const isHidden = filtersPanel.classList.toggle('filters-panel--hidden');
    toggleBtn.setAttribute('aria-expanded', String(!isHidden));
});

const searchInput = document.getElementById('filter-search');
const categorySelect = document.getElementById('filter-category');
const dateFromInput = document.getElementById('filter-date-from');
const dateToInput = document.getElementById('filter-date-to');

searchInput.addEventListener('input', (event) => {
    setFilter('search', event.target.value);
    renderExpenses();
});

categorySelect.addEventListener('change', (event) => {
    setFilter('category', event.target.value);
    renderExpenses();
});

dateFromInput.addEventListener('change', (event) => {
    setFilter('dateFrom', event.target.value);
    renderExpenses();
});

dateToInput.addEventListener('change', (event) => {
    setFilter('dateTo', event.target.value);
    renderExpenses();
});

document.getElementById('btn-clear-filters').addEventListener('click', () => {
    clearFilters();
    searchInput.value = '';
    categorySelect.value = '';
    dateFromInput.value = '';
    dateToInput.value = '';
    renderExpenses();
});

document.getElementById('expenses-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const row = button.closest('[data-id]');
  const id = row.dataset.id;

  if (button.dataset.action === 'edit') {
    const expense = getExpenseById(id);
    if (expense) openToEdit(expense);
  } else if (button.dataset.action === 'delete') {
    const confirmed = confirm('¿Eliminar este gasto?');
    if (confirmed) {
      deleteExpense(id);
      renderExpenses();
    }
  }
});
