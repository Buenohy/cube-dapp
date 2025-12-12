import * as React from "react";
import { useState, useEffect } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useGasPrice,
  useAccount,
  useBalance,
} from "wagmi";
import { parseEther, formatUnits } from "viem";
import InfosCustom from "./InfosCustom";
import SendCrypto from "./SendCrypto";
import AdressCrypto from "./AdressCrypto";
import useEthPrice from "../hooks/useEthPrice";

export function SendTransaction() {
  const addRecentTransaction = useAddRecentTransaction();

  const [userAddress, setUserAddress] = useState("");
  const [amount, setAmount] = useState("");

  const {
    data: hash,
    isPending: isSigning,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const { address } = useAccount();
  const { data: balanceNumber } = useBalance({ address });
  const { data: gasPrice } = useGasPrice();

  const ethPrice = useEthPrice();
  const dolarValue = amount && ethPrice ? Number(amount) * ethPrice : 0;

  const isInsufficientBalance =
    balanceNumber && amount
      ? Number(amount) > Number(balanceNumber.formatted)
      : false;

  const isBusy = isSigning || isConfirming;

  useEffect(() => {
    if (hash) {
      addRecentTransaction({
        hash: hash,
        description: `Send ${amount} ETH`,
        confirmations: 1,
      });
    }
  }, [hash]);

  useEffect(() => {
    if (isConfirmed) {
      setAmount("");
      setUserAddress("");
    }
  }, [isConfirmed]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isInsufficientBalance || !userAddress || !amount) return;

    sendTransaction({
      to: userAddress as `0x${string}`,
      value: parseEther(amount),
    });
  }

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-4">
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
              ? Number(balanceNumber.formatted).toFixed(4)
              : "Loading..."
          }
          cryptoName={balanceNumber?.symbol || "ETH"}
        />
        <AdressCrypto
          title="Send to Address"
          name="address"
          placeholder="0x1234..."
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isInsufficientBalance || isBusy || isConfirmed}
        className={`my-2 flex w-full items-center justify-center gap-2 rounded-2xl border p-3 font-bold text-white transition-all duration-300 ${
          isConfirmed
            ? "cursor-default border-green-500/50 bg-green-600/20 text-green-400"
            : isInsufficientBalance
              ? "cursor-not-allowed border-red-500/30 bg-red-500/10 text-red-500"
              : isBusy
                ? "cursor-wait border-blue-500/50 bg-blue-600/20 text-blue-400"
                : "cursor-pointer border-green-500/50 bg-green-600/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:bg-green-600 hover:text-white"
        } `}
      >
        {isSigning && (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Check Wallet...
          </>
        )}

        {isConfirming && !isSigning && (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processing...
          </>
        )}

        {isConfirmed && "Transaction Sent!"}

        {!isBusy &&
          !isConfirmed &&
          (isInsufficientBalance ? "Insufficient Balance" : "Send")}
      </button>

      {(gasPrice || hash) && (
        <div className="rounded-2xl border border-gray-300 px-4 py-3 shadow-sm">
          {gasPrice && (
            <InfosCustom
              title="Gas Price:"
              information={`${formatUnits(gasPrice, 9)} Gwei`}
            />
          )}

          {hash && (
            <div className="mt-2">
              <InfosCustom title="Transaction Hash:" information={hash} />
            </div>
          )}
        </div>
      )}
    </form>
  );
}
