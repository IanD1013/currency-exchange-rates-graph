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

console.log(inputs);

// init default values on page load
inputs.from.setInput("EUR");
inputs.to.setInput("USD");

switchBtn.addEventListener("click", () => {
  const temp = inputs.from.getInput();
  inputs.from.setInput(inputs.to.getInput());
  inputs.to.setInput(temp);
});
