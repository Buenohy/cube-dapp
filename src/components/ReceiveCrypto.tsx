import React, { useState } from "react";
import { useAccount } from "wagmi";
import { QRCodeSVG } from "qrcode.react";

export default function ReceiveCrypto() {
  const { address, chain } = useAccount();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!address) return null;

  return (
    <div className="animate-in fade-in zoom-in flex w-full flex-col items-center justify-center gap-6 rounded-2xl border border-gray-300 py-4 duration-300">
      <p className="text-white">
        Receive assets on{" "}
        <span className="text-green-400">
          {chain?.name || "Unknow Network"}
        </span>
      </p>

      <div className="rounded-2xl bg-white p-4">
        <QRCodeSVG
          value={address}
          size={200}
          level={"H"}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm text-gray-400">Your Wallet Address</span>

        <p className="rounded-xl border border-gray-300 bg-slate-800 px-4 py-2 font-mono text-sm break-all text-white">
          {address}
        </p>
      </div>

      <button
        onClick={handleCopy}
        className={`flex cursor-pointer items-center gap-2 rounded-xl px-6 py-2 font-bold transition-all duration-300 ${
          copied
            ? "bg-green-500 text-white"
            : "bg-slate-700 text-white hover:bg-slate-600"
        }`}
      >
        {copied ? <>✅ Copied!</> : <>📄 Copy Address</>}
      </button>
    </div>
  );
}
