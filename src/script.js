const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateTotal() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}

function renderExpenses() {
  list.innerHTML = "";
  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.title}</td>
      <td>₹${expense.amount}</td>
      <td>${expense.date}</td>
      <td><button onclick="deleteExpense(${index})">Delete</button></td>
    `;
    list.appendChild(row);
  });
  updateTotal();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  if (title && amount && date) {
    expenses.push({ title, amount, date });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    form.reset();
  }
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

renderExpenses();
