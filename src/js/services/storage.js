const KEY = 'expenses:v1';

export function getExpenses() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Error reading expenses:', error);
        return [];
    }
}

export function saveExpenses(expenses) {
    localStorage.setItem(KEY, JSON.stringify(expenses));
}

export function addExpense(data) {
    const expenses = getExpenses();
    const newExpense = {
        id: crypto.randomUUID(),
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date,
        createdAt: new Date().toISOString(),
    };
    expenses.push(newExpense);
    saveExpenses(expenses);
    return newExpense;
}

export function getExpenseById(id) {
    return getExpenses().find((e) => e.id === id);
}

export function updateExpense(id, data) {
    const expenses = getExpenses();
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) return null;

    expenses[index] = {
        ...expenses[index],
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date,
        updatedAt: new Date().toISOString(),
    };

    saveExpenses(expenses);
    return expenses[index];
}

export function deleteExpense(id) {
    const expenses = getExpenses().filter((e) => e.id !== id);
    saveExpenses(expenses);
}
