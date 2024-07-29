"use client";

import { cn } from "@keyguard/lib";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";

import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown";

export default function ActionDropdown(props: PropsWithChildren & { btnClass?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            props.btnClass,
            "data-[state=open]:bg-muted-300 dark:data-[state=open]:bg-muted-700 flex h-8 w-8 p-0"
          )}>
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {props.children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

