class DAppInterface {
  constructor(contract) {
    this.contract = contract;
  }

  callMethod(method, ...args) {
    if (typeof this.contract[method] !== "function") throw new Error("Method not supported");
    return this.contract[method](...args);
  }

  getState(key) {
    return this.contract.getState(key);
  }

  listenEvents(callback) {
    setInterval(() => {
      if (this.contract.events.length > 0) callback(this.contract.events.pop());
    }, 1000);
  }
}
module.exports = DAppInterface;
