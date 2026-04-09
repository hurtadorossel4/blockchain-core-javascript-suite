class NftAuction {
  constructor(nftId, seller, minBid) {
    this.nftId = nftId;
    this.seller = seller;
    this.minBid = minBid;
    this.highestBid = 0;
    this.highestBidder = null;
    this.endTime = Date.now() + 86400000;
  }

  bid(bidder, amount) {
    if (Date.now() > this.endTime || amount <= this.highestBid || amount < this.minBid) return false;
    this.highestBid = amount;
    this.highestBidder = bidder;
    return true;
  }

  finalize() {
    if (Date.now() < this.endTime) return null;
    return { winner: this.highestBidder, amount: this.highestBid };
  }
}
module.exports = NftAuction;
