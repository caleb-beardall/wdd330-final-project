import { renderListWithTemplate } from "./utils.mjs";

/*
{
  "totalArticles": 156092,
  "articles": [
    {
      "id": "7fe0ec9c08915925134b6a3f547c8f09",
      "title": "Apple might be building its own AI ‘answer engine’",
      "description": "Apple is reportedly working to create a lightweight competitor to ChatGPT.",
      "content": "In Brief\nApple has formed a new team to build a ChatGPT-like app, according to according to Bloomberg’s Mark Gurman.\nThis team — reportedly called Answers, Knowledge, and Information — is working to build an “answer engine” that can respond to questi... [577 chars]",
      "url": "https://techcrunch.com/2025/08/03/apple-might-be-building-its-own-ai-answer-engine/",
      "image": "https://techcrunch.com/wp-content/uploads/2025/01/apple-intelligence-iphone-mac.jpg?resize=1200,800",
      "publishedAt": "2025-08-03T21:49:00Z",
      "source": {
        "id": "732b46cdef66b68ee2fbc940e79f81de",
        "name": "TechCrunch",
        "url": "https://techcrunch.com"
      }
    },
    {
      "id": "ad08dd277d2b43591dadf18bafdc0516",
      "title": "After Being In Development For 10 Years, Jason Momoa's Epic Historical Drama Is Now Streaming",
      "description": "Jason Momoa of Aquaman and Fast & Furious acclaim stars in a brand new & acclaimed historical war series now streaming exclusively on Apple TV+.",
      "content": "Jason Momoa of Aquaman and Fast & Furious acclaim stars in a brand new historical war series now streaming exclusively on Apple TV+. Not only is Momoa the star of the series, but he is also an executive producer and co-creator of what many consider o... [2241 chars]",
      "url": "https://screenrant.com/jason-momoa-chief-of-war-apple-tv-plus-streaming-recommendation/",
      "image": "https://static1.srcdn.com/wordpress/wp-content/uploads/2025/05/chief-of-war-trailer-jason-momoa-leads-historical-epic-series-with-stunning-battles-a-fight-with-a-shark.jpg",
      "publishedAt": "2025-08-03T20:30:20Z",
      "source": {
        "id": "6b8b6fae575a37200ef9ef50109518f5",
        "name": "Screen Rant",
        "url": "https://screenrant.com"
      }
    },
    {
      "id": "b01a594acd956036c362b94fc120cc9a",
      "title": "Apple's incorrect assumption about the public and AI chatbots is holding Siri back",
      "description": "Apple's problem improving Siri with AI comes down to one incorrect assumption about consumers.",
      "content": "Power On newsletter. For some reason, perhaps for self-preservation, some Apple employees in the tech giant's AI group came to the conclusion that there was no reason why Apple should develop a ChatGPT-style chatbot for the iPhone. There are times wh... [4123 chars]",
      "url": "https://www.phonearena.com/news/apple-needs-ai-chatbot-replacing-siri_id172851",
      "image": "https://m-cdn.phonearena.com/images/article/172851-wide-two_1200/Apples-incorrect-assumption-about-the-public-and-AI-chatbots-is-holding-Siri-back.jpg",
      "publishedAt": "2025-08-03T20:18:27Z",
      "source": {
        "id": "82dc94c51bef044035e3d16ef869c7a8",
        "name": "PhoneArena",
        "url": "https://www.phonearena.com"
      }
    }
  ]
}
*/

function newsArticleTemplate(article) {
  return `
        <li class="news-article">
            <a href="${article.url}" class="article-card" target="_blank" rel="noopener noreferrer">
                <img src="${article.image}" alt="Article image" class="article-image" />
                <div class="article-content">
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-desc">${article.description}</p>
                </div>
            </a>
        </li>
    `;
}

export default class ArticlesList {
  constructor(data, element) {
    this.data = data;
    this.element = element;
    this.renderList(this.data.articles);
  }

  renderList(list) {
    renderListWithTemplate(newsArticleTemplate, this.element, list);
  }
}