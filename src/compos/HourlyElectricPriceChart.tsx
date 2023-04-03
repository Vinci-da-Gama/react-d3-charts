import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { hourlyElectricPrice } from "../constants/BillAndPrice";

const HourlyElectricPriceChart = () => {
  const chartContainer = useRef(null);
  // ref!: SVGSVGElement;

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(hourlyElectricPrice.map((d) => d.hour))
      .padding(0.1);

    const y = d3.scaleLinear().range([height, 0]).domain([0, 100]);

    const svg = d3
      .select(chartContainer.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(hourlyElectricPrice)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.hour) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value));
  }, []);

  return <div ref={chartContainer}></div>;
};

export default HourlyElectricPriceChart;
