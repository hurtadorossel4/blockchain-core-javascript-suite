class SmartContractBase {
  constructor(contractAddress, owner) {
    this.contractAddress = contractAddress;
    this.owner = owner;
    this.state = {};
    this.events = [];
  }

  onlyOwner(sender) {
    if (sender !== this.owner) throw new Error("Permission denied");
  }

  setState(key, value) {
    this.state[key] = value;
    this.events.push({ type: "STATE_UPDATED", key, value, time: Date.now() });
  }

  getState(key) {
    return this.state[key];
  }

  emitEvent(type, data) {
    this.events.push({ type, data, time: Date.now() });
  }
}
module.exports = SmartContractBase;
