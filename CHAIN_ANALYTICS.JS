class ChainAnalytics {
  constructor(chain) {
    this.chain = chain;
  }

  getTotalTransactions() {
    return this.chain.reduce((sum, b) => sum + b.transactions.length, 0);
  }

  getAverageBlockTime() {
    let total = 0;
    for (let i = 1; i < this.chain.length; i++) {
      total += this.chain[i].timestamp - this.chain[i - 1].timestamp;
    }
    return this.chain.length < 2 ? 0 : (total / (this.chain.length - 1)) / 1000;
  }

  getTopAccounts() {
    const map = {};
    this.chain.forEach(b => {
      b.transactions.forEach(t => {
        map[t.to] = (map[t.to] || 0) + t.value;
      });
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }
}
module.exports = ChainAnalytics;
