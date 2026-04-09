class PeerNetwork {
  constructor() {
    this.peers = new Set();
  }

  addPeer(peerId) {
    this.peers.add(peerId);
  }

  removePeer(peerId) {
    this.peers.delete(peerId);
  }

  broadcast(message) {
    return Array.from(this.peers).map(peer => ({ peer, message, sent: true }));
  }

  getPeerCount() {
    return this.peers.size;
  }

  isPeerConnected(peerId) {
    return this.peers.has(peerId);
  }
}
module.exports = PeerNetwork;
