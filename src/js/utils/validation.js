import { CATEGORIES } from "../data/categories.js";

export function validateExpense(data) {
    const errors = {};

    if (!data.description || data.description.trim().length === 0) {
        errors.description = "La descripción es obligatoria.";
    }

    if (!data.amount || parseFloat(data.amount) <= 0) {
        errors.amount = "El monto es obligatorio y debe ser un número positivo.";
    }

    if (!data.date) {
        errors.date = 'La fecha es obligatoria.';
    } else {
        const enteredDate = new Date(data.date);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (Number.isNaN(enteredDate.getTime())) {
            errors.date = 'Fecha inválida.';
        } else if (enteredDate > today) {
            errors.date = 'La fecha no puede ser en el futuro.';
        }
    }

    if (!data.category || !CATEGORIES.includes(data.category)) {
        errors.category = "La categoría es obligatoria y debe ser válida.";
    }

    return errors;
}
