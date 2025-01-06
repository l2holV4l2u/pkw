import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Card from "./card";
import { useDroppable, DragEndEvent, DndContext } from "@dnd-kit/core";

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
  const chartRef = useRef<SVGSVGElement>(null);
  const colors = ["#D94A4A", "#28a745", "orange"];
  const labels = ["Min Score", "Max Score", "User Score"];
  const margin = { top: 0, right: 100, bottom: 40, left: 100 };
  const { setNodeRef } = useDroppable({
    id: "lollipop",
  });
  var second = false;

  useEffect(() => {
    const chartContainer = chartRef.current?.parentElement;
    if (!chartContainer) return;

    // Dimensions
    const width = chartContainer.clientWidth - margin.left - margin.right;
    const height = scores.length * 80 - margin.top - margin.bottom;
    const minscore = Math.min(
      ...scores.map((d) => Math.min(d.minScore, d.userScore))
    );
    const maxscore = Math.max(
      ...scores.map((d) => Math.max(d.maxScore, d.userScore))
    );

    console.log(scores);

    // Clear previous SVG content
    d3.select(chartRef.current).selectAll("*").remove();

    console.log(second);
    console.log(chartRef.current);

    if (second) return;
    else if (chartRef.current) second = true;

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleLinear()
      .domain([Math.max(minscore - 20, 0), Math.min(maxscore + 20, 100)])
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(scores.map((d) => d.university))
      .range([0, height])
      .padding(1);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .style("color", "gray")
      .call(d3.axisBottom(x).ticks(10).tickSize(-5).tickPadding(10))
      .selectAll("text")
      .style("font-size", "14px");

    // Left Y Axis (Universities)
    const yAxisLeft = svg.append("g").call(d3.axisLeft(y));
    yAxisLeft
      .selectAll("text")
      .style("font-size", "14px")
      .style("color", "gray");

    // Right Y Axis (Programs)
    const yAxisRight = svg
      .append("g")
      .attr("transform", `translate(${width}, 0)`)
      .call(d3.axisRight(y).tickFormat((_, i) => scores[i].program));
    yAxisRight
      .selectAll("text")
      .style("font-size", "14px")
      .style("color", "gray");

    // Dotted Lines
    svg
      .selectAll(".dotted-line")
      .data(scores)
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => y(d.university)!)
      .attr("y2", (d) => y(d.university)!)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4");

    // Lines
    svg
      .selectAll(".line")
      .data(scores)
      .enter()
      .append("line")
      .attr("x1", (d) => x(d.minScore))
      .attr("x2", (d) => x(d.maxScore))
      .attr("y1", (d) => y(d.university)!)
      .attr("y2", (d) => y(d.university)!)
      .attr("stroke", "gray")
      .attr("stroke-width", 2);

    // Min Circles
    svg
      .selectAll(".min-circle")
      .data(scores)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.minScore))
      .attr("cy", (d) => y(d.university)!)
      .attr("r", 6)
      .style("fill", colors[0]);

    // Max Circles
    svg
      .selectAll(".max-circle")
      .data(scores)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.maxScore))
      .attr("cy", (d) => y(d.university)!)
      .attr("r", 6)
      .style("fill", colors[1]);

    // User Score Dots
    svg
      .selectAll(".user-dot")
      .data(scores)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.userScore))
      .attr("cy", (d) => y(d.university)!)
      .attr("r", 7)
      .style("fill", colors[2])
      .style("stroke", "black")
      .style("stroke-width", 2);
  }, [scores]);

  return (
    <Card className="p-6">
      <div
        ref={setNodeRef}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col justify-center items-center"
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
        <svg ref={chartRef} />
      </div>
    </Card>
  );
}
