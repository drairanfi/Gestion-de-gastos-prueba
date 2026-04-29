import { fillCategories } from './components/categorySelect.js';
import { renderExpenses } from './views/expenses.js';
import { openToCreate, openToEdit } from './components/expenseForm.js';
import { getExpenseById, deleteExpense } from './services/storage.js';

fillCategories(document.getElementById('category'));
renderExpenses();

document.getElementById('btn-new-expense').addEventListener('click', openToCreate);

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
