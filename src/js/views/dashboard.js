import { getExpenses } from '../services/storage.js';
import {
  totalCurrentMonth,
  dailyAverageMonth,
  topCategoryByExpense,
  transactionsCurrentMonth,
  totalsByCategory,
} from '../utils/metrics.js';
import { renderChart } from '../components/chart.js';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  month: 'short',
  day: 'numeric',
});

function paintMetrics(expenses) {
  document.getElementById('metric-total').textContent =
    currencyFormatter.format(totalCurrentMonth(expenses));

  document.getElementById('metric-average').textContent =
    currencyFormatter.format(dailyAverageMonth(expenses));

  const top = topCategoryByExpense(expenses);
  document.getElementById('metric-category').textContent =
    top ? top.category : '—';

  document.getElementById('metric-transactions').textContent =
    transactionsCurrentMonth(expenses);
}

function paintRecent(expenses) {
  const list = document.getElementById('recent-list');
  list.innerHTML = '';

  const recent = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'Aún no hay gastos.';
    list.appendChild(empty);
    return;
  }

  recent.forEach((expense) => {
    const item = document.createElement('li');
    item.className = 'recent-container__item';

    const label = document.createElement('p');
    label.className = 'recent-container__item-label';
    label.textContent = `${expense.description} · ${dateFormatter.format(new Date(expense.date))}`;

    const value = document.createElement('p');
    value.className = 'recent-container__item-value';
    value.textContent = currencyFormatter.format(expense.amount);

    item.append(label, value);
    list.appendChild(item);
  });
}

export function initDashboard() {
  const expenses = getExpenses();
  paintMetrics(expenses);
  paintRecent(expenses);
  renderChart(document.getElementById('chart-container'), totalsByCategory(expenses));
}
