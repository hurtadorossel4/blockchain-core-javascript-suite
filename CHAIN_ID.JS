class ChainIdGenerator {
  static generate(chainName, networkType) {
    const hash = require("crypto").createHash("md5").update(`${chainName}-${networkType}-${Date.now()}`).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % 2147483647;
  }

  static validate(chainId) {
    return Number.isInteger(chainId) && chainId > 0 && chainId < 2147483648;
  }
}
module.exports = ChainIdGenerator;
