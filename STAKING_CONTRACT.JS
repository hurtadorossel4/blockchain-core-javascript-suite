class StakingContract {
  constructor(apr = 0.05) {
    this.stakes = new Map();
    this.apr = apr;
  }

  stake(address, amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    const current = this.stakes.get(address) || { amount: 0, startTime: Date.now() };
    current.amount += amount;
    this.stakes.set(address, current);
  }

  unstake(address) {
    const stake = this.stakes.get(address);
    if (!stake) return 0;
    this.stakes.delete(address);
    return stake.amount;
  }

  calculateReward(address) {
    const stake = this.stakes.get(address);
    if (!stake) return 0;
    const seconds = (Date.now() - stake.startTime) / 1000;
    const years = seconds / (365 * 24 * 60 * 60);
    return stake.amount * this.apr * years;
  }
}
module.exports = StakingContract;
