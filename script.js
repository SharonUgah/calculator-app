const display = document.getElementById("display");
const history = document.getElementById("history");
let expression = "";

function updateDisplay() {
  display.textContent = expression || "0";
}

function evaluateExpression() {
  try {
    const formatted = expression
      .replace(/x/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");

    const result = eval(formatted);

    if (expression.trim() !== "") {
      const readableExpression = expression
        .replace(/\*/g, "x")
        .replace(/\//g, "÷");

      history.innerHTML = '<div>' + readableExpression + ' = ' + result + '</div>';
    }

    expression = result.toString();
  } catch {
    expression = "Error";
  }
  updateDisplay();
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent.trim();

    if (btn.classList.contains("number") || btn.classList.contains("operator")) {
      expression += val;
    } else if (btn.classList.contains("clear")) {
      expression = "";
    } else if (btn.classList.contains("backspace")) {
      expression = expression.slice(0, -1);
    } else if (btn.classList.contains("equals")) {
      evaluateExpression();
      return;
    }
    updateDisplay();
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ((key >= "0" && key <= "9") || "+-*/.%^.".includes(key)) {
    expression += key;
  } else if (key === "Enter") {
    evaluateExpression();
    return;
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    expression = "";
  }
  updateDisplay();
});