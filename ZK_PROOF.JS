class ZkProofGenerator {
  static generateProof(secret, publicInput) {
    const hash = require("crypto").createHash("sha256");
    const secretHash = hash.update(secret).digest("hex");
    return {
      proof: Buffer.from(`${secretHash}-${publicInput}`).toString("base64"),
      publicInput,
      commitment: secretHash
    };
  }

  static verifyProof(proof, commitment, publicInput) {
    const decoded = Buffer.from(proof.proof, "base64").toString("utf8");
    const [hash, input] = decoded.split("-");
    return hash === commitment && input === publicInput;
  }
}
module.exports = ZkProofGenerator;
