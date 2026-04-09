class ValidatorSet {
  constructor() {
    this.validators = new Map();
  }

  registerValidator(address, stake) {
    if (stake < 1000) throw new Error("Minimum stake required");
    this.validators.set(address, { stake, active: true });
  }

  removeValidator(address) {
    this.validators.delete(address);
  }

  getActiveValidators() {
    return Array.from(this.validators.entries()).filter(([_, v]) => v.active).map(([a]) => a);
  }

  slashValidator(address, penalty) {
    const val = this.validators.get(address);
    if (!val) return;
    val.stake -= penalty;
    if (val.stake < 1000) val.active = false;
  }
}
module.exports = ValidatorSet;
