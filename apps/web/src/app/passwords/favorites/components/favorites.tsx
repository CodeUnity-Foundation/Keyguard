"use client";

import { cn } from "@keyguard/lib";
import {
  ActionDropdown,
  Button,
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  DropdownMenuItem,
  DropdownMenuSeparator,
  FacetedFilter,
  Input,
  LayoutSwitcher,
} from "@keyguard/ui";
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Else, For, If, Then } from "classic-react-components";
import { useLayoutEffect, useMemo, useState } from "react";
import { MdDelete, MdEdit, MdFavorite, MdFileCopy } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import ComponentHeader from "@keyguard/web/components/ComponentHeader";

type LayoutType = "grid" | "table";

export default function FavoritesComp() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>("table");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableData, setTableData] = useState(data);

  const selectedRowCount = useMemo(() => Object.keys(rowSelection).length, [rowSelection]);

  const table = useReactTable({
    data: tableData,
    columns: cols,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    meta: {
      deleteRow: (rowIndex: number) => {
        setTableData((data) => {
          const result = data.filter((row) => row.id != rowIndex);
          return result;
        });
        setRowSelection((selectedRows) => {
          delete selectedRows[rowIndex];
          return { ...selectedRows };
        });
      },
      deleteSelectedRows: () => {
        const selectedRowsId = table.getSelectedRowModel().flatRows.map((row) => row.original.id);
        setTableData((data) => {
          const result = data.filter((row) => !selectedRowsId.includes(row.id));
          return result;
        });
        setRowSelection({});
      },
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleLayoutChange = (layout: string) => {
    localStorage.setItem("tableLayout", layout);
    setSelectedLayout(layout as LayoutType);
  };

  useLayoutEffect(() => {
    const storedLayout = localStorage.getItem("tableLayout");
    if (storedLayout) {
      setSelectedLayout(storedLayout as LayoutType);
    }
  }, []);

  return (
    <>
      <ComponentHeader headerText={"Favorites"} />

      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-2">
          <div>
            <Input
              placeholder="search..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          </div>
          <div className="mr-auto flex items-center gap-2">
            {table.getColumn("category") && (
              <FacetedFilter
                column={table.getColumn("category")}
                title="Category"
                options={[
                  { label: "Card", value: "card" },
                  { label: "Web", value: "web" },
                ]}
              />
            )}
            <If condition={isFiltered}>
              <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                Reset
                <RxCross2 className="ml-2 h-4 w-4" />
              </Button>
            </If>
          </div>

          <If condition={selectedRowCount > 0}>
            <ActionDropdown>
              <DropdownMenuItem>
                <MdFavorite className="mr-2 h-4 w-4" />
                Favorite
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={table.options?.meta?.deleteSelectedRows}>
                <MdDelete className="mr-2 h-4 w-4" />
                Delete selected
              </DropdownMenuItem>
            </ActionDropdown>
          </If>

          <If condition={selectedLayout == "table"}>
            <DataTableViewOptions table={table} />
          </If>

          <LayoutSwitcher
            handleLayoutChange={handleLayoutChange}
            layouts={["grid", "table"]}
            selectedLayout={selectedLayout}
            disabled={selectedRowCount > 0}
          />
        </div>
        <If condition={selectedLayout == "table"}>
          <DataTable table={table} columns={cols} />
        </If>
        <If condition={selectedLayout == "grid"}>
          <If condition={table.getRowModel().flatRows.length == 0}>
            <Then>
              <div className="card bg-card flex h-24 items-center justify-center">No results.</div>
            </Then>
            <Else>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <For data={table.getRowModel().flatRows}>
                  {({ original: props, ...row }) => {
                    return (
                      <div
                        key={props.id}
                        className="card bg-card hover:bg-accent-foreground data-[state=selected]:bg-accent-foreground group relative flex h-40 flex-col rounded-md border border-b p-3 transition-colors"
                        {...(row.getIsSelected() ? { "data-state": "selected" } : {})}>
                        <div className="h-5">
                          <div
                            className={cn(
                              "flex justify-between",
                              !row.getIsSelected() && "opacity-0 group-hover:opacity-100 "
                            )}>
                            <input
                              type="checkbox"
                              checked={row.getIsSelected()}
                              onChange={() => row.toggleSelected()}
                              disabled={!row.getCanSelect()}
                            />
                            <button>
                              <MdFavorite
                                className={`mr-2 h-4 w-4 ${props.isFavourite ? "fill-orange" : "fill-slate-200"}`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center gap-1">
                          <span className="text-lg">Name</span>
                          <span className="text-lg">{props.name}</span>
                        </div>
                        <div>
                          <ActionDropdown btnClass="ml-auto">
                            <DropdownMenuItem>
                              <MdEdit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MdFileCopy className="mr-2 h-4 w-4" /> Make a copy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MdFavorite className="mr-2 h-4 w-4" /> Favorite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => table.options?.meta?.deleteRow?.(props.id)}>
                              <MdDelete className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </ActionDropdown>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </Else>
          </If>
        </If>
        <DataTablePagination table={table} />
      </div>
    </>
  );
}

type TColData = {
  id: number;
  name: string;
  username: string;
  password: string;
  category: string;
  folder: string;
  isFavourite?: boolean;
};

const data: TColData[] = [
  {
    id: 1,
    name: "amazon.in",
    username: "asis",
    password: "*****",
    category: "card",
    folder: "string",
    isFavourite: true,
  },
  { id: 2, name: "google.in", username: "ankit", password: "*****", category: "card", folder: "string" },
  { id: 3, name: "web.dev", username: "rajdip", password: "*****", category: "card", folder: "string" },
  { id: 4, name: "dev.to", username: "ashutosh", password: "*****", category: "card", folder: "string" },
  { id: 5, name: "medium.com", username: "dipesh", password: "*****", category: "card", folder: "string" },
  { id: 6, name: "github.com", username: "upendra", password: "*****", category: "card", folder: "string" },
  {
    id: 7,
    name: "stackoverflow.com",
    username: "raju",
    password: "*****",
    category: "web",
    folder: "string",
  },
  { id: 8, name: "react.dev", username: "sung", password: "*****", category: "card", folder: "string" },
  { id: 9, name: "nextjs.org", username: "naruto", password: "*****", category: "card", folder: "string" },
  { id: 10, name: "unsplash.com", username: "sasuke", password: "*****", category: "card", folder: "string" },
  { id: 11, name: "figma.com", username: "saitama", password: "*****", category: "card", folder: "string" },
  {
    id: 12,
    name: "uidesigndaily.com",
    username: "goku",
    password: "*****",
    category: "web",
    folder: "string",
  },
];
const additionalColuns = ["all"] as const;
const colsArr = [...additionalColuns, "name", "username", "category", "folder", "actions"] as const;

const cols: ColumnDef<TColData>[] = colsArr.map((col) => {
  if (col == "all") {
    return {
      accessorKey: col,
      header: ({ table }) => {
        return (
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={() => row.toggleSelected()}
              disabled={!row.getCanSelect()}
            />
          </div>
        );
      },
    };
  }
  if (col == "actions") {
    return {
      accessorKey: col,
      cell: ({ row, table }) => {
        return (
          <ActionDropdown>
            <DropdownMenuItem>
              <MdEdit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdFileCopy className="mr-2 h-4 w-4" /> Make a copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdFavorite className="mr-2 h-4 w-4" /> Favorite
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => table.options?.meta?.deleteRow?.(row.original.id)}>
              <MdDelete className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </ActionDropdown>
        );
      },
    };
  }
  const config: ColumnDef<TColData> = {
    accessorKey: col,
    header: ({ column }) => <DataTableColumnHeader column={column} title={col} />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue(col)}</div>,
    enableSorting: true,
  };
  if (col == "category") {
    config["filterFn"] = (row, id, value) => {
      return value.includes(row.getValue(id));
    };
  }
  return config;
});

