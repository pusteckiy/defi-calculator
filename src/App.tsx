import BuyHalfStrategyCalculator from "./components/BuyHalfStartegyCalculator";
import LandingProtocolStrategy from "./components/LandingProtocolStrategy";
import "./App.css";

function App() {
  return (
    <>
      <div className="calculators-wrapper">
        <BuyHalfStrategyCalculator />
        <LandingProtocolStrategy />
      </div>
    </>
  );
}

export default App;
