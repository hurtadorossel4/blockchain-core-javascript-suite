class ProxyContract {
  constructor(implementation) {
    this.implementation = implementation;
    this.admin = "";
  }

  setAdmin(admin) {
    this.admin = admin;
  }

  upgradeImplementation(newImpl, sender) {
    if (sender !== this.admin) throw new Error("Not admin");
    this.implementation = newImpl;
  }

  call(method, ...args) {
    if (!this.implementation[method]) throw new Error("Method not found");
    return this.implementation[method](...args);
  }
}
module.exports = ProxyContract;
