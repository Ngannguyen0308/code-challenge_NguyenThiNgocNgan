import { useState, useEffect } from "react";
import TokenSelector from "./TokenSelector";
import SwapButton from "./SwapButton";
import ErrorMessage from "./ErrorMessage";

const SwapForm = () => {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [convertedAmount, setConvertedAmount] = useState<number | "">("");
  const [rate, setRate] = useState<number | null>(null); // Store rate in state
  const [priceData, setPriceData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => response.json())
      .then((data) => {
        // Change array to object
        const priceMap = data.reduce((acc: any, item: any) => {
          acc[item.currency] = item.price;
          return acc;
        }, {});
        setPriceData(priceMap);
      });
  }, []);

  useEffect(() => {
    if (amount && fromToken && toToken && priceData) {
      const fromPrice = priceData[fromToken];
      const toPrice = priceData[toToken];
      if (fromPrice && toPrice) {
        const newRate = (amount * fromPrice) / toPrice;
        setConvertedAmount(newRate);
        setRate(newRate); // Store rate here
      }
    } else {
      setConvertedAmount("");
      setRate(null); // Reset rate if no amount or tokens are selected
    }
  }, [amount, fromToken, toToken, priceData]);

  const handleAmountChange = (value: string) => {
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue) && numericValue > 0) {
      setAmount(numericValue);
      setError("");
    } else {
      setAmount("");
      setError("Please enter a valid amount.");
    }
  };

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount) {
      setError("All fields are required.");
      return;
    }

    const fromPrice = priceData[fromToken];
    const toPrice = priceData[toToken];

    if (fromPrice && toPrice) {
      const newRate = (amount * fromPrice) / toPrice;
      setRate(newRate); // Update rate
    } else {
      setError("Invalid token selected.");
    }
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="w-full mx-auto p-4 bg-transparent rounded-lg shadow-[-5px_3px_6px_5px_rgba(0,_0,_0,_0.2)]">
      <div className="mb-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full lg:w-2/3 pr-2 space-y-4">
          <label className="block text-sm font-medium text-left text-white">Amount</label>
          <div className="h-12 flex items-center border text-gray-400 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="number"
              value={String(amount)}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full px-3 py-2 border-none rounded-l-md focus:ring-0 focus:outline-none text-white"
              placeholder="Amount "
            />
            <TokenSelector selectedToken={fromToken} onTokenSelect={setFromToken} />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSwapTokens}
          className="text-lg text-slate-100 cursor-pointer hover:text-slate-300 mt-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </button>

        <div className="w-full lg:w-2/3 pl-2 space-y-4">
          <label className="block text-sm font-medium text-left text-white">Converted to</label>
          <div className="h-12 flex items-center border text-gray-400 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <span className="w-full px-3 py-2 border-none rounded-l-md focus:ring-0 focus:outline-none text-gray-500">
              {convertedAmount ? convertedAmount.toFixed(2) : "0.00"}
            </span>
            <TokenSelector selectedToken={toToken} onTokenSelect={setToToken} />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-red-600 text-sm p-2 mb-2">
          <ErrorMessage message={error} />
        </div>
      )}
      {rate && (
        <p className="text-sm text-white mb-2">You will receive: {rate.toFixed(2)} {toToken}</p>
      )}
      <SwapButton onSwap={handleSwap} />
    </div>
  );
};

export default SwapForm;
