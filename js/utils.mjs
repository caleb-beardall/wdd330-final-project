// DOM Utility Functions

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

// Sets the active class on one element by ID and clears it from the rest
export function updateActiveClass(className, idName) {
    const allButtons = document.querySelectorAll(`.${className}`);
    allButtons.forEach(btn => btn.classList.remove("active"));
    const activeElement = qs(`#${idName}`);
    activeElement.classList.add("active");
}

// Opens and closes the mobile menu
export function toggleMenu() {
    const drpdwnContainer = qs("#company-buttons");
    drpdwnContainer.classList.toggle("dropdown-container");
}

// Returns the name of the page the user is on ("news" or "stocks")
export function getPage() {
    const pathname = window.location.pathname;
    const lastPart = pathname.substring(pathname.lastIndexOf("/") + 1);
    const pageName = lastPart.replace(".html", "");
    return pageName;
}

// localStorage Helpers

// Gets and parses a value from localStorage
export function getLocalStorage(key) {
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


// Rendering Helpers

// For single HTML strings
export function renderHtml(html, parentElement) {
    parentElement.innerHTML = html;
}

// For template functions
export function renderWithTemplate(templateFunction, parentElement, data) {
    parentElement.innerHTML = templateFunction(data);
}

// Renders a list of HTML items
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin") {
    const htmlStrings = list.map(template);
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Loads a raw HTML file from the provided path
async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

// Renders header.html and footer.html into designated elements
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("https://caleb-beardall.github.io/wdd330-final-project/public/partials/header.html");
    const footerTemplate = await loadTemplate("https://caleb-beardall.github.io/wdd330-final-project/public/partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderHtml(headerTemplate, headerElement);
    renderHtml(footerTemplate, footerElement);
}


// Stock Ticker Utility

// Returns the company's stock ticker symbol
export function getTicker(company) {
    const map = {
        apple: "AAPL",
        google: "GOOGL",
        amazon: "AMZN",
        microsoft: "MSFT",
        tesla: "TSLA"
    };
    return map[company];
}

export function updatePrimaryLinks() {
    const basePath = window.location.pathname.includes("/pages/") ? "" : ".";
    document.querySelector("#news-btn a").href = `${basePath}/news.html`;
    document.querySelector("#stocks-btn a").href = `${basePath}stocks.html`;
}