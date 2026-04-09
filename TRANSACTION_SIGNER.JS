const crypto = require('crypto');

class TransactionSigner {
  static sign(data, privateKey) {
    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(data));
    sign.end();
    const key = crypto.createPrivateKey({
      key: Buffer.from(privateKey, 'hex'),
      format: 'der',
      type: 'pkcs8'
    });
    return sign.sign(key, 'hex');
  }

  static verify(data, signature, publicKey) {
    const verify = crypto.createVerify('SHA256');
    verify.update(JSON.stringify(data));
    verify.end();
    const key = crypto.createPublicKey({
      key: Buffer.from(publicKey, 'hex'),
      format: 'der',
      type: 'spki'
    });
    return verify.verify(key, signature, 'hex');
  }
}
module.exports = TransactionSigner;
