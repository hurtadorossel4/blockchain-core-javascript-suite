class DefiLiquidityPool {
  constructor() {
    this.pools = new Map();
  }

  createPool(tokenA, tokenB, fee = 0.003) {
    const key = `${tokenA}-${tokenB}`;
    this.pools.set(key, {
      reserveA: 0,
      reserveB: 0,
      fee,
      liquidity: 0,
      lpTokens: new Map()
    });
  }

  addLiquidity(poolKey, user, amountA, amountB) {
    const pool = this.pools.get(poolKey);
    if (!pool) throw new Error("Pool not found");
    pool.reserveA += amountA;
    pool.reserveB += amountB;
    const lp = Math.sqrt(amountA * amountB);
    pool.liquidity += lp;
    pool.lpTokens.set(user, (pool.lpTokens.get(user) || 0) + lp);
  }

  swap(poolKey, user, fromToken, amount) {
    const pool = this.pools.get(poolKey);
    if (!pool) throw new Error("Pool not found");
    const isA = fromToken === poolKey.split("-")[0];
    const inputWithFee = amount * (1 - pool.fee);
    const [inReserve, outReserve] = isA ? [pool.reserveA, pool.reserveB] : [pool.reserveB, pool.reserveA];
    const output = (outReserve * inputWithFee) / (inReserve + inputWithFee);
    if (isA) {
      pool.reserveA += amount;
      pool.reserveB -= output;
    } else {
      pool.reserveB += amount;
      pool.reserveA -= output;
    }
    return output;
  }
}
module.exports = DefiLiquidityPool;
