import { containsGivenLetters } from "./utils.js";

export default class Input {
  constructor(inputField, dropdown, dropdownContent) {
    this.inputField = inputField; // input field
    this.dropdown = dropdown; // container for the 1st and 3rd
    this.dropdownContent = dropdownContent; // container of options

    this.addSelectionEventToOptions();
    this.addInputFieldFocusListener();
    this.initInputSearch();
  }

  initInputSearch() {
    let searchWord = this.getInput();

    this.inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        // remove added hidden flags to each item in the container
        for (let option of this.dropdownContent.children) {
          this.stopHidingOption(option);
        }

        this.hideDropdown();
      } else {
        if (e.key === "Backspace" && searchWord !== "") {
          searchWord = searchWord.slice(0, -1);
        } else if (e.keyCode >= 65 && e.keyCode <= 122) {
          searchWord += e.key;
        }

        // filter selection by search word
        for (let option of this.dropdownContent.children) {
          if (!containsGivenLetters(searchWord, option.innerText)) {
            this.hideOption(option);
          } else {
            this.stopHidingOption(option);
          }
        }
      }
    });
  }

  // show dropdown list when focus on input field
  addInputFieldFocusListener() {
    this.inputField.addEventListener("focus", this.showDropdown);
    this.inputField.addEventListener("blur", () => {
      let isValid = false;

      this.dropdownContent.childNodes.forEach((option) => {
        if (option.innerText === this.getInput()) {
          isValid = true;
        }
      });

      if (!isValid) {
        this.setInput("EUR");
      }

      this.hideDropdown();
    });
  }

  // add event listener to each option in the dropdown list:
  // when clicked, set the input field value to the clicked option value
  addSelectionEventToOptions() {
    this.dropdownContent.childNodes.forEach((option) =>
      option.addEventListener("mousedown", () => {
        this.setInput(option.innerText);
      })
    );
  }

  hideOption = (option) => {
    if (!option.classList.contains("hide")) {
      option.classList.add("hide");
    }
  };

  stopHidingOption = (option) => {
    if (option.classList.contains("hide")) {
      option.classList.remove("hide");
    }
  };

  showDropdown = () => {
    if (!this.dropdownContent.classList.contains("dropdown-active")) {
      this.toggleDropdown();
    }
  };

  hideDropdown = () => {
    if (this.dropdownContent.classList.contains("dropdown-active")) {
      this.toggleDropdown();
    }
  };

  toggleDropdown = () => {
    this.dropdownContent.classList.toggle("dropdown-active");
  };

  getInput = () => {
    return this.inputField.value;
  };

  setInput = (value) => {
    this.inputField.value = value;
  };
}
