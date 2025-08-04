import {
    getLocalStorage,
    setLocalStorage
} from "./utils.mjs";

export function displayWelcomeMsg() {
    const welcomeElement = document.getElementById("welcome-msg");
    const visited = getLocalStorage("visited");

    if (!visited) {
        welcomeElement.innerHTML = `
        <h2>Welcome to the Stock Portfolio Manager!<h2>
        <p>Stay informed and in control of your investments. This app helps you stay up to date on your key portfolio stocks by providing the latest news articles and real-time data insights—all in one place.<p>`;
        setLocalStorage("visited", true);
    } else {
        welcomeElement.innerHTML = `
        <h2>Welcome back!<h2>
        <p>Let's check in on your portfolio with the latest stock data and news updates.<p>`;
    }
}