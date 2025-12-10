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
    <div className="flex flex-col gap-2">
      <span>{title}</span>
      <input
        name={name}
        placeholder={placeholder}
        required
        className="w-full rounded-2xl border-2 border-gray-400 p-2"
      />
    </div>
  );
}
