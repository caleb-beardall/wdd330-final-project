import ExternalServices from "./ExternalServices.mjs";
import StockData from "./StockData.mjs";
import { setLocalStorage } from "./utils.mjs";


export async function loadStockCard(company, page, prevPerf) {

    // Container where stock card will be displayed
    const parentElement = document.querySelector(".stock-container");

    // Show a loading message while fetching
    parentElement.innerHTML = `<p class="message">Loading ${company}'s stock performance...</p>`;

    try {
        // Fetch stock data from API
        const dataSource = new ExternalServices(company, page);
        const data = await dataSource.getData();

        // Render the fetched stock card
        const stockData = new StockData(data, parentElement);
        stockData.renderCard(data, prevPerf);

        // Save current stock performance to localStorage
        const currentStock = [stockData.stock.close, stockData.stock.symbol];
        setLocalStorage("stockPerformance-ls", currentStock);

    } catch (error) {
        // Show an error message if the request fails
        parentElement.innerHTML = `<p class="message">Failed to load stock performance.</p>`;
        console.error("Error loading stock:", error);
    }
}