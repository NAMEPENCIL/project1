console.log("Hello from script.js!");

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
    });

    // Bitcoin price functionality
    fetchBitcoinPrice(); // Fetch price immediately on load
    setInterval(fetchBitcoinPrice, 1000); // Fetch price every 1 second
});

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
        console.error("Failed to fetch Bitcoin price:", error);
        priceElement.textContent = "Failed to load Bitcoin price.";
    }
}