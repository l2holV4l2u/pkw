import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Define types for the props
interface UniversityScore {
  university: string;
  program: string;
  minScore: number;
  maxScore: number;
  userScore: number;
}

interface LollipopChartProps {
  universityScores: UniversityScore[];
}

export default function LollipopChart({
  universityScores,
}: LollipopChartProps) {
  const chartRef = useRef<SVGSVGElement>(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  const minscore = Math.min(
    ...universityScores.map((d) => Math.min(d.minScore, d.userScore))
  );

  const maxscore = Math.max(
    ...universityScores.map((d) => Math.max(d.maxScore, d.userScore))
  );

  const colors = ["#D94A4A", "#28a745", "orange"];
  const labels = ["Min Score", "Max Score", "User Score"];
  const margin = { top: 0, right: 80, bottom: 40, left: 120 };
  const { width, height } = chartDimensions;

  useEffect(() => {
    const chartContainer = chartRef.current?.parentElement;
    if (chartContainer) {
      setChartDimensions({
        width: chartContainer.clientWidth - margin.left - margin.right,
        height: 240 - margin.top - margin.bottom,
      });
    }
  }, []);

  useEffect(() => {
    if (!width || !height) return;

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
      .domain(universityScores.map((d) => d.university))
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

    // Y Axis
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "14px")
      .style("color", "gray");

    // Y Dotted Lines
    svg
      .selectAll(".dotted-line")
      .data(universityScores)
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
      .data(universityScores)
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
      .data(universityScores)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.minScore))
      .attr("cy", (d) => y(d.university)!)
      .attr("r", 6)
      .style("fill", colors[0]);

    // Max Circles
    svg
      .selectAll(".max-circle")
      .data(universityScores)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.maxScore))
      .attr("cy", (d) => y(d.university)!)
      .attr("r", 6)
      .style("fill", colors[1]);

    // User Score Dots
    svg
      .selectAll(".user-dot")
      .data(universityScores)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.userScore))
      .attr("cy", (d) => y(d.university)!)
      .attr("r", 7)
      .style("fill", colors[2])
      .style("stroke", "black")
      .style("stroke-width", 2);
  }, [universityScores, chartDimensions]);

  return (
    <div className="flex flex-col justify-center items-center">
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
  );
}
