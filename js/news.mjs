import ExternalServices from "./ExternalServices.mjs";
import ArticlesList from "./ArticlesList.mjs";


export async function loadNews(company, topic) {

    // This data has already been filtered to only contain
    // articles about the desired company
    const dataSource = new ExternalServices(company, topic);
    const data = await dataSource.getData();
    //console.log(data.articles);

    // Selects the parent element that will be injected with the list
    const listContainer = document.querySelector(".news-articles");
    
    // Creates the list of HTML to be injected using a template
    const listOfArticles = new ArticlesList(data, listContainer);
    listOfArticles.init();
}