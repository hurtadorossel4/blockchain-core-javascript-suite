class CrossChainBridge {
  constructor() {
    this.locks = new Map();
    this.wraps = new Map();
  }

  lockToken(chain, address, amount, lockId) {
    this.locks.set(lockId, { chain, address, amount, locked: true });
  }

  unlockToken(lockId) {
    const lock = this.locks.get(lockId);
    if (!lock || !lock.locked) return false;
    lock.locked = false;
    return true;
  }

  wrapToken(originalChain, token, targetChain, amount) {
    const key = `${originalChain}-${token}-${targetChain}`;
    this.wraps.set(key, (this.wraps.get(key) || 0) + amount);
  }
}
module.exports = CrossChainBridge;
