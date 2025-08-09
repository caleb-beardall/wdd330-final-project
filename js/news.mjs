import ExternalServices from "./ExternalServices.mjs";
import ArticlesList from "./ArticlesList.mjs";

export async function loadNewsArticles(company, topic) {
    // Container where news articles will be displayed
    const articlesContainer = document.querySelector(".news-articles");

    // Show a loading message while fetching
    articlesContainer.innerHTML = `<li class="loading-message">Loading ${company}'s news updates...</li>`;

    try {
        // Fetch news data from API
        const dataSource = new ExternalServices(company, topic);
        const data = await dataSource.getData();

        // Render the fetched articles
        const articlesList = new ArticlesList(data, articlesContainer);
        articlesList.renderList(data.articles);

    } catch (error) {
        // Show an error message if the request fails
        articlesContainer.innerHTML = `<p class="error-message">Failed to load news articles.</p>`;
        console.error("Error loading news:", error);
    }
}