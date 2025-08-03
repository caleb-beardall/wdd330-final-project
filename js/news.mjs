import ExternalServices from "./ExternalServices.mjs";
import ArticlesList from "./ArticlesList.mjs";

export async function loadNews(company, topic) {
    // Selects the parent element that will be injected with the list
    const listContainer = document.querySelector(".news-articles");

    // Show loading message
    listContainer.innerHTML = `<p class="loading-message">Loading news about ${company}...</p>`;

    try {
        // Fetch the news data
        const dataSource = new ExternalServices(company, topic);
        const data = await dataSource.getData();

        // Create the list of HTML to be injected using a template
        const listOfArticles = new ArticlesList(data, listContainer);
        listOfArticles.init();
    } catch (error) {
        // Show error message if something goes wrong
        listContainer.innerHTML = `<p class="error-message">Failed to load articles. Please try again.</p>`;
        console.error("Error loading news:", error);
    }
}