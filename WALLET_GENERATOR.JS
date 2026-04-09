const crypto = require('crypto');

class WalletGenerator {
  static generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'secp256k1'
    });
    return {
      publicKey: publicKey.export({ type: 'spki', format: 'hex' }),
      privateKey: privateKey.export({ type: 'pkcs8', format: 'hex' })
    };
  }

  static generateAddress(publicKey) {
    const hash = crypto.createHash('sha256').update(publicKey).digest('hex');
    return `0x${hash.slice(-40)}`;
  }

  static createWallet() {
    const keys = this.generateKeyPair();
    const address = this.generateAddress(keys.publicKey);
    return { address, ...keys };
  }
}
module.exports = WalletGenerator;
