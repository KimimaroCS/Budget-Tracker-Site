const form = document.getElementById('subscription-form');
const listItems = document.getElementById('list-items');
const chartCtx = document.getElementById('expense-chart').getContext('2d');

let subscriptions = [];

// Liste des logos par défaut
const logos = {
    spotify: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    netflix: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_N_logo.svg",
    amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    youtube: "https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_circle_%282017%29.svg",
    disney: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    default: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Default-user-icon.svg"
};

// Charger les données du localStorage au démarrage
document.addEventListener('DOMContentLoaded', () => {
    const savedSubscriptions = localStorage.getItem('subscriptions');
    if (savedSubscriptions) {
        subscriptions = JSON.parse(savedSubscriptions);
        updateUI();
        updateChart();
    }
});

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

    const name = document.getElementById('name').value.toLowerCase();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    // Vérifier si un logo correspond au nom, sinon utiliser le logo par défaut
    const logo = logos[name] || logos.default;

    // Ajouter aux abonnements
    subscriptions.push({ name, amount, date, logo });

    // Sauvegarder dans le localStorage
    saveToLocalStorage();

    // Mettre à jour l'interface et le graphique
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
        div.innerHTML = `
            <img class="subscription-logo" src="${sub.logo}" alt="${sub.name} logo">
            <span>${sub.name.charAt(0).toUpperCase() + sub.name.slice(1)} - ${sub.amount.toFixed(2)}€</span>
            <span>${sub.date}</span>`;
        listItems.appendChild(div);
    });
}

function updateChart() {
    const labels = subscriptions.map(sub => sub.name.charAt(0).toUpperCase() + sub.name.slice(1));
    const data = subscriptions.map(sub => sub.amount);

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

function saveToLocalStorage() {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}
