import { useEffect, useState } from "react";

export default function useEthPrice() {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
        );
        const data = await response.json();
        setPrice(data.ethereum.usd);
      } catch (error) {
        console.log("Error to search price ETH", error);
      }
    }
    fetchPrice();
  }, []);
  return price;
}
