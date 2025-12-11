import React from "react";

interface ReceiveCryptoProps {
  chainName: string;
  qrcode: string;
  address: string;
}

export default function ReceiveCrypto({
  chainName,
  qrcode,
  address,
}: ReceiveCryptoProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-300 px-4 py-2">
      <h2 className="text-white">Receive assets on {chainName}</h2>
      <h3 className="text-white">{qrcode}</h3>
      <h4 className="text-white">{address}</h4>
      <button
        type="button"
        className="cursor-pointer rounded-2xl border px-4 py-2 text-white"
      >
        Copy address
      </button>
    </div>
  );
}
