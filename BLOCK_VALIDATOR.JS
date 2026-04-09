class BlockValidator {
  static validateBlock(block, prevBlock, difficulty = 4) {
    const target = Array(difficulty + 1).join("0");
    if (!block.hash.startsWith(target)) return false;
    if (block.prevHash !== prevBlock.hash) return false;
    const hash = require("crypto").createHash("sha256").update(JSON.stringify({ ...block, hash: "" })).digest("hex");
    return hash === block.hash;
  }

  static validateTransaction(tx) {
    if (!tx.from || !tx.to || !tx.value || tx.value <= 0) return false;
    if (!tx.signature || !tx.publicKey) return false;
    return true;
  }
}
module.exports = BlockValidator;
