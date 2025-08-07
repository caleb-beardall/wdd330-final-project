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
      <h2>${stock.name} (${stock.symbol})</h2>
      <p><strong>Exchange:</strong> ${stock.exchange}</p>
      <p><strong>Price:</strong> $${parseFloat(stock.close).toFixed(2)}</p>
      <p><strong>Change:</strong> ${parseFloat(stock.change).toFixed(2)} (${parseFloat(stock.percent_change).toFixed(2)}%)</p>
      <p><strong>Open:</strong> $${parseFloat(stock.open).toFixed(2)}</p>
      <p><strong>High:</strong> $${parseFloat(stock.high).toFixed(2)}</p>
      <p><strong>Low:</strong> $${parseFloat(stock.low).toFixed(2)}</p>
      <p><strong>Volume:</strong> ${Number(stock.volume).toLocaleString()}</p>
      <p><strong>52 Week Range:</strong> ${stock.fifty_two_week.range}</p>
      <p><strong>Market Status:</strong> ${stock.is_market_open ? "Open" : "Closed"}</p>
    </div>
  `;
}

export default class StockCard {
    constructor(data, element) {
        this.data = data;
        this.element = element;
        this.renderCard(this.data);
    }

    renderCard(data) {
        renderWithTemplate(stockCardTemplate, this.element, data);
    }
}