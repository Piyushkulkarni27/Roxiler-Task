let currentPage = 1;
let currentMonth = "March";

const monthDropdown = document.getElementById("month");
const searchInput = document.getElementById("search");
const transactionsTableBody = document.querySelector("#transactionsTable tbody");
const totalSalesDiv = document.getElementById("totalSales");
const soldItemsDiv = document.getElementById("soldItems");
const notSoldItemsDiv = document.getElementById("notSoldItems");
const pageIndicator = document.getElementById("pageIndicator");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let barChart;

function updateChart(data) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    if (barChart) {
        barChart.destroy();
    }

    const ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Items',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function fetchTransactions(page = 1, search = "") {
    const month = monthDropdown.value;
    currentMonth = month;
    currentPage = page;

    const response = await fetch(`http://localhost:8000/api/transactions?month=${month}&page=${page}&search=${search}`);
    const data = await response.json();

    transactionsTableBody.innerHTML = "";

    data.transactions.forEach(transaction => {
        const row = `<tr>
            <td>${transaction.title}</td>
            <td>${transaction.description}</td>
            <td>${transaction.price}</td>
            <td>${transaction.dateOfSale}</td>
        </tr>`;
        transactionsTableBody.innerHTML += row;
    });

    pageIndicator.textContent = `Page ${currentPage}`;
}

async function fetchStatistics() {
    const response = await fetch(`http://localhost:8000/api/statistics?month=${currentMonth}`);
    const data = await response.json();

    totalSalesDiv.textContent = `Total Sale Amount: $${data.totalSales}`;
    soldItemsDiv.textContent = `Sold Items: ${data.soldItems}`;
    notSoldItemsDiv.textContent = `Not Sold Items: ${data.notSoldItems}`;
}

async function fetchBarChart() {
    const response = await fetch(`http://localhost:8000/api/bar_chart?month=${currentMonth}`);
    const data = await response.json();

    updateChart(data);
}

monthDropdown.addEventListener('change', () => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChart();
});

searchInput.addEventListener('input', () => {
    fetchTransactions(1, searchInput.value);
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        fetchTransactions(currentPage - 1);
    }
});

nextButton.addEventListener('click', () => {
    fetchTransactions(currentPage + 1);
});

fetchTransactions();
fetchStatistics();
fetchBarChart();
