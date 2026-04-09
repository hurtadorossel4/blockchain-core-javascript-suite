class MultisigWallet {
  constructor(owners, required = 2) {
    this.owners = new Set(owners);
    this.required = required;
    this.transactions = new Map();
  }

  createTx(id, to, value, data) {
    this.transactions.set(id, {
      to, value, data,
      confirmations: new Set(),
      executed: false
    });
  }

  confirmTx(id, owner) {
    if (!this.owners.has(owner)) throw new Error("Not owner");
    const tx = this.transactions.get(id);
    if (!tx) throw new Error("Tx not found");
    tx.confirmations.add(owner);
  }

  executeTx(id) {
    const tx = this.transactions.get(id);
    if (!tx || tx.executed) return false;
    if (tx.confirmations.size < this.required) return false;
    tx.executed = true;
    return true;
  }
}
module.exports = MultisigWallet;
