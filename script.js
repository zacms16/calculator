// * Variables * //
let operator = "none";
let num1 = "none";
let num2 = "none";
let final = null;

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
      if (num1 !== "none" && operator === "none") {
        num1 = toggleSign(num1);
      } else if (num1 !== "none" && operator !== "none" && num2 === "none") {
        num2 = toggleSign(num2);
      } else if (num1 !== "none" && operator !== "none" && num2 !== "none") {
        num2 = toggleSign(num2);
      }
      updateEquationDisplay();
      return; // Prevent further processing for +/- button
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
      if (num1.includes(".")) {
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
        if (num2.includes(".")) {
          alert("You can't have more than one decimal point!");
        } else {
          num2 = `${num2}${element.textContent}`;
        }
      } else if (num2 != "none" && element.textContent === ".") {
        num2 = `${num2}${element.textContent}`;
      }
    }

    updateEquationDisplay();
  };
});

// * Functions * //
function updateEquationDisplay() {
  let equation = `${num1 !== "none" ? num1 : ""} ${operator !== "none" ? operator : ""} ${
    num2 !== "none" ? num2 : ""
  }`;
  displayText.textContent = equation.trim();
}

function operate(num1, operator, num2) {
  let fNum1 = Number(num1);
  let fNum2 = Number(num2);

  if (operator === "+") {
    final = fNum1 + fNum2;
  } else if (operator === "-") {
    final = fNum1 - fNum2;
  } else if (operator === "÷") {
    if (fNum2 === 0) {
      alert("You can't divide by zero!");
      resetVariables();
      clearDisplay();
      return;
    }
    final = fNum1 / fNum2;
  } else if (operator === "×") {
    final = fNum1 * fNum2;
  }

  updateDisplay(final.toString());
}

function updateDisplay(output) {
  if (output.toString().length > 21) {
    displayText.textContent = parseFloat(output.toFixed(2));
  } else {
    displayText.textContent = output;
  }
  resetVariables();
  num1 = output.toString();
}

function clearDisplay() {
  displayText.textContent = "";
}

function resetVariables() {
  operator = "none";
  num1 = "none";
  num2 = "none";
  final = null;
}

function toggleSign(number) {
  if (number === "none") return number;
  return (Number(number) * -1).toString();
}
