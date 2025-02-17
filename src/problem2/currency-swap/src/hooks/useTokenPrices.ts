import { useState, useEffect } from "react";
import { fetchPrices } from "../utils/fetchPrices";

interface TokenPrices {
  [currency: string]: number;
}

export const useTokenPrices = () => {
  const [prices, setPrices] = useState<TokenPrices | null>(null); 
  const [error, setError] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    fetchPrices()
      .then((data) => {
        setPrices(data);
        setLoading(false); 
      })
      .catch((err) => {
        setError("Failed to load token prices.");
        setLoading(false); // Even on error, stop loading
      });
  }, []);

  return { prices, error, loading };
};
