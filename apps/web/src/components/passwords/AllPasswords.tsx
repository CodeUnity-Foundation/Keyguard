"use client";

import { DataTable } from "@keyguard/ui";

import ComponentHeader from "../ComponentHeader";
import { columns } from "./coloums";
import tableData from "./data.json";

export default function AllPasswordComp() {
  return (
    <>
      <ComponentHeader headerText={"All Passwords"} />
      <DataTable data={tableData} columns={columns} />
    </>
  );
}
