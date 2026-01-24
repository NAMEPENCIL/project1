console.log("Hello from script.js!");

let bitcoinPriceChart; // Declare chart globally
let currentChartRange = 60; // Default to 60 minutes (1 hour)
let chartUpdateIntervalId; // Stores the setInterval ID for chart updates

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
    } else {
        // Default to light mode if no preference is found
        document.body.classList.add('light-mode');
    }

    // Apply theme immediately after setting the class
    applyChartTheme();

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
        applyChartTheme(); // Apply chart theme after theme change
        fetchAndRenderHistoricalBitcoinPrice(currentChartRange); // Re-render chart with new theme colors
    });

    // Interval buttons functionality
    document.getElementById('interval-1min').addEventListener('click', () => {
        currentChartRange = 60; // Last 60 minutes
        fetchAndRenderHistoricalBitcoinPrice(currentChartRange);
        startChartUpdateInterval(currentChartRange); // Restart interval with new range
    });

    document.getElementById('interval-5min').addEventListener('click', () => {
        currentChartRange = 300; // Last 300 minutes (5 hours)
        fetchAndRenderHistoricalBitcoinPrice(currentChartRange);
        startChartUpdateInterval(currentChartRange); // Restart interval with new range
    });

    // Bitcoin price functionality
    fetchBitcoinPrice(); // Fetch current price immediately on load
    setInterval(fetchBitcoinPrice, 1000); // Fetch current price every 1 second

    // Historical Bitcoin price and chart functionality - initial load
    fetchAndRenderHistoricalBitcoinPrice(currentChartRange);
    startChartUpdateInterval(currentChartRange); // Start initial chart update interval
});

function applyChartTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    Chart.defaults.color = isDarkMode ? '#f8f8f2' : '#333'; // Default font color
    Chart.defaults.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'; // Default border color (grid lines)
}

function startChartUpdateInterval(range) {
    if (chartUpdateIntervalId) {
        clearInterval(chartUpdateIntervalId); // Clear existing interval
    }
    // Update chart every 30 seconds. API rate limits should be considered.
    chartUpdateIntervalId = setInterval(() => {
        fetchAndRenderHistoricalBitcoinPrice(range);
    }, 30000); // Update every 30 seconds
}

async function fetchBitcoinPrice() {
    const priceElement = document.getElementById('bitcoin-price');
    try {
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const price = data.data.amount;
        const currency = data.data.currency;
        priceElement.textContent = `BTC price: ${price} ${currency}`;
    } catch (error) {
        console.error("Failed to fetch current Bitcoin price:", error);
        priceElement.textContent = "Failed to load Bitcoin price.";
    }
}

async function fetchAndRenderHistoricalBitcoinPrice(rangeInMinutes) {
    const chartContext = document.getElementById('bitcoinPriceChart').getContext('2d');
    const now = Math.floor(Date.now() / 1000); // current unix timestamp
    const fromTimestamp = now - (rangeInMinutes * 60); // calculate 'from' based on rangeInMinutes
    const isDarkMode = document.body.classList.contains('dark-mode');

    try {
        // CoinGecko API for ranges <= 1 day provides minute-level granularity
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${now}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const prices = data.prices; // [[timestamp, price], ...]

        const labels = prices.map(price => {
            const date = new Date(price[0]);
            // Format labels based on range for better readability
            if (rangeInMinutes <= 60) { // 1 hour or less, show minutes
                return date.getMinutes().toString().padStart(2, '0') + 's'; // Just seconds for very short ranges
            } else if (rangeInMinutes <= 360) { // 6 hours or less, show HH:MM
                return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
            } else { // Longer than 6 hours, show HH:MM and possibly date
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString();
            }
        });
        const dataPoints = prices.map(price => price[1]);

        if (bitcoinPriceChart) {
            bitcoinPriceChart.destroy(); // Destroy existing chart if any
        }

        bitcoinPriceChart = new Chart(chartContext, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: dataPoints,
                    borderColor: isDarkMode ? '#61dafb' : 'rgb(75, 192, 192)',
                    backgroundColor: isDarkMode ? 'rgba(97, 218, 251, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    fill: true, // Fill area under the line
                    pointRadius: 0 // Hide points
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: Chart.defaults.color
                        }
                    }
                },
                scales: {
                    x: {
                        display: true, // Show x-axis for time
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 10, // Adjust as needed for clarity
                            color: Chart.defaults.color
                        },
                        grid: {
                            color: Chart.defaults.borderColor
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: Chart.defaults.color
                        },
                        grid: {
                            color: Chart.defaults.borderColor
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Failed to fetch historical Bitcoin price:", error);
        // Optionally display an error message in the chart area
    }
}