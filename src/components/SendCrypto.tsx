import React from "react";

interface SendCryptoProps {
  title: string;
  name: string;
  placeholder: any;
}

export default function SendCrypto({
  name,
  title,
  placeholder,
}: SendCryptoProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <span className="text-white">{title}</span>
      <input
        name={name}
        placeholder={placeholder}
        required
        className="w-full cursor-pointer p-2 text-3xl font-bold text-white placeholder:text-gray-400 focus:outline-none"
      />
      <div className="flex justify-between">
        <span className="font-medium text-gray-400">0 US$</span>
        <span className="font-bold text-gray-400">0 ETH</span>
      </div>
    </div>
  );
}
