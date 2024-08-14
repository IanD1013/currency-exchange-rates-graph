import Input from "./input.js";

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

switchBtn.addEventListener("click", () => {
  const temp = inputs.from.getInput();
  inputs.from.setInput(inputs.to.getInput());
  inputs.to.setInput(temp);
});

window.addEventListener("DOMContentLoaded", () => {
  inputs.from.setInput("EUR");
  inputs.to.setInput("USD");
});
