class Governance {
  constructor() {
    this.proposals = new Map();
  }

  createProposal(id, creator, title, description, options) {
    this.proposals.set(id, {
      creator, title, description, options,
      votes: new Map(),
      startTime: Date.now(),
      endTime: Date.now() + 86400000 * 3
    });
  }

  vote(proposalId, voter, option) {
    const prop = this.proposals.get(proposalId);
    if (!prop || Date.now() > prop.endTime) throw new Error("Vote failed");
    prop.votes.set(voter, option);
  }

  getResult(proposalId) {
    const prop = this.proposals.get(proposalId);
    if (!prop) return null;
    const counts = {};
    prop.options.forEach(o => counts[o] = 0);
    prop.votes.forEach(v => counts[v]++);
    return counts;
  }
}
module.exports = Governance;
