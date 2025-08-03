// API Key: 0d6d17fe8da545d18fcbec1e55b416a5

export default class ExternalServices {
    constructor(company, topic) {
        this.company = company;
        this.topic = topic;
    }

    async getData() {
        try {
            // Create an empty string to store the API's URL
            let url;

            // Determine which API need to be accessed
            if (this.topic === "news") {
                url = `https://newsapi.org/v2/everything?q=${this.company}&language=en&sortBy=publishedAt&pageSize=10&apiKey=0d6d17fe8da545d18fcbec1e55b416a5`;
            } else if (this.topic === "stocks") {
                // In the future, fetch from a different API for stock data
                url = `https://newsapi.org/v2/everything?q=${this.company}&language=en&sortBy=publishedAt&pageSize=10&apiKey=0d6d17fe8da545d18fcbec1e55b416a5`;
            }

            // Prepare and return the API's .json data as a JS object
            const response = await fetch(url);
            const data = await response.json();
            return data;
        
        // Catch errors if there's a problem accessing the data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}