import * as React from "react";
import { useState, useEffect } from "react";
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
  // --- STATES (Inputs Controlados) ---
  const [userAddress, setUserAddress] = useState("");
  const [amount, setAmount] = useState("");

  // --- WAGMI WRITE ---
  const {
    data: hash,
    isPending: isSigning,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // --- WAGMI READ ---
  const { address } = useAccount();
  const { data: balanceNumber } = useBalance({ address });
  const { data: gasPrice } = useGasPrice();

  // --- PREÇO E CÁLCULOS ---
  const ethPrice = useEthPrice();
  const dolarValue = amount && ethPrice ? Number(amount) * ethPrice : 0;

  const isInsufficientBalance =
    balanceNumber && amount
      ? Number(amount) > Number(balanceNumber.formatted)
      : false;

  const isBusy = isSigning || isConfirming;

  // --- EFEITOS (Limpeza) ---
  useEffect(() => {
    if (isConfirmed) {
      setAmount(""); // Limpa o valor
      setUserAddress(""); // Limpa o endereço
    }
  }, [isConfirmed]);

  // --- SUBMIT CORRIGIDO ---
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1. Validação simples
    if (isInsufficientBalance || !userAddress || !amount) return;

    // 2. Envio único usando os States
    sendTransaction({
      to: userAddress as `0x${string}`,
      value: parseEther(amount),
    });
  }

  return (
    <form onSubmit={submit} className="mt-5 flex w-full flex-col gap-4">
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
        className={`my-2 flex w-full items-center justify-center gap-2 rounded-2xl p-3 font-bold text-white transition-all ${
          isConfirmed
            ? "cursor-default bg-green-600"
            : isInsufficientBalance
              ? "cursor-not-allowed bg-gray-500"
              : isBusy
                ? "cursor-not-allowed bg-blue-500"
                : "bg-green-500 hover:bg-green-600"
        }`}
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
        <div className="rounded-2xl border border-gray-300 px-4 py-2">
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
