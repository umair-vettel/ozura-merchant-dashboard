"use client";

import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

export default function CurrencyPieChart({ data, totalRevenue }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );
  const prepData = Object.entries(data).map(([name, value]) => {
    return {
      name,
      value,
    };
  });
  const backgroundColors = ["#61D5F5", "#6DDBA4", "#FDE68A"];
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          fontWeight={"bold"}
          color="#fff"
          x={cx}
          y={cy}
          dy={13}
          textAnchor="middle"
          fill={"#fff"}
          font-size="1.8em"
          font-weight="800"
        >
          ${parseFloat((totalRevenue / 10 ** 6).toString())}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#6DDBA4"}
        />
        {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={"red"}
      /> */}
        {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      /> */}
        {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
        {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{` ${value}`}</text> */}
        {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100)?.toFixed(2)}%)`}
      </text> */}
      </g>
    );
  };
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" aspect={1.1}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={prepData}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="60%"
            fill="#61D5F5"
            dataKey="value"
            // onMouseEnter={onPieEnter}
          >
            {prepData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={backgroundColors[index % backgroundColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-row flex-wrap justify-center gap-3 absolute w-full bottom-[25px] left-0">
        {prepData.map((item: any, index: any) => (
          <div
            key={index}
            className="legend text-xs flex flex-row gap-1 items-center"
          >
            <span
              className="bg-[#61D5F5] w-[7px] h-[7px] rounded-[50%] inline-block"
              style={{
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
              }}
            ></span>
            {item.name} ({item?.value?.toFixed(2)}%)
          </div>
        ))}
      </div>
    </div>
  );
}
