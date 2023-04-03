import { useEffect, useRef } from "react";
import * as d3 from "d3";
// import { tip } from "d3-tip";
import d3Tip from "d3-tip";

import { hourlyElectricPrice } from "../constants/BillAndPrice";

interface HourlyElectricPriceTipInterface {
  target: {
    __data__: { hour: string; value: number };
  };
}

const HourlyElectricPriceChart = () => {
  const chartContainer = useRef(null);
  // ref!: SVGSVGElement;

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(hourlyElectricPrice.map((d) => d.hour))
      .padding(0.3); // gap between each bar

    const y = d3.scaleLinear().range([height, 0]).domain([0, 100]);

    const svg = d3
      .select(chartContainer.current)
      .selectAll("svg")
      .remove() // remove previous chart, it will prevent render d3 bar chart twice; otherwise use method to render d3 chart.
      .exit()
      .data([null])
      .join("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // add tooltip
    const tooltip = d3Tip()
      .attr("class", "d3-tip")
      .html(
        (d: HourlyElectricPriceTipInterface) =>
          `<strong>Price:</strong> <span style='color:orange'>${d.target.__data__.value}</span>`
      );
    svg.call(tooltip);

    svg
      .selectAll(".bar")
      .data(hourlyElectricPrice)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.hour) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);
  }, []);

  return <div ref={chartContainer}></div>;
};

export default HourlyElectricPriceChart;
