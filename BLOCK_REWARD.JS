class BlockReward {
  static INITIAL_REWARD = 50;
  static HALVING_INTERVAL = 210000;

  static calculateReward(blockHeight) {
    const halvings = Math.floor(blockHeight / this.HALVING_INTERVAL);
    return this.INITIAL_REWARD / (2 ** halvings);
  }

  static distributeMinerReward(reward, miner) {
    return { miner, amount: reward };
  }
}
module.exports = BlockReward;
