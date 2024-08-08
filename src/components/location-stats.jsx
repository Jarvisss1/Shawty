import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function LocationStats({ stats }) {
  // Aggregate clicks by city
  const cityClicks = stats.reduce((acc, { city }) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  // Convert aggregated data into the required format
  const chartData = Object.keys(cityClicks).map((city) => ({
    city,
    clicks: cityClicks[city],
  }));

  // Sort the data by clicks in descending order and get the top 5
  const topCities = chartData.sort((a, b) => b.clicks - a.clicks).slice(0, 5);

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Cities by Clicks</CardTitle>
        <CardDescription>
          Displaying the top 5 cities with the highest number of clicks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[300px]"
          
        >
          <ResponsiveContainer>
            <LineChart
              data={topCities}
              margin={{
                top: 10,
                left: 8,
                right: 8,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="city"
                tickLine={false}
                axisLine={false}
                tickMargin={6}
              />
              <YAxis />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey="clicks"
                type="monotone"
                stroke="var(--color-clicks)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default LocationStats;
