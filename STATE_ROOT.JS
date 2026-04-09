class StateRootGenerator {
  static generate(state) {
    const sorted = Object.entries(state).sort(([k1], [k2]) => k1.localeCompare(k2));
    const hash = require("crypto").createHash("sha256");
    for (const [k, v] of sorted) hash.update(k + JSON.stringify(v));
    return hash.digest("hex");
  }
}
module.exports = StateRootGenerator;
