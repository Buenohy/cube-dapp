import * as React from "react";
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

export function SendTransaction() {
  const { data: hash, sendTransaction } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { address } = useAccount();

  const { data: balanceNumber } = useBalance({ address });

  const { data: gasPrice } = useGasPrice();

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const chainId = useChainId();

  return (
    <form onSubmit={submit} className="mt-5 flex w-full flex-col gap-4">
      <InputCustom title="Your Wallet" name="wallet" placeholder={address} />
      <InputCustom
        title="Your Balance"
        name="balance"
        placeholder={
          balanceNumber
            ? `${balanceNumber.formatted} ${balanceNumber.symbol}`
            : "Loading..."
        }
      />
      <InputCustom
        title="Send to addres"
        name="address"
        placeholder="0xA0Cf…251e"
      />
      <InputCustom title="Value" name="value" placeholder="0.01" />
      <InputCustom
        title="Gas Price:"
        name="gasPrice"
        placeholder={gasPrice ? `${formatUnits(gasPrice, 9)} Gwai` : "..."}
      />
      <button type="submit" className="rounded-2xl bg-green-500 p-2 text-white">
        Send
      </button>
      <InputCustom
        title="Transaction Hash:"
        name="transactionHash"
        placeholder={hash}
      />
      <InputCustom
        title="Block Number:"
        name="blockNumber"
        placeholder={blockNumber?.toString()}
      />
      <InputCustom title="Chain ID:" name="chainId" placeholder={chainId} />
    </form>
  );
}
