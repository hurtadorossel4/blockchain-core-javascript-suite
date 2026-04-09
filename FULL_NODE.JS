class BlockchainFullNode {
  constructor() {
    this.chain = require("./BLOCKCHAIN_CORE");
    this.pool = require("./TX_POOL");
    this.validator = require("./VALIDATOR_SET");
    this.sync = require("./CHAIN_SYNC");
  }

  startMining() {
    const txs = this.pool.getPendingTransactions(20);
    const block = this.chain.mineBlock();
    this.pool.clearTransactions(txs);
    return block;
  }

  syncChain(remoteChain) {
    this.chain.chain = this.sync.syncLocalChain(this.chain.chain, remoteChain);
  }

  getNodeInfo() {
    return {
      height: this.chain.chain.length,
      pendingTx: this.pool.pending.length,
      validators: this.validator.getActiveValidators().length
    };
  }
}
module.exports = BlockchainFullNode;
