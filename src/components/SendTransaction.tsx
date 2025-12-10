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
import InfosCustom from "./InfosCustom";

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
    <form onSubmit={submit} className="mt-5 flex w-full flex-col gap-2">
      <InfosCustom title="Your Wallet:" information={address} />
      <InfosCustom
        title="Your Balance:"
        information={
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
      <InfosCustom
        title="Gas Price:"
        information={gasPrice ? `${formatUnits(gasPrice, 9)} Gwai` : "..."}
      />
      <button
        type="submit"
        className="mt-4 rounded-2xl bg-green-500 p-2 text-white"
      >
        Send
      </button>
      <InfosCustom title="Transaction Hash:" information={hash} />
      <InfosCustom
        title="Block Number:"
        information={blockNumber?.toString()}
      />
      <InfosCustom title="Chain ID:" information={chainId} />
    </form>
  );
}
