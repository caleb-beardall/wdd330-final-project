import { renderWithTemplate } from "./utils.mjs";

/*
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "exchange": "NASDAQ",
  "mic_code": "XNGS",
  "currency": "USD",
  "datetime": "2025-08-06",
  "timestamp": 1754487000,
  "last_quote_at": 1754487000,
  "open": "205.63000",
  "high": "215.38000",
  "low": "205.59000",
  "close": "213.25",
  "volume": "106498000",
  "previous_close": "202.92000",
  "change": "10.33000",
  "percent_change": "5.090677",
  "average_volume": "63196890",
  "is_market_open": false,
  "fifty_two_week": {
    "low": "169.21001",
    "high": "260.10001",
    "low_change": "44.039993",
    "high_change": "-46.85001",
    "low_change_percent": "26.026826",
    "high_change_percent": "-18.012305",
    "range": "169.210007 - 260.100006"
  }
}
*/

function stockCardTemplate(stock) {
    return `
        <div class="stock-card">
            <div class="stock-header">
                <h2>${stock.name}</h2>
                <p>${stock.exchange}: ${stock.symbol}</p>
            </div>
            <div class="stock-price">
                <h3>$${parseFloat(stock.close).toFixed(2)}</h3>
                <p class="stock-change ${stock.percent_change >= 0 ? "positive" : "negative"}">$${parseFloat(stock.change).toFixed(2)} (${stock.percent_change >= 0 ? "+" : ""}${parseFloat(stock.percent_change).toFixed(2)}%)</p>
            </div>
            <div class="stock-details">
                <div><strong>OPEN:</strong> $${parseFloat(stock.open).toFixed(2)}</div>
                <div><strong>HIGH:</strong> $${parseFloat(stock.high).toFixed(2)}</div>
                <div><strong>LOW:</strong> $${parseFloat(stock.low).toFixed(2)}</div>
            </div>
            <div class="fifty-two-week">
                <div><strong>52 WEEK RANGE:</strong> $${parseFloat(stock.fifty_two_week.low).toFixed(2)} - $${parseFloat(stock.fifty_two_week.high).toFixed(2)}</div>
            </div>
        </div>
  `;
}

export default class StockCard {
    constructor(data, element) {
        this.data = data;
        this.element = element;
        // Render the stock card immediately after instantiation
        this.renderCard(this.data);
    }

    renderCard(data) {
        // Insert the stock card HTML into the target element
        renderWithTemplate(stockCardTemplate, this.element, data);
    }
}