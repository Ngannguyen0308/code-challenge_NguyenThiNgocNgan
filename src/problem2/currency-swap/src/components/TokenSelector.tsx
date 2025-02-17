import { useTokenPrices } from "../hooks/useTokenPrices";

interface TokenSelectorProps {
  selectedToken: string;
  onTokenSelect: (token: string) => void;
}

const TokenSelector = ({ selectedToken, onTokenSelect }: TokenSelectorProps) => {
  const { prices, error } = useTokenPrices();

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!prices) {
    return <div>Loading...</div>;
  }

  return (
    <select
      value={selectedToken}
      onChange={(e) => onTokenSelect(e.target.value)}
      className="w-full px-3 py-2 cursor-pointer text-white"
    >
      <option value="">Currency</option>
      {Object.entries(prices).map(([currency]) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default TokenSelector;
