class TransactionPool {
  constructor() {
    this.pending = [];
  }

  addTransaction(tx) {
    if (!this.isDuplicate(tx)) this.pending.push(tx);
  }

  isDuplicate(tx) {
    return this.pending.some(t => t.id === tx.id);
  }

  getPendingTransactions(limit = 10) {
    return this.pending.slice(0, limit);
  }

  clearTransactions(transactions) {
    const ids = new Set(transactions.map(t => t.id));
    this.pending = this.pending.filter(t => !ids.has(t.id));
  }
}
module.exports = TransactionPool;
