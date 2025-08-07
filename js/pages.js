import {
    qs,
    setClick,
    getLocalStorage,
    setLocalStorage,
    loadHeaderFooter,
    updateActiveClass,
    toggleMenu,
    getPage
} from "./utils.mjs"
import { loadNewsArticles } from "./news.mjs"
import { loadStockCard } from "./stocks.mjs"

// Get the user's preferred company from localStorage
// Defaults to "apple" if not set
const company = getLocalStorage("prefCompany-ls") || "apple";

// Determine the current topic based on the page (e.g., "news" or "stocks")
const topic = getPage();

// Load either news or stock data based on topic
async function loadContentByTopic(company, topic) {
    if (topic === "news") {
        await loadNewsArticles(company, topic);
    } else {
        await loadStockCard(company, topic);
    }
}

// Handle company button click to update content and state
async function handleCompanyClick(event) {
    const clicked = event.currentTarget;
    const company = clicked.id;

    // Set the active class on the selected company button
    updateActiveClass("company-btn", `${company}`);

    // Save the selected company to localStorage
    setLocalStorage("prefCompany-ls", company);

    try {
        // Load content for the selected company
        await loadContentByTopic(company, topic);

    } catch (error) {
        console.error(`Failed to load ${company}'s results:`, error);
    }
}

// Initialize header/footer, content, and event listeners
(async function init() {
    try {
        await loadHeaderFooter();
        updateActiveClass("company-btn", `${company}`);
        await loadContentByTopic(company, topic);

    } catch (error) {
        console.error("Initialization failed:", error);
    }

    // Attach click/touch event handlers to UI buttons
    const allCompanyButtons = document.querySelectorAll(".company-btn");
    allCompanyButtons.forEach(btn => setClick(btn, handleCompanyClick));

    const menuButton = qs("#menu");
    setClick(menuButton, toggleMenu);
})();