import * as React from "react";
import { useState } from "react";
import {
  useSendTransaction,
  useGasPrice,
  useAccount,
  useBalance,
  useBlockNumber,
  useChainId,
} from "wagmi";
import { parseEther, formatUnits } from "viem";
import InputCustom from "./InputCustom";
import InfosCustom from "./InfosCustom";
import SendCrypto from "./SendCrypto";
import AdressCrypto from "./AdressCrypto";
import useEthPrice from "../hooks/useEthPrice";

export function SendTransaction() {
  const [amount, setAmount] = useState("");
  const ethPice = useEthPrice();

  const dolarValue = amount && ethPice ? Number(amount) * ethPice : 0;

  const formatteDolar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dolarValue);

  const { address } = useAccount();
  const { data: balanceNumber } = useBalance({ address });
  const { data: gasPrice } = useGasPrice();
  const { data: hash, sendTransaction } = useSendTransaction();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const chainId = useChainId();

  const isInsufficientBalance =
    balanceNumber && amount
      ? Number(amount) > Number(balanceNumber.formatted)
      : false;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;

    if (isInsufficientBalance) return;

    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <form onSubmit={submit} className="mt-5 flex w-full flex-col gap-2">
      <div className="flex flex-col gap-2">
        <SendCrypto
          title="Amount"
          name="value"
          placeholder="0"
          dolar={Number(dolarValue.toFixed(2))}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          isError={isInsufficientBalance}
          crypto={
            balanceNumber
              ? Number(balanceNumber.formatted).toFixed(2)
              : "Loading..."
          }
          cryptoName={balanceNumber?.symbol || "ETH"}
        />
        <AdressCrypto
          title="Send to Address"
          name="address"
          placeholder="0x1234..."
        />
      </div>
      <button
        type="submit"
        disabled={isInsufficientBalance}
        className={`my-4 rounded-2xl p-2 text-white transition-colors ${
          isInsufficientBalance
            ? "cursor-not-allowed bg-gray-500"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isInsufficientBalance ? "Insufficient Balance" : "Send"}
      </button>
      <div className="rounded-2xl border border-gray-300 px-4 py-2">
        <InfosCustom
          title="Gas Price:"
          information={gasPrice ? `${formatUnits(gasPrice, 9)} Gwei` : "..."}
        />
        <InfosCustom title="Transaction Hash:" information={hash} />
      </div>
    </form>
  );
}
