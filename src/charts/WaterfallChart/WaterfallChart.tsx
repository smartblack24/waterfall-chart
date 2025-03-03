import React, { useMemo, useState } from 'react';
import { Bar } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { WaterfallChartProps, ColumnType, Format, Column } from './types';

type DataType = Column & { start: number, width: number };

const margin = { top: 20, left: 100, right: 20, bottom: 40 };
const width = 600;
const height = 400;

const WaterfallChart: React.FC<WaterfallChartProps> = ({ className, format, series }) => {
  const sum = series.reduce((acc, col) => col.value + acc, 0);
  const maxValue = Math.max(...series.map(c => Math.abs(c.value)), sum);

  const xScale = scaleLinear<number>({
    domain: [0, maxValue],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear<number>({
    domain: [0, series.length],
    range: [margin.top, height - margin.bottom],
  });

  const getWidth = (v: number) => {
    const val = Math.abs(v) * 6;
    console.log('val', v, val);
    return val;
  }

  const chartData = useMemo(() => {
    const data: DataType[] = [];
    let currentPos = 0;
    for (let i = 0; i < series.length; i ++) {
      if (i === 0) {
        data.push({ ...series[i], start: 0, width: getWidth(series[i].value) });
        currentPos = getWidth(series[i].value);
      } else {
        const width = getWidth(series[i].value);
        data.push({
          ...series[i],
          start: series[i].value >=0 ? currentPos : currentPos - width,
          width,
        });
        currentPos = (series[i].value >=0 ? currentPos + width : currentPos - width);
      }
    }
    data.push({
      type: ColumnType.End,
      start: 0,
      value: sum,
      width: getWidth(sum),
      label: 'end'
    });

    return data;
  }, [series]);

  // Handle bar click event to remove a column
  const handleBarClick = (index: number) => {
    const updatedData = chartData.filter((_, idx) => idx !== index);
    console.log(updatedData);
  };

  // Format values for display
  const formatValue = (value: number): string => {
    return format === Format.Currency ? `$${value.toFixed()}` : value.toFixed();
  };


  return (
    <div className={className}>
      <svg width={width + 200} height={height}>
        <Group>
          {/* Render Bars */}
          {chartData.map((column, index) => (
            <Bar
              key={index}
              x={margin.left + column.start}
              y={yScale(index)}
              width={column.width}
              height={30}
              fill={(column.type === ColumnType.Start || column.type === ColumnType.End) ? '#808080' : column.value >= 0 ? '#28a745' : '#dc3545'}
              onClick={() => handleBarClick(index)}
            />
          ))}
        </Group>

        {chartData.map((column, index) => (
          <text
            key={`text-${index}`}
            x={margin.left + column.start + column.width - 10 * (column.value.toString().length + 2 + (format === Format.Currency ? 1 : 0))}
            y={yScale(index) + 20}
            textAnchor="start"
            fill="white"
            fontSize={12}
          >
            {formatValue(column.value)}
          </text>
        ))}

        {/* <AxisBottom scale={xScale} top={height - margin.bottom} hideTicks hideZero /> */}
        <AxisLeft scale={yScale} left={margin.left} numTicks={chartData.length} tickFormat={(value, i) => value === 0 ? "start" : value === chartData.length - 1 ? "end" : (i - 1).toString()} />
      </svg>
    </div>
  );
};

export default WaterfallChart;
