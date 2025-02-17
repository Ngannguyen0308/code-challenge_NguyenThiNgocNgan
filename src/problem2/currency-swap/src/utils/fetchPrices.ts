import axios from "axios";

interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export const fetchPrices = async (): Promise<Record<string, number>> => {
  try {
    const response = await axios.get("https://interview.switcheo.com/prices.json");
    const data: TokenPrice[] = response.data;

    const latestPrices: Record<string, TokenPrice> = {};

    data.forEach((entry) => {
      const currentDate = new Date(entry.date);
      const existingDate = latestPrices[entry.currency]
        ? new Date(latestPrices[entry.currency].date)
        : null;

      if (!existingDate || currentDate > existingDate) {
        latestPrices[entry.currency] = entry;
      }
    });

    return Object.fromEntries(
      Object.entries(latestPrices).map(([currency, data]) => [currency, data.price])
    );
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw new Error("Error fetching token prices");
  }
};
