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

  const explorerUrl = chain?.blockExplorers?.default?.url
    ? `${chain.blockExplorers.default.url}/address/${address}`
    : `https://sepolia.etherscan.io/address/${address}`;

  return (
    <div className="animate-in fade-in zoom-in flex w-full flex-col items-center justify-center gap-6 rounded-2xl border border-gray-700 bg-gray-900/30 py-6 duration-300">
      <p className="font-medium text-white">
        Receive assets on{" "}
        <span className="text-green-500">
          {chain?.name || "Unknown Network"}
        </span>
      </p>

      <div className="rounded-2xl bg-white p-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
        <QRCodeSVG
          value={address}
          size={180}
          level={"H"}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-2 px-4 text-center">
        <span className="text-sm text-gray-400">Your Wallet Address</span>
        <div
          onClick={handleCopy}
          className="w-full cursor-pointer rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 font-mono text-sm break-all text-gray-200 transition-colors hover:border-gray-500 hover:text-white"
        >
          {address}
        </div>
      </div>

      <div className="flex w-full gap-3 px-4">
        <button
          onClick={handleCopy}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl py-3 font-bold transition-all duration-300 ${
            copied
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-green-500/50 bg-green-600/20 font-bold text-green-400 transition-all duration-300 hover:bg-green-600 hover:text-white"
        >
          Explorer ↗
        </a>
      </div>
    </div>
  );
}
