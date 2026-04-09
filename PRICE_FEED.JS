class PriceFeed {
  constructor() {
    this.prices = new Map();
  }

  updatePrice(symbol, price, source) {
    this.prices.set(symbol, {
      price,
      source,
      timestamp: Date.now()
    });
  }

  getPrice(symbol) {
    const feed = this.prices.get(symbol);
    if (!feed || Date.now() - feed.timestamp > 60000) return null;
    return feed.price;
  }
}
module.exports = PriceFeed;
