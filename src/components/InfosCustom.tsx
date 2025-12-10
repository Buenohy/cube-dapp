import React from "react";

interface InfosProps {
  title: string;
  information: any;
}

export default function InfosCustom({ title, information }: InfosProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white">{title}</span>
      <span className="rounded-2xl border-2 border-green-500 bg-gray-500 p-2 text-white">
        {information}
      </span>
    </div>
  );
}
