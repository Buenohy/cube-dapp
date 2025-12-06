import * as React from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export function SendTransaction() {
  const { data: hash, sendTransaction } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <h2>Send to address</h2>
      <input
        name="address"
        placeholder="0xA0Cf…251e"
        required
        className="rounded-full border-2 border-gray-400 p-2"
      />
      <h2>Value</h2>
      <input
        name="value"
        placeholder="0.05"
        required
        className="rounded-full border-2 border-gray-400 p-2"
      />
      <button
        type="submit"
        className="rounded-full bg-green-500 p-2 text-white"
      >
        Send
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
}
