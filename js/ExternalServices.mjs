import { getTicker } from "./utils.mjs";

export default class ExternalServices {
    constructor(company, page) {
        this.company = company;
        this.page = page;
        this.ticker = getTicker(company);
    }

    // Build the API URL for company-related news articles
    get newsApiUrl() {
        return `https://gnews.io/api/v4/search?q=${this.company}&lang=en&max=3&apikey=48b4a45aec6008b3e2cf081e61499698`;
    }

    // Build the API URL for the company's stock data
    get stocksApiUrl() {
        return `https://api.twelvedata.com/quote?symbol=${this.ticker}&apikey=d6d3d3f4a2084714b0d62459c60c4591`;
    }

    // Fetch data from the appropriate API based on the page
    async getData() {
        try {
            let url;

            if (this.page === "news") {
                url = this.newsApiUrl;
            } else if (this.page === "stocks") {
                url = this.stocksApiUrl;
            } else {
                throw new Error(`Unknown page: ${this.page}`);
            }

            const response = await fetch(url);
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}