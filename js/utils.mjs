// Selects a single element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// Adds both click and touchend event listeners to an element
export function setClick(selector, callback) {
    const el = typeof selector === "string" ? qs(selector) : selector;
    el.addEventListener("touchend", (event) => {
        event.preventDefault();
        callback(event);
    });
    el.addEventListener("click", callback);
}

// Gets and parses a value from localStorage
export function getLocalStorage(key) {
    // If local storage returns null or undefined, return null. Else, return the parsed value
    const value = localStorage.getItem(key);
    if (value === null || value === undefined || value === "undefined") {
        return null;
    } else {
        return JSON.parse(value);
    }
}

// Sets a value in localStorage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Renders a list of HTML items
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin") {
    const htmlStrings = list.map(template);
    // Clears the parent element's contents
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Replaces an element's content with HTML
export function renderWithTemplate(template, parentElement) {
    parentElement.innerHTML = template;
}

// Fetches the template files
async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

// Renders header.html in #main-header and footer.html in #main-footer
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("https://caleb-beardall.github.io/wdd330-final-project/public/partials/header.html");
    const footerTemplate = await loadTemplate("https://caleb-beardall.github.io/wdd330-final-project/public/partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}

// Sets the active class on one element by ID and clears it from the rest
export function updateActiveClass(className, idName) {
    const allButtons = document.querySelectorAll(`.${className}`);
    allButtons.forEach(btn => btn.classList.remove("active"));
    const activeElement = qs(`#${idName}`);
    activeElement.classList.add("active");
}