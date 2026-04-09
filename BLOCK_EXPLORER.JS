class BlockExplorer {
  constructor(chain) {
    this.chain = chain;
  }

  getBlockByIndex(index) {
    return this.chain[index] || null;
  }

  getBlockByHash(hash) {
    return this.chain.find(b => b.hash === hash) || null;
  }

  searchTransaction(txId) {
    for (const block of this.chain) {
      const tx = block.transactions.find(t => t.id === txId);
      if (tx) return { block: block.index, ...tx };
    }
    return null;
  }

  getAddressActivity(address) {
    const txs = [];
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.from === address || tx.to === address) txs.push({ block: block.index, ...tx });
      }
    }
    return txs;
  }
}
module.exports = BlockExplorer;
