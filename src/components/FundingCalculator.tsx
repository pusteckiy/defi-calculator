import { useEffect, useState } from "react";

function FundingCalculator() {
  const [initUSDAmount, setInitUSDAmount] = useState<string>("");
  const [funding1, setFunding1] = useState<string>("");
  const [funding2, setFunding2] = useState<string>("");
  const [funding1Hours, setFunding1Hours] = useState<string>("");
  const [funding2Hours, setFunding2Hours] = useState<string>("");
  const [positionHours, setPositionHours] = useState<string>("");
  const [results, setResults] = useState<{
    earns: number;
    totalBalance: number;
    roi: number;
  } | null>(null);

  const calculateFundingStrategy = () => {
    const initUSDAmountNumber = parseFloat(initUSDAmount);
    const funding1Number = parseFloat(funding1);
    const funding2Number = parseFloat(funding2);
    const funding1HoursNumber = parseFloat(funding1Hours);
    const funding2HoursNumber = parseFloat(funding2Hours);
    const positionHoursNumber = parseFloat(positionHours);

    if (
      isNaN(initUSDAmountNumber) ||
      isNaN(funding1Number) ||
      isNaN(funding2Number) ||
      isNaN(funding1HoursNumber) ||
      isNaN(funding2HoursNumber) ||
      isNaN(positionHoursNumber) ||
      initUSDAmountNumber <= 0 ||
      funding1HoursNumber < 0 ||
      funding2HoursNumber <= 0 ||
      positionHoursNumber <= 0
    ) {
      return;
    }

    const usdForSide = initUSDAmountNumber / 2;
    const funding1PercentInHour = funding1Number / 100 / funding1HoursNumber;
    const funding2PercentInHour = funding2Number / 100 / funding2HoursNumber;
    const earnsFromFunding1inHour = usdForSide * funding1PercentInHour;
    const earnsFromFunding2inHour = usdForSide * funding2PercentInHour;
    const earns = (earnsFromFunding1inHour + earnsFromFunding2inHour) * positionHoursNumber ;
    const totalBalance = initUSDAmountNumber + earns;
    const roi = (earns / initUSDAmountNumber) * 100;

    setResults({
      earns,
      totalBalance,
      roi,
    });
  };

  useEffect(() => {
    calculateFundingStrategy();
  }, [initUSDAmount, funding1, funding2, funding1Hours, funding2Hours, positionHours]);


  return (
    <div className="container">
      <h2>Funding Calculator</h2>
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
          <div className="custom-input__title">funding_1_long</div>
          <input
            className="custom-input__text"
            type="number"
            onChange={(event) => setFunding1(event.target.value)}
            value={funding1}
          />
          <div>
            <span className="custom-input__currency-span">%</span>
          </div>
        </div>
        <div className="custom-input">
          <div className="custom-input__title">applies_every</div>
          <input
            className="custom-input__text"
            type="number"
            onChange={(event) => setFunding1Hours(event.target.value)}
            value={funding1Hours}
          />
          <div>
            <span className="custom-input__currency-span">HOURS</span>
          </div>
        </div>
        <div className="one-row">
          <div className="custom-input">
            <div className="custom-input__title">funding_2_short</div>
            <input
              className="custom-input__text"
              type="number"
              onChange={(event) => setFunding2(event.target.value)}
              value={funding2}
            />
            <div>
              <span className="custom-input__currency-span">%</span>
            </div>
          </div>
          <div className="custom-input">
            <div className="custom-input__title">applies_every</div>
            <input
              className="custom-input__text"
              type="number"
              onChange={(event) => setFunding2Hours(event.target.value)}
              value={funding2Hours}
            />
            <div>
              <span className="custom-input__currency-span">HOURS</span>
            </div>
          </div>
        </div>
        <div className="custom-input">
            <div className="custom-input__title">position_hours</div>
            <input
              className="custom-input__text"
              type="number"
              onChange={(event) => setPositionHours(event.target.value)}
              value={positionHours}
            />
            <div>
              <span className="custom-input__currency-span">HOURS</span>
            </div>
          </div>
      </div>
      {results ? (
        <div className="results">
          <h2>Results</h2>
          <p>earns: {results.earns.toFixed(2)} $</p>
          <p>total balance: {results.totalBalance.toFixed(2)} $</p>
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
            <span className="bad">✘</span> input values to get results{" "}
            <span className="bad">✘</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default FundingCalculator;
