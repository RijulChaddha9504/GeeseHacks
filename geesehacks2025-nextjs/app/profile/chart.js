"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent  } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { useRef, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartConfig = {
    total: {
      label: "Performance rating",
      color: "hsl(var(--chart-1))",
    },
}

export default function Chart({pastTotalPerformances}) {

    const chartData = useRef([]);

    const populateChart = () => {
        for(let i = 0; i < pastTotalPerformances.length; ++i){
            if(chartData.current.length > pastTotalPerformances.length) return;
            chartData.current = [...chartData.current, {idx: i, total: pastTotalPerformances[i]}];
        }
    }

    populateChart();

    return (
        <ChartContainer config={chartConfig}>
                            <AreaChart
                                accessibilityLayer
                                data={chartData.current}
                                margin={{
                                left: 12,
                                right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="idx"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                // tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Area
                                dataKey="total"
                                type="natural"
                                fill="var(--color-total)"
                                fillOpacity={0.4}
                                stroke="var(--color-total)"
                                stackId="a"
                                />
                            </AreaChart>
                            </ChartContainer>
    )
}
