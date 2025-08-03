import {
    loadHeaderFooter,
    setClick,
    updateActiveClass
} from "./utils.mjs"
import { loadNews } from "./news.mjs"

// Set default company and topic
const defaultCompany = "apple";
const defaultTopic = "news";

// Handle user click to change company/topic
async function handleClick(event) {
    const clicked = event.currentTarget;
    const topic = clicked.dataset.topic;
    const company = clicked.id;

    // Update the company buttons' active class
    updateActiveClass("company-btn", `${company}`);

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
        updateActiveClass("primary-btn", "news-btn");
        await loadNews(defaultCompany, defaultTopic);
    } catch (error) {
        console.error("Initialization failed:", error);
    }

    // Attach event listeners after DOM is ready
    const allCompanyButtons = document.querySelectorAll(".company-btn");
    allCompanyButtons.forEach(btn => setClick(btn, handleClick));
})();