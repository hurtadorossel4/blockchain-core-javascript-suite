class ProofOfWork {
  constructor(difficulty = 4) {
    this.difficulty = difficulty;
    this.target = Array(this.difficulty + 1).join("0");
  }

  mine(block) {
    let nonce = 0;
    let hash = "";
    while (!hash.startsWith(this.target)) {
      nonce++;
      const data = { ...block, nonce };
      hash = require("crypto").createHash("sha256").update(JSON.stringify(data)).digest("hex");
    }
    return { nonce, hash };
  }

  validate(block) {
    const hash = require("crypto").createHash("sha256").update(JSON.stringify(block)).digest("hex");
    return hash.startsWith(this.target);
  }
}
module.exports = ProofOfWork;
