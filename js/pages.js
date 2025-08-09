import {
    qs,
    setClick,
    updateActiveClass,
    toggleMenu,
    getPage,
    getLocalStorage,
    setLocalStorage,
    loadHeaderFooter
} from "./utils.mjs";
import { loadNewsArticles } from "./news.mjs";
import { loadStockCard } from "./stocks.mjs";

const companyStorageKey = "prefCompany-ls";
let company = getLocalStorage(companyStorageKey) || "apple";
const page = getPage();

// Load content based on current page and company
async function loadContentByPage(company, page) {
    if (page === "news") {
        await loadNewsArticles(company, page);
    } else {
        await loadStockCard(company, page);
    }
}

// Handle user clicking a company button
async function handleCompanyClick(event) {
    const clicked = event.currentTarget;
    company = clicked.id;

    // Update UI active class for buttons
    updateActiveClass("company-btn", company);

    // Save preference for future visits
    setLocalStorage(companyStorageKey, company);

    // Load news or stocks for new company
    await loadContentByPage(company, page);
}

// Immediately Invoked Function Expression(IIFE) to initialize the page:
(async function init() {
    try {
        await loadHeaderFooter();
        updateActiveClass("company-btn", company);
        await loadContentByPage(company, page);

        // Attach click/touch handlers to company buttons
        const allCompanyButtons = document.querySelectorAll(".company-btn");
        allCompanyButtons.forEach(btn => setClick(btn, handleCompanyClick));

        // Attach click/touch handler to menu button for mobile nav
        setClick(qs("#menu"), toggleMenu);
    } catch (error) {
        console.error("Initialization failed:", error);
    }
})();