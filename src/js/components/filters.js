const state = {
    search: '',
    category: '',
    dateFrom: '',
    dateTo: '',
};

export function getFilters() {
    return { ...state };
}

export function setFilter(key, value) {
    state[key] = value;
}

export function clearFilters() {
    state.search = '';
    state.category = '';
    state.dateFrom = '';
    state.dateTo = '';
}

export function applyFilters(expenses) {
    return expenses.filter((expense) => {
        if (state.search) {
            const query = state.search.toLowerCase();
            if (!expense.description.toLowerCase().includes(query)) return false;
        }
        if (state.category && expense.category !== state.category) return false;
        if (state.dateFrom && expense.date < state.dateFrom) return false;
        if (state.dateTo && expense.date > state.dateTo) return false;
        return true;
    });
}
