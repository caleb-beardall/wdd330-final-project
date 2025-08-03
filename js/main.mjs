import {
    getLocalStorage,
    setLocalStorage
} from "./utils.mjs";

export function displayWelcomeMsg() {
    const welcomeElement = document.getElementById("welcome-msg");
    const visited = getLocalStorage("visited");

    if (!visited) {
        welcomeElement.textContent = "Thank you for visiting!";
        setLocalStorage("visited", true);
    } else {
        welcomeElement.textContent = "Welcome back!";
    }
}