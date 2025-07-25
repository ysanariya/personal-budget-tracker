let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function renderTransactions() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  let income = 0, expense = 0;

  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.innerText = `${t.date} | ${t.type.toUpperCase()} | ₹${t.amount} | ${t.category} (${t.description})`;
    list.appendChild(li);

    if (t.type === "income") income += Number(t.amount);
    else expense += Number(t.amount);
  });

  document.getElementById("income-total").innerText = income;
  document.getElementById("expense-total").innerText = expense;
  document.getElementById("net-balance").innerText = income - expense;
}

document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const newTransaction = {
    amount: document.getElementById("amount").value,
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value
  };

  transactions.push(newTransaction);
  saveTransactions();
  renderTransactions();
  this.reset();
});

renderTransactions();
