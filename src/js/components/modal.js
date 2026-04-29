const modal = document.getElementById('expense-modal');

export function openModal() {
    modal.classList.remove('modal--hidden');
}

export function closeModal() {
    modal.classList.add('modal--hidden');
}

modal.addEventListener('click', (event) => {
    if (event.target.dataset.close !== undefined) {
        closeModal();
    }
});
