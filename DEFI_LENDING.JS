class DefiLending {
  constructor() {
    this.loans = new Map();
  }

  createLoan(id, borrower, collateral, borrowAmount, interestRate) {
    this.loans.set(id, {
      borrower, collateral, borrowAmount, interestRate,
      borrowedAt: Date.now(),
      repaid: false
    });
  }

  calculateDebt(loanId) {
    const loan = this.loans.get(loanId);
    if (!loan || loan.repaid) return 0;
    const days = (Date.now() - loan.borrowedAt) / 86400000;
    return loan.borrowAmount * (1 + loan.interestRate * days / 365);
  }

  repayLoan(loanId) {
    const loan = this.loans.get(loanId);
    if (!loan) return false;
    loan.repaid = true;
    return true;
  }
}
module.exports = DefiLending;
