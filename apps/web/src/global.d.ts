import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    deleteRow?: (rowId) => void;
    deleteSelectedRows?: () => void;
  }
}

