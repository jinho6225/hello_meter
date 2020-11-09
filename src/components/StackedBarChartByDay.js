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

/**
 * Component that renders a StackedBarChart
 */

function StackedBarChartByDay({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

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
      max(layers, (layer) => max(layer, (sequence) => sequence[1])) + 50,
    ];

    //scales
    const xScale = scaleBand()
      .domain(data.map((d) => d.convertedDay))
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
      .attr('x', sequence => {
          return xScale(sequence.data.convertedDay)
      })
      .attr('width', xScale.bandwidth())
      .attr('y', sequence => yScale(sequence[1]))
      .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]))


    //axes
    const xAxis = axisBottom(xScale);
    svg
      .selectAll(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.selectAll(".y-axis").call(yAxis);

    svg
      .selectAll('.y-axis-label')
      .data(['Number of Customer'])
      .join(
          enter => enter.append("text")
          .attr('class', 'y-axis-label')
      )
      .attr("fill", "Navy")//set the fill here
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("x", 0 - (dimensions && dimensions.height / 2) - 75)
      .text(d => d)

    
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

export default StackedBarChartByDay;