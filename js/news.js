import {
    loadHeaderFooter,
    setClick,
    updateActiveClass
} from "./utils.mjs"
import { loadNews } from "./news.mjs"

// Set default company and topic
const defaultCompany = "apple";
const defaultTopic = "news";


function handleClick(event) {
    const clicked = event.currentTarget;
    const topic = clicked.dataset.topic;
    const company = clicked.id;

    // Update the company buttons' active class
    updateActiveClass("company-btn", `${company}`);

    // Load news articles for the selected company
    loadNews(company, topic);
}

// Load reusable UI components (like <header> and <footer>)
await loadHeaderFooter();

// Update the primary buttons' active class
updateActiveClass("primary-btn", "news-btn");

// Load news articles for the default topic
loadNews(defaultCompany, defaultTopic);

// Attach event listeners to all company buttons
const allCompanyButtons = document.querySelectorAll(".company-btn");
allCompanyButtons.forEach(btn => setClick(btn, handleClick));