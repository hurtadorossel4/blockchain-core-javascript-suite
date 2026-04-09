class BlockTimestamp {
  static validate(block, prevBlock) {
    if (block.timestamp <= prevBlock.timestamp) return false;
    if (block.timestamp > Date.now() + 3600000) return false;
    return true;
  }

  static getBlockTimeDiff(blockA, blockB) {
    return Math.abs(blockA.timestamp - blockB.timestamp) / 1000;
  }
}
module.exports = BlockTimestamp;
