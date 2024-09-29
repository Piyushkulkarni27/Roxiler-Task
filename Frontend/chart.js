async function fetchBarChart() {
    const response = await fetch(`http://localhost:8000/api/bar_chart?month=${currentMonth}`);
    const data = await response.json();
    const labels = Object.keys(data);  // Price ranges (e.g., '0-100', '101-200', etc.)
    const values = Object.values(data);  // Number of items in each range
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
