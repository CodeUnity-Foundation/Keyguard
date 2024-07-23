"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@keyguard/ui";
import { BiCategoryAlt } from "react-icons/bi";
import { CiFolderOn } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import ComponentHeader from "../../../components/component-header";
import { PieChartComponent } from "../../../components/pie-chart";

export default function MainDashboard() {
  return (
    <div className="flex w-full flex-col">
      <p className="text-2xl font-bold"></p>
      <ComponentHeader headerText={"Hi, Welcome back 🙏"} />
      <div className="my-7 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Passwords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center justify-between">
              <p className="text-3xl font-bold">50</p>
              <RiLockPasswordLine className="text-orange text-3xl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Favorited Passwords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center justify-between">
              <p className="text-3xl font-bold">10</p>
              <MdFavoriteBorder className="text-orange text-3xl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Folders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center justify-between">
              <p className="text-3xl font-bold">8</p>
              <CiFolderOn className="text-orange text-3xl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center justify-between">
              <p className="text-3xl font-bold">18</p>
              <BiCategoryAlt className="text-orange text-3xl" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-7 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardDescription>Categories Distributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col items-center justify-between">
              <PieChartComponent />
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardDescription>Password Strength Distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col items-center justify-between">
              <PieChartComponent />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
