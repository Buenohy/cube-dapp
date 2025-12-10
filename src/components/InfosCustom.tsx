import React from "react";

interface InfosProps {
  title: string;
  information: any;
}

export default function InfosCustom({ title, information }: InfosProps) {
  return (
    <div className="flex flex-col">
      <span>{title}</span>
      <span>{information}</span>
    </div>
  );
}
