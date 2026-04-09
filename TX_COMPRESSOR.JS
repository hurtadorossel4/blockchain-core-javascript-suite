class TransactionCompressor {
  static compress(tx) {
    return {
      i: tx.id,
      f: tx.from,
      t: tx.to,
      v: tx.value,
      s: tx.signature,
      ts: tx.timestamp
    };
  }

  static decompress(compressed) {
    return {
      id: compressed.i,
      from: compressed.f,
      to: compressed.t,
      value: compressed.v,
      signature: compressed.s,
      timestamp: compressed.ts
    };
  }
}
module.exports = TransactionCompressor;
