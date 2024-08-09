import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function DeviceStats({ statsData }) {
  // Aggregate device counts
  const deviceCounts = statsData.reduce((acc, { device }) => {
    acc[device.toLowerCase()] = (acc[device.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  // Convert aggregated data into the format required for the pie chart
  const chartData = Object.keys(deviceCounts).map((device) => ({
    device,
    count: deviceCounts[device],
    fill:
      device === "desktop"
        ? "var(--color-desktop)"
        : device === "mobile"
        ? "var(--color-mobile)"
        : "var(--color-other)", // default color for other device types
  }));

  const chartConfig = {
    count: {
      label: "Count",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-2))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-1))",
    },
    // Add more configurations as needed
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Device Stats Pie Chart</CardTitle>
        <CardDescription>Showing device usage counts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-video max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {`${
                      chartConfig[payload.device]?.label || payload.device
                    } (${payload.count})`}
                  </text>
                );
              }}
              nameKey="device"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default DeviceStats;
