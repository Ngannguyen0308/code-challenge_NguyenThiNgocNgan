import { useWalletBalances, usePrices } from 'your-hooks'; // import the necessary hooks
import WalletRow from 'your-components/WalletRow'; // import the WalletRow component
import { BoxProps } from '@mui/material'; // import BoxProps
import { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Optimized getPriority function with better TypeScript support (avoiding "any")
  const getPriority = (blockchain: string): number => {
    const priorities: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] ?? -99; // Default to -99 for unknown blockchains
  };

  // Optimized sorting + filtering, reducing array traversal from 3 times to 1
  const sortedBalances = useMemo(() => {
    return balances
      .map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain), // Precompute priority once
        formatted: balance.amount.toFixed(2), // Format amount once
      }))
      .filter((balance) => balance.priority > -99 && balance.amount > 0) // Filter balances with valid priority and amount > 0
      .sort((lhs, rhs) => rhs.priority - lhs.priority); // Sort balances based on priority
  }, [balances, prices]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => {
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount; // Avoiding undefined values
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency} // Using currency as key instead of index
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};

export default WalletPage;
