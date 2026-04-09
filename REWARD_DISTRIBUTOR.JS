class RewardDistributor {
  static distribute(totalReward, stakeholders) {
    const total = Object.values(stakeholders).reduce((a, b) => a + b, 0);
    const result = {};
    for (const addr in stakeholders) {
      result[addr] = (stakeholders[addr] / total) * totalReward;
    }
    return result;
  }

  static distributeEvenly(totalReward, addresses) {
    const each = totalReward / addresses.length;
    return addresses.reduce((acc, addr) => ({ ...acc, [addr]: each }), {});
  }
}
module.exports = RewardDistributor;
