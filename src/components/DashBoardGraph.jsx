import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

function DashBoardGraph({ todo, inProgress, completed }) {
    const data = [
        { name: "Todo", value: todo },
        { name: "In Progress", value: inProgress },
        { name: "Completed", value: completed },
    ];
    const chartConfig = {
        todo: {
            label: "Todo",
            color: "#3b82f6",
        },
        inProgress: {
            label: "In Progress",
            color: "#f59e0b",
        },
        completed: {
            label: "Completed",
            color: "#22c55e",
        },
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border mt-6 w-xl">
            <h3 className="text-lg font-semibold mb-4">Task Overview</h3>

            <ChartContainer config={chartConfig} className="h-80 w-full">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />

                    <ChartTooltip content={<ChartTooltipContent />} />

                    <Bar
                        dataKey="value"
                        fill="#6366f1"
                        radius={[0, 8, 8, 0]}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}

export default DashBoardGraph;