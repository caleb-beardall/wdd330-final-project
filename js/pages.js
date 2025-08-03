import {
    loadHeaderFooter,
    qs,
    setClick
} from "./utils.mjs"
import { loadNews } from "./news.mjs"
// import { loadStock } from "./stocks.mjs"

function handleCompanyClick(event) {
    const clicked = event.currentTarget;
    const container = clicked.closest("nav");
    const company = clicked.dataset.company;

    // Remove the active class from all company buttons
    const allButtons = container.querySelectorAll(".company-btn");
    allButtons.forEach(btn => btn.classList.remove("active"));
    clicked.classList.add("active");

    // Call appropriate handler based on which nav was clicked
    if (page === "news.html") {
        loadNews(company, "news");
    } else if (page === "stocks.html") {
        loadStock(company, "stocks");
    }
}

// Load reusable UI components (like <header> and <footer>)
await loadHeaderFooter();

// Determine current page from URL
const pathname = window.location.pathname;
const page = pathname.substring(pathname.lastIndexOf("/") + 1);

// Set default company and topic
const defaultCompany = "apple";
const defaultTopic = page.includes("news") ? "news" :
    page.includes("stocks") ? "stocks" : null;

// Remove the active class from all primary buttons
const primaryButtons = document.querySelectorAll(".primary-btn");
primaryButtons.forEach(btn => btn.classList.remove("active"));

if (defaultTopic === "news") {
    const newsButton = qs("#news-btn");
    newsButton.classList.add("active");
    loadNews(defaultCompany, defaultTopic);
} else if (defaultTopic === "stocks") {
    const stocksButton = qs("#stocks-btn");
    stocksButton.classList.add("active");
    loadStock(defaultCompany, defaultTopic);
}

// Attach event listeners to all company buttons
const allCompanyButtons = document.querySelectorAll(".company-btn");
allCompanyButtons.forEach(btn => setClick(btn, handleCompanyClick));