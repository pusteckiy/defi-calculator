import { useState, useEffect } from "react";

function LandingProtocolStrategy() {
  const [initUSDAmount, setInitUSDAmount] = useState<string>("");
  const [tokenPriceInUSD, setTokenPriceInUSD] = useState<string>("");
  const [futureTokenPriceInUSD, setFutureTokenPriceInUSD] = useState<string>("");
  const [poolAPR, setPoolAPR] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [results, setResults] = useState<{
    liquidityPoolBalance: number;
    feesEarnedFromAPR: number;
    totalBalance: number;
    roi: number;
  } | null>(null);

  const calculateLandingProtocolStrategy = () => {
    const initUSDAmountNumber = parseFloat(initUSDAmount);
    const tokenPriceInUSDNumber = parseFloat(tokenPriceInUSD);
    const futureTokenPriceInUSDNumber = parseFloat(futureTokenPriceInUSD);
    const poolAPRNumber = parseFloat(poolAPR);
    const daysNumber = parseFloat(days);

    if (
      isNaN(initUSDAmountNumber) ||
      isNaN(tokenPriceInUSDNumber) ||
      isNaN(futureTokenPriceInUSDNumber) ||
      isNaN(poolAPRNumber) ||
      isNaN(daysNumber) ||
      initUSDAmountNumber <= 0 ||
      tokenPriceInUSDNumber <= 0 ||
      futureTokenPriceInUSDNumber <= 0 ||
      poolAPRNumber < 0 ||
      daysNumber <= 0
    ) {
      return;
    }

    const usdForPoolAmount = initUSDAmountNumber / 3;
    const usdForLanding = initUSDAmountNumber - usdForPoolAmount;
    const availableUsdInLanding = usdForLanding / 2;
    const tokenAmount = availableUsdInLanding / tokenPriceInUSDNumber;

    const k = usdForPoolAmount * tokenAmount;
    const newTokenAmount = Math.sqrt(k / futureTokenPriceInUSDNumber);
    const newUSDAmount = k / newTokenAmount;

    const liquidityPoolBalance = newTokenAmount * futureTokenPriceInUSDNumber + newUSDAmount;
    const feesEarnedFromAPR = ((liquidityPoolBalance * poolAPRNumber) / 100 / 365) * daysNumber;
    const totalBalance = liquidityPoolBalance + feesEarnedFromAPR + availableUsdInLanding;
    const profit = totalBalance - initUSDAmountNumber;
    const roi = (profit / initUSDAmountNumber) * 100;

    setResults({
      liquidityPoolBalance,
      feesEarnedFromAPR,
      totalBalance,
      roi,
    });
  };

  useEffect(() => {
    calculateLandingProtocolStrategy();
  }, [initUSDAmount, tokenPriceInUSD, futureTokenPriceInUSD, poolAPR, days]);

  return (
    <div className="container">
      <h2>Landing Protocol Strategy</h2>
      <div className="inputs">
        <div className="custom-input">
          <div className="custom-input__title">initial_investment_in_usd</div>
          <input
            className="custom-input__text"
            type="number"
            onChange={(event) => setInitUSDAmount(event.target.value)}
            value={initUSDAmount}
          />
          <div>
            <span className="custom-input__currency-span">USD</span>
          </div>
        </div>
        <div className="custom-input">
          <div className="custom-input__title">initial_token_price</div>
          <input
            className="custom-input__text"
            type="number"
            onChange={(event) => setTokenPriceInUSD(event.target.value)}
            value={tokenPriceInUSD}
          />
          <div>
            <span className="custom-input__currency-span">USD</span>
          </div>
        </div>
        <div className="custom-input">
          <div className="custom-input__title">future_token_price</div>
          <input
            className="custom-input__text"
            type="number"
            onChange={(event) => setFutureTokenPriceInUSD(event.target.value)}
            value={futureTokenPriceInUSD}
          />
          <div>
            <span className="custom-input__currency-span">USD</span>
          </div>
        </div>
        <div className="custom-input">
          <div className="custom-input__title">pool_apr</div>
          <input
            className="custom-input__text"
            type="number"
            onChange={(event) => setPoolAPR(event.target.value)}
            value={poolAPR}
          />
          <div>
            <span className="custom-input__currency-span">%</span>
          </div>
        </div>
        <div className="custom-input">
          <div className="custom-input__title">days</div>
          <input
            className="custom-input__text"
            type="number"
            onChange={(event) => setDays(event.target.value)}
            value={days}
          />
          <div>
            <span className="custom-input__currency-span">DAYS</span>
          </div>
        </div>
      </div>
      {results ? (
        <div className="results">
          <h2>Results</h2>
          <p>
          liquidity pool balance: {results.liquidityPoolBalance.toFixed(2)} USD
          </p>
          <p>earned from APR: {results.feesEarnedFromAPR.toFixed(2)} USD</p>
          <p>total balance: {results.totalBalance.toFixed(2)} USD</p>
          <p>
            ROI:{" "}
            {results.roi < 0 ? (
              <span className="bad">{results.roi.toFixed(2)}%</span>
            ) : (
              <span className="good">{results.roi.toFixed(2)}%</span>
            )}
          </p>
        </div>
      ) : (
        <div className="results">
          <h2>Results</h2>
          <p>
            <span className="bad">✘</span> Input values to get results <span className="bad">✘</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default LandingProtocolStrategy;
