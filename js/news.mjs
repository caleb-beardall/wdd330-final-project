import { renderHtml } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import NewsData from "./NewsData.mjs";

// Holds the current list of articles fetched from the API
let currentArticles = [];

// Event handler for when a news article list item is clicked.
function handleArticleClick(event) {
    const li = event.target.closest(".news-article");
    if (!li) return;

    // Get article id from data attribute
    const id = li.dataset.id;
    // Find article data
    const article = currentArticles.find(a => a.id === id);
    if (!article) {
        console.error("Article not found:", id);
        return;
    }
    // console.log("Clicked article id:", id);

    // Render full article detail, replacing the article list
    const container = document.querySelector(".news-articles");
    renderHtml(articleDetailTemplate(article), container);
    // console.log("Article data:", article);
}

// Returns HTML string representing a detailed article view.
function articleDetailTemplate(article) {
    return `
    <article class="article-detail">
        <img src="${article.image}" alt="${article.title}" />
        <div class="detail-content">
            <h2>${article.title}</h1>
            <p><em>Published on: ${new Date(article.publishedAt).toLocaleString()}</em></p>
            <p>${article.content}</p>
            <p><strong>Source:</strong> <a href="${article.source.url}" target="_blank" rel="noopener">${article.source.name}</a> | <a href="${article.url}" target="_blank" rel="noopener">Read full article on original site</a></p>
        </div>
    </article>
  `;
}

// Fetches news articles for the specified company and page.
export async function loadNewsArticles(company, page) {
    const articlesContainer = document.querySelector(".news-articles");

    // Show loading message while fetching data
    articlesContainer.innerHTML = `<li class="message">Loading ${company}'s news updates...</li>`;

    try {
        const dataSource = new ExternalServices(company, page);
        const data = await dataSource.getData();

        const newsData = new NewsData(data, articlesContainer);
        currentArticles = newsData.articles;

        // Attach ONE click listener to the container for event delegation
        if (!articlesContainer.dataset.listenerAdded) {
            articlesContainer.addEventListener("click", handleArticleClick);
            articlesContainer.dataset.listenerAdded = "true";
        }

        return currentArticles;
    } catch (error) {
        // Show error message and log to console on failure
        articlesContainer.innerHTML = `<li class="message">Failed to load news articles.</li>`;
        console.error("Error loading news:", error);
    }
}