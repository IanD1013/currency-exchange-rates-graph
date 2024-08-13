import { CurrencyService } from "./currencyService.js";

const currencyService = new CurrencyService();
const button = document.getElementById("test");

const fromOptions = document.getElementById("fromDropdownContent");
const toOptions = document.getElementById("toDropdownContent");
let showingDropdown = null; // the event of user focusing the input field

const inputs = [
  document.getElementById("fromInput"),
  document.getElementById("toInput"),
];

const switchBtn = document.getElementById("switchBtn");

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((drop) =>
  drop.addEventListener("mouseleave", function () {
    hideOptions(showingDropdown);
  })
);

// set default input values
// and send GET request
inputs[0].value = "EUR";
inputs[1].value = "USD";

switchBtn.addEventListener("click", function () {
  const temp = inputs[0].value;
  inputs[0].value = inputs[1].value;
  inputs[1].value = temp;
});

button.addEventListener("click", async function () {
  let data = await currencyService.getTimeSeries("GBP", "2001-02-21");
  console.log(data);
});

inputs.forEach((input) =>
  input.addEventListener("focus", (event) => showOptions(event))
);

function showOptions(event) {
  let id = event.target.id;
  let dropdown = null;

  if (id == "fromInput") {
    dropdown = fromOptions;
  } else {
    dropdown = toOptions;
  }

  if (dropdown == null) {
    console.error("Failed to find dropdown menu on ", id);
    return;
  }

  if (!dropdown.classList.contains("dropdown-active")) {
    dropdown.classList.add("dropdown-active");
  }

  // add event listeners to selections
  dropdown.childNodes.forEach((option) =>
    option.addEventListener("click", function () {
      event.target.value = option.innerText;
      hideOptions(event);
    })
  );

  showingDropdown = event;
}

function hideOptions(event) {
  if (event == null) {
    return;
  }

  let id = event.target.id;
  let dropdown = null;

  if (id == "fromInput") {
    dropdown = fromOptions;
  } else {
    dropdown = toOptions;
  }

  if (dropdown == null) {
    console.error("Failed to find dropdown menu on ", id);
    return;
  }

  if (dropdown.classList.contains("dropdown-active")) {
    dropdown.classList.remove("dropdown-active");
  }

  // remove event listeners
  dropdown.childNodes.forEach((node) =>
    node.removeEventListener("click", null)
  );
  showingDropdown = null;
}
