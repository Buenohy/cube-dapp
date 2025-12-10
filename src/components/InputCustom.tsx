import React from "react";

interface InputCustomProps {
  title: string;
  name: string;
  placeholder: any;
}

export default function InputCustom({
  name,
  title,
  placeholder,
}: InputCustomProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <span className="text-white">{title}</span>
      <input
        name={name}
        placeholder={placeholder}
        required
        className="w-full cursor-pointer rounded-2xl border-2 border-gray-400 p-2 text-white placeholder:text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
}
