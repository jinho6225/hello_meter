import React, { useEffect, useRef } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from "d3";
import useResizeObserver from "./useResizeObserver";
import { useHistory } from "react-router-dom";

/**
 * Component that renders a StackedBarChart
 */

function StackedBarChartByDate({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const history = useHistory();

  function handleClick(d) {
    console.log(d)
    console.log(d.data.date)

    history.push(`/stack-date-detail/${d.data.date}`);
  }  
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    //stacks / layers
    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extend = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])) + 30,
    ];

    //scales
    const xScale = scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.3)

    const yScale = scaleLinear().domain(extend).range([height, 0]);

    //rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr('fill', layer => {
          return colors[layer.key]
      })
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .on("mouseenter", function(e, d) {
        select(this)
        .attr("opacity", 0.3)
        .transition()
      })
      .on("mouseleave", function(e, d) {
          select(this)
          .attr("opacity", 1)
          .transition()
      })
      .attr('x', sequence => {
          return xScale(sequence.data.date)
      })
      .attr('width', xScale.bandwidth())
      .attr('y', sequence => yScale(sequence[1]))
      .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]))
      .on("click", function(e, d) {
        handleClick(d);
      })


    //axes
    const xAxis = axisBottom(xScale);
    svg
      .selectAll(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.selectAll(".y-axis").call(yAxis);

  }, [colors, data, dimensions, keys]);

  return (
    <>
    <div className="svgContainer" ref={wrapperRef} style={{marginBottom: "2rem"}}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
}

export default StackedBarChartByDate;