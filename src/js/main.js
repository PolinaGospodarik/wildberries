"use strict";

import { createElement } from "./utils.js";
import { createHeader } from "./header.js";
import { createSlider } from "./slider.js";
import { createCatalog } from "./catalog.js";
import { createSearch } from "./search.js";

const root = document.querySelector("#root");

const inputSearch = createHeader(root);

/*MAIN*/
const main = createElement("main", "main", null, root);
const containerMain = createElement("div", "container", null, main);

const { showSlider, hideSlider} =createSlider(containerMain);
const { showCards } = createCatalog(containerMain);

createSearch(inputSearch, showCards, showSlider, hideSlider );


