import ExternalServices from "./ExternalServices.mjs";
import StockCard from "./StockCard.mjs";

export async function loadStockCard(company, topic) {
    // Get the element that will display the list of articles
    const parentElement = document.querySelector(".stock-card");

    // Display loading message while fetching data
    parentElement.innerHTML = `<p class="loading-message">Loading ${company}'s stock performance...</p>`;

    try {
        // Create a data source and fetch the stock data
        const dataSource = new ExternalServices(company, topic);
        const data = await dataSource.getData();

        // Create the list of HTML to be injected using a template
        const stockCard = new StockCard(data, parentElement);
        stockCard.renderCard(data);

    } catch (error) {
        // Show error message if something goes wrong
        parentElement.innerHTML = `<p class="error-message">Failed to load stock performance.</p>`;
        console.error("Error loading stock:", error);
    }
}