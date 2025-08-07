import ExternalServices from "./ExternalServices.mjs";
import ArticlesList from "./ArticlesList.mjs";

export async function loadNewsArticles(company, topic) {
    // Get the element that will display the list of articles
    const articlesContainer = document.querySelector(".news-articles");

    // Display loading message while fetching data
    articlesContainer.innerHTML = `<p class="loading-message">Loading ${company}'s news updates...</p>`;

    try {
        // Create a data source and fetch the news data
        const dataSource = new ExternalServices(company, topic);
        const data = await dataSource.getData();

        // Create ArticlesList instance and render articles directly
        const articlesList = new ArticlesList(data, articlesContainer);
        articlesList.renderList(data.articles);

    } catch (error) {
        // Display error message if fetch fails
        articlesContainer.innerHTML = `<p class="error-message">Failed to load news articles.</p>`;
        console.error("Error loading news:", error);
    }
}