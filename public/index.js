import { State } from "./state.js";
import { getPlanets } from "./apis.js";
import { generatePlanetsCards } from "./planet-card.js";
import { generateErrorElement } from "./error-element.js";

function render(htmlCode) {
  const planets = document.getElementById("content");
  planets.innerHTML = htmlCode;
}

const state = new State();

state.setData = function (data) {
  this.data = data;
};

state.error = function () {
  this.data = [];
};

state.subscribe("setData", function (data) {
  const htmlCode = generatePlanetsCards(data);
  render(htmlCode);
});

state.subscribe("error", function (data) {
  const htmlCode = generateErrorElement(data);
  render(htmlCode);
});

await getPlanets()
  .then((planets) => {
    state.dispatch("setData", planets);
  })
  .catch((error) => {
    state.dispatch("error", error.message);
  });
