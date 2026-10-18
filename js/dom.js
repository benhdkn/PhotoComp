// Small DOM helpers shared across modules.

// Marks a toggle button as on or off, visually and for screen readers
export function setPressed(button, on) {
    button.classList.toggle('active', on);
    button.setAttribute('aria-pressed', on);
}

const messageTimers = {};

// Shows a short message in a .message element (announced by screen readers), cleared after a while
export function showMessage(id, text) {
    const el = document.getElementById(id);
    el.textContent = text;
    clearTimeout(messageTimers[id]);
    messageTimers[id] = setTimeout(() => { el.textContent = ''; }, 8000);
}
