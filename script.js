const form = document.getElementById('subscription-form');
const listItems = document.getElementById('list-items');
const chartCtx = document.getElementById('expense-chart').getContext('2d');

let subscriptions = [];

// Graphique
const chart = new Chart(chartCtx, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Dépenses',
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9F40'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    }
});

// Ajouter un abonnement
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    // Ajouter aux abonnements
    subscriptions.push({ name, amount, date });
    updateUI();
    updateChart();

    // Réinitialiser le formulaire
    form.reset();
});

function updateUI() {
    listItems.innerHTML = '';
    subscriptions.forEach((sub, index) => {
        const div = document.createElement('div');
        div.className = 'subscription-item';
        div.innerHTML = `<span>${sub.name} - ${sub.amount.toFixed(2)}€</span> <span>${sub.date}</span>`;
        listItems.appendChild(div);
    });
}

function updateChart() {
    const labels = subscriptions.map(sub => sub.name);
    const data = subscriptions.map(sub => sub.amount);

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}
