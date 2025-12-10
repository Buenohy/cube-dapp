import React from "react";

interface AdressCryptoProps {
  title: string;
  name: string;
  placeholder: any;
}

export default function AdressCrypto({
  name,
  title,
  placeholder,
}: AdressCryptoProps) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border border-gray-300 px-4 py-2">
      <span className="text-white">{title}</span>
      <input
        name={name}
        placeholder={placeholder}
        required
        className="w-full cursor-pointer p-2 text-sm font-bold text-white placeholder:text-xl placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
}
