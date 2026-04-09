class AddressValidator {
  static isValidEthAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
  }

  static isValidPublicKey(pubKey) {
    return /^[0-9a-fA-F]{66,132}$/.test(pubKey);
  }

  static normalizeAddress(address) {
    return address.toLowerCase().trim();
  }
}
module.exports = AddressValidator;
