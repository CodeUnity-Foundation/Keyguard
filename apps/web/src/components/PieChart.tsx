"use client";

import { CardContent, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@keyguard/ui";
import * as React from "react";
import { Pie, PieChart } from "recharts";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "rgb(255, 99, 132)" },
  { browser: "safari", visitors: 200, fill: "rgb(54, 162, 235)" },
  { browser: "firefox", visitors: 187, fill: "rgb(255, 205, 86)" },
  { browser: "edge", visitors: 173, fill: "rgb(140, 100, 86)" },
  { browser: "other", visitors: 90, fill: "rgb(200, 205, 86)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  return (
    <div className="flex w-full flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[280px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />
            <Pie data={chartData} dataKey="visitors" labelLine={false} nameKey="browser" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
