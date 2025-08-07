import { getTicker } from "./utils.mjs";

export default class ExternalServices {
    constructor(company, topic) {
        this.company = company;
        this.topic = topic;
        this.ticker = getTicker(company);
    }

    get newsApiUrl() {
        return `https://gnews.io/api/v4/search?q=${this.company}&lang=en&max=3&apikey=48b4a45aec6008b3e2cf081e61499698`;
    }

    get stocksApiUrl() {
        return `https://api.twelvedata.com/quote?symbol=${this.ticker}&apikey=d6d3d3f4a2084714b0d62459c60c4591`;
    }

    async getData() {
        try {
            let url;

            if (this.topic === "news") {
                url = this.newsApiUrl;
            } else if (this.topic === "stocks") {
                url = this.stocksApiUrl;
            } else {
                throw new Error(`Unknown topic: ${this.topic}`);
            }

            const response = await fetch(url);
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}