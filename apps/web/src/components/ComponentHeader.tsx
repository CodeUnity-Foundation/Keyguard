"use client";

interface ComponentHeaderProps {
  headerText: string;
  breadCrumb?: {
    name: string;
    href?: string;
  }[];
}

export default function ComponentHeader({ headerText }: ComponentHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-2xl font-bold">{headerText}</p>
    </div>
  );
}
