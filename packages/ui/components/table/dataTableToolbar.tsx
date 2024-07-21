"use client";

import { Cross2Icon, LayoutIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useLayoutEffect, useState } from "react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown";
import { Input } from "../input";
import { priorities, statuses } from "./data";
import { DataTableFacetedFilter } from "./dataTableFacetedFilter";
import { DataTableViewOptions } from "./dataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const InitialLayoutValues = {
  grid: {
    checked: false,
  },
  list: {
    checked: false,
  },
  table: {
    checked: false,
  },
} as const;
type LayoutType = keyof typeof InitialLayoutValues;

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [layouts, setLayouts] = useState(() =>structuredClone({ ...InitialLayoutValues, ["table"]: { checked: true } }));

  const handleLayoutChange = (layout: LayoutType) => {
    localStorage.setItem("tableLayout", layout);
    setLayouts({ ...structuredClone(InitialLayoutValues), [layout]: { checked: true } });
  };

  useLayoutEffect(()=>{
    const storedLayout = localStorage.getItem("tableLayout");
    if(storedLayout) setLayouts(structuredClone({ ...InitialLayoutValues, [storedLayout]: { checked: true } }));
  },[])

  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="mb-3 flex items-center gap-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="mb-3 flex items-center justify-center gap-2">
        <DataTableViewOptions table={table} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="gap-1">
              <LayoutIcon className="h-4 w-4" />
              Layout
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Change layout</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(layouts) as LayoutType[]).map((layout: LayoutType) => (
                <DropdownMenuCheckboxItem
                  key={layout}
                  className="capitalize"
                  checked={layouts[layout].checked}
                  onCheckedChange={() => handleLayoutChange(layout)}>
                  {layout}
                </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
