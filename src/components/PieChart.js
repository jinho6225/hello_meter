import { arc, pie, select, scaleSequential, interpolateWarm, centroid } from "d3";
import React, { useEffect, useRef, useState } from "react";
import useResizeObserver from "./useResizeObserver";



function PieChart({ data, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    const reducer = (acc, cur) => acc + cur.value;
    const totalSum = data.reduce(reducer, 0)
    // arc takes instructions (objects with special properties, like startAngle, endAngle, etc.)
    // and transforms them into "d" attributes for path elements
    const arcGenerator = arc()
    .innerRadius(10)
    .outerRadius(180);

    // pie will transform data to instructions for arcGenerator
    const pieGenerator = pie()
    .padAngle(0)
    .value(d => d.value)
    // .sort(null); // makes sure data doesn't get sorted
    // now transform data to instructions for arc() 
    const instructions = pieGenerator(data)


    svg
        .selectAll(".slice")
        .data(instructions)
        .join("path")
        .attr("class", 'slice')
        .attr("stroke", 'white')
        .attr("fill", (d, i) => colors[d.data.name])
        .style('transform', `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`)
        .attr('d', arcGenerator)
        .transition()


        // .attr("stroke", 'white')
        // .attr("stroke-width", '2px')
        // .attr("fill", (d, i) => colors[d.data.name])
        // .style('transform', `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`)
        // .attr('d', arcGenerator)
        // .transition()

    svg
        .selectAll(".labels")
        .data(instructions)
        .join("text")
        .attr("class", "labels")
        .text((d, i) => {
          let num = d.data.value ? d.data.value : 0
          let percentage = (num * 100) / totalSum
          return num ? (percentage).toFixed(2) + '%' : null
        })
        .attr('fill','white')
        .attr('x', (d, i) => {
          return arcGenerator.centroid(d)[0] + (dimensions.width/2)-25
        })
        .attr('y', (d, i) => {
          return arcGenerator.centroid(d)[1] + (dimensions.height/2)
        })
        .transition()


  }, [data, dimensions]);

  return (
    <div className="svgContainer" ref={wrapperRef} style={{ padding: '0' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default PieChart;