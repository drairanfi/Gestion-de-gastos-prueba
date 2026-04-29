import { CATEGORIES } from "../data/categories.js";

export function fillCategories(selectElement) {
    CATEGORIES.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        selectElement.appendChild(option);
    });
}
