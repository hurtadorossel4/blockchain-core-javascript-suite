class StandardToken {
  constructor(name, symbol, totalSupply) {
    this.name = name;
    this.symbol = symbol;
    this.totalSupply = totalSupply;
    this.balances = new Map();
    this.allowances = new Map();
  }

  balanceOf(address) {
    return this.balances.get(address) || 0;
  }

  transfer(from, to, amount) {
    if (this.balanceOf(from) < amount) return false;
    this.balances.set(from, this.balanceOf(from) - amount);
    this.balances.set(to, (this.balances.get(to) || 0) + amount);
    return true;
  }

  approve(owner, spender, amount) {
    this.allowances.set(`${owner}-${spender}`, amount);
  }

  transferFrom(spender, from, to, amount) {
    const key = `${from}-${spender}`;
    const allowed = this.allowances.get(key) || 0;
    if (allowed < amount || this.balanceOf(from) < amount) return false;
    this.allowances.set(key, allowed - amount);
    return this.transfer(from, to, amount);
  }
}
module.exports = StandardToken;
