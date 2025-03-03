import  { useState, useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Line } from "@visx/shape";
import "./WaterfallChart.module.scss"; 
import React = require("react");

// Define types
interface DataPoint {
  label: string;
  value: number;
  cumulative: number;
}

interface WaterfallChartProps {
  series: { label: string; value: number }[];
  format?: "currency" | "decimal";
  theme?: "light" | "dark";
}

const WaterfallChart: React.FC<WaterfallChartProps> = ({
  series,
  format = "decimal",
  theme = "light",
}) => {
  const [data, setData] = useState(series);

  // Compute cumulative values
  const computedData: DataPoint[] = useMemo(() => {
    let cumulative = 0;
    return data.map((item) => {
      cumulative += item.value;
      return { ...item, cumulative };
    });
  }, [data]);

  // Scale setup
  const width = 500;
  const height = 300;
  const xMax = width - 100;
  const yMax = height - 50;
  const yScale = scaleLinear({
    domain: [0, Math.max(...computedData.map((d) => d.cumulative))],
    range: [yMax, 0],
  });

  // Handle Bar Click to Remove
  const handleBarClick = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className={`waterfall-chart ${theme}`}>
      <svg width={width} height={height}>
        <Group left={50} top={10}>
          {computedData.map((d, i) => {
            const barHeight = yMax - yScale(d.cumulative);
            return (
              <Group key={d.label}>
                <Bar
                  x={i * 60}
                  y={yScale(d.cumulative)}
                  width={50}
                  height={barHeight}
                  fill={d.value < 0 ? "red" : "green"}
                  onClick={() => handleBarClick(i)}
                />
                {i > 0 && (
                  <Line
                    from={{ x: (i - 1) * 60 + 50, y: yScale(computedData[i - 1].cumulative) }}
                    to={{ x: i * 60, y: yScale(d.cumulative) }}
                    stroke="black"
                    strokeWidth={2}
                  />
                )}
              </Group>
            );
          })}
          <AxisLeft scale={yScale} />
          <AxisBottom top={yMax} scale={scaleLinear({ domain: [0, data.length], range: [0, xMax] })} />
        </Group>
      </svg>
    </div>
  );
};

export default WaterfallChart;
