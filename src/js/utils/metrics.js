function isCurrentMonth(dateIso) {
  const date = new Date(dateIso);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth()
  );
}

export function totalCurrentMonth(expenses) {
  return expenses
    .filter((e) => isCurrentMonth(e.date))
    .reduce((acc, e) => acc + e.amount, 0);
}

export function transactionsCurrentMonth(expenses) {
  return expenses.filter((e) => isCurrentMonth(e.date)).length;
}

export function dailyAverageMonth(expenses) {
  const total = totalCurrentMonth(expenses);
  const currentDay = new Date().getDate();
  if (currentDay === 0) return 0;
  return total / currentDay;
}

export function topCategoryByExpense(expenses) {
  const monthExpenses = expenses.filter((e) => isCurrentMonth(e.date));
  if (monthExpenses.length === 0) return null;

  const totals = {};
  monthExpenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  let maxCategory = null;
  let maxValue = -Infinity;
  Object.keys(totals).forEach((cat) => {
    if (totals[cat] > maxValue) {
      maxValue = totals[cat];
      maxCategory = cat;
    }
  });

  return { category: maxCategory, total: maxValue };
}

export function totalsByCategory(expenses) {
  const totals = {};
  expenses
    .filter((e) => isCurrentMonth(e.date))
    .forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
  return totals;
}
