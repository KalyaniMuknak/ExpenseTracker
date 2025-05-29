const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalDisplay.textContent = total;
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((exp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exp.title}</td>
      <td>₹${exp.amount}</td>
      <td>${exp.date}</td>
      <td><button onclick="deleteExpense(${index})">Delete</button></td>
    `;
    expenseList.appendChild(row);
  });
  updateTotal();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  const newExpense = { title, amount, date };
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  form.reset();
  renderExpenses();
});

// Initial load
renderExpenses();
