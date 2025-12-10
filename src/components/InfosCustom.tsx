import React from "react";

interface InfosProps {
  title: string;
  information: any;
}

export default function InfosCustom({ title, information }: InfosProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white">{title}</span>
      <span className="text-sm break-all text-white">{information}</span>
    </div>
  );
}
