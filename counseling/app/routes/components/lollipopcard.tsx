import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Card from "./card";
import { useDroppable } from "@dnd-kit/core";

// Define types for the props
interface UniversityScore {
  university: string;
  program: string;
  minScore: number;
  maxScore: number;
  userScore: number;
}

export default function LollipopCard({
  scores,
}: {
  scores: UniversityScore[];
}) {
  const colors = ["#D94A4A", "#28a745", "orange"];
  const labels = ["Min Score", "Max Score", "User Score"];
  const { setNodeRef } = useDroppable({
    id: "lollipop",
  });
  const svgRef = useRef<SVGSVGElement>(null); // Reference to the SVG element
  const [width, setWidth] = useState(600); // Default width
  const margin = { right: 12, left: 12 };
  const extendedMin = Math.max(
    0,
    Math.min(...scores.map((d) => d.minScore)) - 10
  );
  const extendedMax = Math.min(
    100,
    Math.max(...scores.map((d) => d.maxScore)) + 10
  );
  const xScale = (value: number) =>
    ((value - extendedMin) / (extendedMax - extendedMin)) *
      (width - margin.left - margin.right) +
    margin.left;
  const ticks = d3.scaleLinear().domain([extendedMin, extendedMax]).ticks(8);

  useEffect(() => {
    if (svgRef.current) {
      const svgWidth = svgRef.current.getBoundingClientRect().width;
      setWidth(svgWidth); // Update the width dynamically
    }
  }, [scores]);

  return (
    <Card className="p-6">
      <div
        ref={setNodeRef}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col w-full justify-center items-center space-y-8"
      >
        <div className="grid grid-cols-3 gap-8">
          {colors.map((color, index) => (
            <div className="flex items-center" key={index}>
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <div className="text-gray-600">{labels[index]}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full space-y-6">
          {scores.map((d, i) => (
            <div className="grid grid-cols-5 gap-2 text-sm items-center">
              <div className="text-gray-600 col-span-1 text-right">
                {d.university.split(" ")[0]}
              </div>
              <div className="col-span-3">
                <svg className="w-full h-[80px]" ref={svgRef}>
                  {/* Dotted Lines */}
                  <line
                    key={`dotted-line-${i}`}
                    x1={margin.left}
                    x2={width - margin.right}
                    y1={41}
                    y2={41}
                    stroke="gray"
                    strokeWidth={1}
                    strokeDasharray="4"
                  />
                  {/* Range Lines */}
                  <line
                    key={`line-${i}`}
                    x1={xScale(d.minScore)}
                    x2={xScale(d.maxScore)}
                    y1={41}
                    y2={41}
                    stroke="gray"
                    strokeWidth={2}
                  />
                  {/* Min Score Dots */}
                  <circle
                    key={`min-dot-${i}`}
                    cx={xScale(d.minScore)}
                    cy={41}
                    r={6}
                    fill={colors[0]} // Color for Min Score
                  />
                  {/* Max Score Dots */}
                  <circle
                    key={`max-dot-${i}`}
                    cx={xScale(d.maxScore)}
                    cy={41}
                    r={6}
                    fill={colors[1]} // Color for Max Score
                  />
                  {/* User Score Dots */}
                  <circle
                    key={`user-dot-${i}`}
                    cx={xScale(d.userScore)}
                    cy={41}
                    r={7}
                    fill={colors[2]} // Color for User Score
                    stroke="black"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="text-gray-600 col-span-1">{d.program}</div>
            </div>
          ))}
          {/* Scale Row */}
          <div className="grid grid-cols-5 gap-2 text-sm items-center">
            <div className="col-span-1"></div>
            <div className="col-span-3 relative">
              <svg className="w-full h-[40px]">
                {/* Horizontal Axis Line */}
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  y1={15}
                  y2={15}
                  stroke="black"
                  strokeWidth={1}
                />
                {ticks.map((tick, idx) => (
                  <g
                    key={`tick-${idx}`}
                    transform={`translate(${xScale(tick)}, 0)`}
                  >
                    {/* Tick Lines */}
                    <line y1={5} y2={15} stroke="gray" strokeWidth={1} />
                    {/* Tick Labels */}
                    <text y={35} textAnchor="middle" fontSize="14" fill="gray">
                      {tick}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
