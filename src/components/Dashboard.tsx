import { useState } from "react";
import { SendTransaction } from "./SendTransaction";
import ReceiveCrypto from "./ReceiveCrypto";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send");

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full rounded-2xl border border-zinc-700 bg-zinc-800 p-1">
        <button
          onClick={() => setActiveTab("send")}
          className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
            activeTab === "send"
              ? "bg-zinc-600 text-white shadow-md"
              : "cursor-pointer text-zinc-400 hover:text-white"
          }`}
        >
          Send
        </button>
        <button
          onClick={() => setActiveTab("receive")}
          className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
            activeTab === "receive"
              ? "bg-zinc-600 text-white shadow-md"
              : "cursor-pointer text-zinc-400 hover:text-white"
          }`}
        >
          Receive
        </button>
      </div>

      <div className="animate-in fade-in zoom-in duration-300">
        {activeTab === "send" ? <SendTransaction /> : <ReceiveCrypto />}
      </div>
    </div>
  );
}
