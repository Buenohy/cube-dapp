import React from "react";

interface SendCryptoProps {
  title: string;
  name: string;
  placeholder: any;
  dolar: number;
  crypto: any;
  cryptoName: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
}

export default function SendCrypto({
  name,
  title,
  placeholder,
  dolar,
  crypto,
  cryptoName,
  value,
  onChange,
  isError,
}: SendCryptoProps) {
  return (
    <div
      className={`flex w-full flex-col gap-1 rounded-2xl px-4 py-2 ring-1 ${
        isError ? "bg-red-900/10 ring-red-500" : "ring-gray-300"
      }`}
    >
      <span className="text-white">{title}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode="decimal"
        type="number"
        required
        className="w-full cursor-pointer [appearance:textfield] p-2 text-3xl font-bold text-white placeholder:text-gray-400 focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div className="flex justify-between">
        <span className="font-medium text-gray-400">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(dolar)}
        </span>
        <span
          className={`font-bold ${isError ? "text-red-50" : "text-gray-400"}`}
        >
          {crypto} {cryptoName}
        </span>
      </div>
    </div>
  );
}
