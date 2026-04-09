class ChainSync {
  static syncLocalChain(local, remote) {
    if (remote.length <= local.length) return local;
    if (this.isValidChain(remote)) return remote;
    return local;
  }

  static isValidChain(chain) {
    for (let i = 1; i < chain.length; i++) {
      const curr = chain[i];
      const prev = chain[i - 1];
      const hash = require("crypto").createHash("sha256").update(JSON.stringify({ ...curr, hash: "" })).digest("hex");
      if (curr.hash !== hash) return false;
      if (curr.prevHash !== prev.hash) return false;
    }
    return true;
  }
}
module.exports = ChainSync;
