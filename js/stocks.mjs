import ExternalServices from "./ExternalServices.mjs";
import StockCard from "./StockCard.mjs";

export async function loadStockCard(company, topic) {
    // Container where stock card will be displayed
    const parentElement = document.querySelector(".stock-container");

    // Show a loading message while fetching
    parentElement.innerHTML = `<p class="loading-message">Loading ${company}'s stock performance...</p>`;

    try {
        // Fetch news data from API
        const dataSource = new ExternalServices(company, topic);
        const data = await dataSource.getData();

        // Render the fetched stock card
        const stockCard = new StockCard(data, parentElement);
        stockCard.renderCard(data);

    } catch (error) {
        // Show an error message if the request fails
        parentElement.innerHTML = `<p class="error-message">Failed to load stock performance.</p>`;
        console.error("Error loading stock:", error);
    }
}