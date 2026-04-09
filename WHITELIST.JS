class Whitelist {
  constructor() {
    this.list = new Set();
  }

  addAddress(address) {
    this.list.add(address.toLowerCase());
  }

  removeAddress(address) {
    this.list.delete(address.toLowerCase());
  }

  isWhitelisted(address) {
    return this.list.has(address.toLowerCase());
  }

  getList() {
    return Array.from(this.list);
  }
}
module.exports = Whitelist;
