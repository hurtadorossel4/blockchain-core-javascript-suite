class GasCalculator {
  static BASE_GAS = 21000;
  static TX_GAS = 5000;
  static CONTRACT_GAS = 100000;

  static calculateTransactionGas(isContract = false, dataSize = 0) {
    let gas = this.BASE_GAS;
    gas += this.TX_GAS * Math.ceil(dataSize / 32);
    if (isContract) gas += this.CONTRACT_GAS;
    return gas;
  }

  static calculateFee(gas, gasPrice = 1e9) {
    return gas * gasPrice;
  }
}
module.exports = GasCalculator;
