import Input from "./input.js";
import { Graph } from "./graph.js";

const graph = new Graph();

const switchBtn = document.getElementById("switchBtn");

const inputs = {
  from: new Input(
    document.getElementById("fromInput"),
    document.querySelector(".dropdown.from"),
    document.getElementById("fromDropdownContent")
  ),

  to: new Input(
    document.getElementById("toInput"),
    document.querySelector(".dropdown.to"),
    document.getElementById("toDropdownContent")
  ),
};

console.log(inputs);
inputs.from.setInput("EUR");
inputs.to.setInput("USD");

switchBtn.addEventListener("click", () => {
  const temp = inputs.from.getInput();
  inputs.from.setInput(inputs.to.getInput());
  inputs.to.setInput(temp);
});

graph.renderData(
  ["2021-01-02", "2021-01-03", "2021-01-04", "2021-01-05"],
  [1, 2, 0.5, 3]
);
