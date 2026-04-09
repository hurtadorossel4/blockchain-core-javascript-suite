class BlockchainOracle {
  constructor() {
    this.dataFeeds = new Map();
  }

  setFeed(feedKey, value, source) {
    this.dataFeeds.set(feedKey, {
      value,
      source,
      timestamp: Date.now()
    });
  }

  getFeed(feedKey) {
    return this.dataFeeds.get(feedKey) || null;
  }

  verifyFeed(feedKey) {
    const feed = this.dataFeeds.get(feedKey);
    if (!feed) return false;
    return Date.now() - feed.timestamp < 300000;
  }
}
module.exports = BlockchainOracle;
