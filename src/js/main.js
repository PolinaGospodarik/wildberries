"use strict";

import { createElement } from "./utils.js";
import { createHeader } from "./header.js";
import { createSlider } from "./slider.js";
import { createCatalog } from "./catalog.js";

const root = document.querySelector("#root");

createHeader(root);

/*MAIN*/
const main = createElement("main", "main", null, root);
const containerMain =createElement("div","container", null, main);

createSlider(containerMain);
createCatalog(containerMain);



