class PrivateTransaction {
  constructor() {
    this.encryptedTxs = new Map();
  }

  createEncryptedTx(txId, data, publicKey) {
    const encrypted = require("./ENCRYPTION_UTILS").encrypt(JSON.stringify(data), publicKey.slice(-32));
    this.encryptedTxs.set(txId, encrypted);
  }

  decryptTx(txId, privateKey) {
    const encrypted = this.encryptedTxs.get(txId);
    if (!encrypted) return null;
    return JSON.parse(require("./ENCRYPTION_UTILS").decrypt(encrypted, privateKey.slice(-32)));
  }
}
module.exports = PrivateTransaction;
