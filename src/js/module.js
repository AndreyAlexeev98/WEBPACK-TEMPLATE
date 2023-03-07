export function toggleClass(selectorElement, className) {
    const elem = document.querySelector(selectorElement);
    elem.classList.toggle(className);
};