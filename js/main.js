import {
    loadHeaderFooter,
    updatePrimaryLinks
} from "./utils.mjs";
import { displayWelcomeMsg } from "./main.mjs";

await loadHeaderFooter();
updatePrimaryLinks();
displayWelcomeMsg();
