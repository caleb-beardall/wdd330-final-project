import {
    qs,
    setClick,
    getLocalStorage,
    setLocalStorage,
    loadHeaderFooter,
    updateActiveClass,
    toggleMenu
} from "./utils.mjs"
import { loadNews } from "./news.mjs"

// Pull the user's preferred company from LS
// If no preferred company is set, use apple
const defaultCompany = getLocalStorage("prefCompany-ls") || "apple";
const defaultTopic = "news";

// Handle user click to change company/topic
async function handleCompanyClick(event) {
    const clicked = event.currentTarget;
    const topic = clicked.dataset.topic;
    const company = clicked.id;

    // Update the company buttons' active class
    updateActiveClass("company-btn", `${company}`);

    // Update the user's preferred company in LS
    setLocalStorage("prefCompany-ls", company);

    try {
        // Load news articles for the selected company
        await loadNews(company, topic);
    } catch (error) {
        console.error(`Failed to load news for ${company}:`, error);
    }
}

// Initialization logic wrapped in async IIFE
(async function init() {
    try {
        await loadHeaderFooter();
        updateActiveClass("company-btn", `${defaultCompany}`);
        await loadNews(defaultCompany, defaultTopic);
    } catch (error) {
        console.error("Initialization failed:", error);
    }

    // Attach event listeners after DOM is ready
    const allCompanyButtons = document.querySelectorAll(".company-btn");
    allCompanyButtons.forEach(btn => setClick(btn, handleCompanyClick));
    const menuButton = qs("#menu");
    setClick(menuButton, toggleMenu);
})();