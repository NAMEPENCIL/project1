console.log("Hello from script.js!");
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    fetchBitcoinPrice();
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
        priceElement.textContent = `Current Bitcoin Price: ${price} ${currency}`;
    } catch (error) {
        console.error("Failed to fetch Bitcoin price:", error);
        priceElement.textContent = "Failed to load Bitcoin price.";
    }
}