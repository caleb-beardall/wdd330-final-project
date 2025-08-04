// GNews Key: 48b4a45aec6008b3e2cf081e61499698

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
                url = `https://gnews.io/api/v4/search?q=${this.company}&lang=en&max=10&apikey=48b4a45aec6008b3e2cf081e61499698`;
            } else if (this.topic === "stocks") {
                // In the future, fetch from a different API for stock data
                url = `https://gnews.io/api/v4/search?q=${this.company}&lang=en&max=10&apikey=48b4a45aec6008b3e2cf081e61499698`;
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