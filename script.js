// TODO: display the current in progress equation

// * Variables * //
let operator = "none";
let num1 = "none";
let num2 = "none";
let final;

// * UI * //
const displayText = document.querySelector(".display-text");
const buttons = document.querySelectorAll("button");

buttons.forEach((element) => {
  element.onclick = function () {
    if (element.textContent === "=" && num1 != "none" && operator != "none" && num2 != "none") {
      operate(num1, operator, num2);
    } else if (
      element.textContent === "=" &&
      num1 === "none" &&
      operator === "none" &&
      num2 === "none"
    ) {
      alert("Incomplete equation!");
    }

    if (element.textContent === "AC") {
      resetVariables();
      clearDisplay();
    }

    if (element.textContent === "+/-") {
      if (num1 !== "none" && num2 === "none") {
        if (Number(num1) < 0) {
          return (num1 = Math.abs(num1));
        } else {
          return (num1 = -num1);
        }
      } else if (num1 !== "none" && num2 !== "none") {
        if (Number(num2) < 0) {
          return (num2 = Math.abs(num2));
        } else {
          return (num2 = -num2);
        }
      }
    }

    if (element.textContent === "%") {
      if (num1 != "none") {
        updateDisplay(num1 / 100);
      }
    }

    if (num1 === "none" && element.className === "num" && operator === "none") {
      num1 = element.textContent;
    } else if (num1 != "none" && element.className === "num" && operator === "none") {
      num1 = `${num1}${element.textContent}`;
    } else if (num1 != "none" && element.textContent === "." && operator === "none") {
      if (!Number.isInteger(num1)) {
        alert("You can't have more than one decimal point!");
      } else {
        num1 = `${num1}${element.textContent}`;
      }
    } else if (
      num1 != "none" &&
      element.className != "num" &&
      element.textContent != "=" &&
      element.textContent != "%" &&
      operator === "none"
    ) {
      operator = element.textContent;
    } else if (num1 != "none" && operator != "none") {
      if (num2 === "none" && element.className === "num") {
        num2 = element.textContent;
      } else if (num2 != "none" && element.className === "num") {
        num2 = `${num2}${element.textContent}`;
      } else if (num2 != "none" && element.textContent === ".") {
        num2 = `${num2}${element.textContent}`;
      }
    }
  };
});

// * Functions * //
function operate(num1, operator, num2) {
  let fNum1 = Number(num1);
  let fNum2 = Number(num2);

  if (operator === "+") {
    final = fNum1 + fNum2;
  } else if (operator === "-") {
    final = fNum1 - fNum2;
  } else if (operator === "÷") {
    if (num2 === 0) {
      alert("You can't divide by zero!");
      resetVariables();
      clearDisplay();
      return;
    }
    final = fNum1 / fNum2;
  } else if (operator === "×") {
    final = fNum1 * fNum2;
  }

  updateDisplay(final);
}

function updateDisplay(output) {
  if (output.toString().length > 21) {
    displayText.textContent = Math.round((output + Number.EPSILON) * 100) / 100;
  } else {
    displayText.textContent = output;
  }
  resetVariables();
  num1 = displayText.textContent;
}

function clearDisplay() {
  displayText.textContent = "";
}

function resetVariables() {
  operator = "none";
  num1 = "none";
  num2 = "none";
  final = "";
}
