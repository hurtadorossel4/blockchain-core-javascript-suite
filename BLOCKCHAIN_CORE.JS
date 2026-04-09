class BlockchainCore {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      prevHash: "0",
      hash: this.generateHash("0"),
      nonce: 0
    };
    this.chain.push(genesisBlock);
  }

  generateHash(blockData) {
    return require("crypto").createHash("sha256").update(JSON.stringify(blockData)).digest("hex");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  mineBlock(nonce = 0) {
    const latestBlock = this.getLatestBlock();
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      prevHash: latestBlock.hash,
      nonce,
      hash: ""
    };
    newBlock.hash = this.generateHash(newBlock);
    this.chain.push(newBlock);
    this.pendingTransactions = [];
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const prev = this.chain[i - 1];
      if (current.hash !== this.generateHash(current)) return false;
      if (current.prevHash !== prev.hash) return false;
    }
    return true;
  }
}
module.exports = BlockchainCore;
