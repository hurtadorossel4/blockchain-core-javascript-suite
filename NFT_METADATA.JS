class NftMetadata {
  constructor() {
    this.tokens = new Map();
  }

  mint(tokenId, owner, name, description, imageUrl, attributes = []) {
    if (this.tokens.has(tokenId)) throw new Error("Token already exists");
    this.tokens.set(tokenId, {
      owner,
      name,
      description,
      imageUrl,
      attributes,
      createdAt: Date.now()
    });
  }

  transfer(tokenId, from, to) {
    const token = this.tokens.get(tokenId);
    if (!token || token.owner !== from) throw new Error("Transfer failed");
    token.owner = to;
  }

  getToken(tokenId) {
    return this.tokens.get(tokenId) || null;
  }

  getOwnerTokens(owner) {
    return Array.from(this.tokens.values()).filter(t => t.owner === owner);
  }
}
module.exports = NftMetadata;
