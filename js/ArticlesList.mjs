
import { renderListWithTemplate } from "./utils.mjs";

// Create the HTML template and fill it with the API's data
function newsArticleTemplate(article) {
    return `
    <li class="news-article">
        <img src="${article.urlToImage}" alt="Article image" class="article-image" />
        <div class="article-content">
            <a href="${article.url}" class="article-link">${article.title}</a>
            <p class="article-desc">${article.description}</p>
        </div>
    </li>
    `;
}

export default class ArticlesList {
    constructor(data, element) {
        this.data = data;
        this.element = element;
    }

    // Initiating the list of articles
    init() {
        const list = this.data.articles;
        this.renderList(list);
    }

    // Rendering the initiated list using the renderListWithTemplate function
    renderList(list) {
        renderListWithTemplate(newsArticleTemplate, this.element, list);
    }
}