const crypto = require('crypto');

class MerkleTree {
  constructor(leaves) {
    this.leaves = leaves.map(l => this.hash(l));
    this.layers = this.buildTree();
  }

  hash(data) {
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  buildTree() {
    const layers = [this.leaves];
    while (layers[layers.length - 1].length > 1) {
      const layer = layers[layers.length - 1];
      const next = [];
      for (let i = 0; i < layer.length; i += 2) {
        const left = layer[i];
        const right = layer[i + 1] || left;
        next.push(this.hash(left + right));
      }
      layers.push(next);
    }
    return layers;
  }

  getRoot() {
    return this.layers[this.layers.length - 1][0];
  }
}
module.exports = MerkleTree;
