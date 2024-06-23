import BuyHalfStrategyCalculator from "./components/BuyHalfStartegyCalculator";
import LandingProtocolStrategy from "./components/LandingProtocolStrategy";
import FundingCalculator from "./components/FundingCalculator";
import "./App.css";

function App() {
  return (
    <>
      <div className="calculators-wrapper">
        <BuyHalfStrategyCalculator />
        <LandingProtocolStrategy />
        <FundingCalculator />
      </div>
    </>
  );
}

export default App;
