export default class Input {
  constructor(inputField, dropdown, dropdownContent) {
    this.inputField = inputField; // input field
    this.dropdown = dropdown; // container for the 1st and 3rd
    this.dropdownContent = dropdownContent; // options

    this.addSelectionEventToOptions();
    this.addInputFieldFocusListener();
  }

  addInputFieldFocusListener() {
    this.inputField.addEventListener("focus", this.showDropdown);
    this.inputField.addEventListener("blur", this.hideDropdown);
  }

  addSelectionEventToOptions() {
    this.dropdownContent.childNodes.forEach((option) =>
      option.addEventListener("mousedown", () => {
        this.setInput(option.innerText);
      })
    );
  }

  showDropdown = () => {
    if (!this.dropdownContent.classList.contains("dropdown-active")) {
      this.dropdownContent.classList.add("dropdown-active");
    }
  };

  hideDropdown = () => {
    if (this.dropdownContent.classList.contains("dropdown-active")) {
      this.dropdownContent.classList.remove("dropdown-active");
    }
  };

  getInput = () => {
    return this.inputField.value;
  };

  setInput = (value) => {
    this.inputField.value = value;
  };
}
