import React, { useRef, useEffect } from "react";
import { select, line, max, curveCardinal, axisBottom, axisLeft, scaleLinear, scalePoint } from "d3";
import useResizeObserver from "./useResizeObserver";

function BarChart({ data, data2, data3 }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    console.log(dimensions, 'dimenstions')

    //scale
    const xScale = scaleLinear()
        .domain([0, Object.keys(data2[0]).length-1])
        .range([0, dimensions.width])
    const yScale = scaleLinear()
        .domain([0, max(Object.values(data2[0]))+50])
        .range([dimensions.height, 0]); 
    const xScale2 = scaleLinear()
        .domain([0, Object.keys(data2[0]).length-1])
        .range([0, dimensions.width])
    const yScale2 = scaleLinear()
        .domain([0, max(Object.values(data2[0]))+50])
        .range([dimensions.height, 0]); 
    const xScale3 = scaleLinear()
        .domain([0, Object.keys(data2[0]).length-1])
        .range([0, dimensions.width])
    const yScale3 = scaleLinear()
        .domain([0, max(Object.values(data2[0]))+50])
        .range([dimensions.height, 0]); 
    //create x-axis
    const xAxis = axisBottom(xScale)
        .ticks(Object.values(data[0]).length)
        .tickFormat((d, i) => ['breakfast', 'lunch', 'afternoon', 'dinner', 'evening', 'late_night'][i]);
    svg
        .select(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

    svg
        .selectAll('.x-axis-label')
        .data(['Day of Week'])
        .join(
            enter => enter.append("text").attr('class', 'x-axis-label')
        )
        .attr("fill", "Navy")//set the fill here
        .attr("transform",
        "translate(" + (dimensions.width/2-45) + " ," + 
        (dimensions.height + 35) + ")")
        .text(d => d)            

    //create y-axis
    const yAxis = axisLeft(yScale)
        .ticks(Object.values(data2[0]).length)
        // .tickFormat((d, i) => d); //need to update
    svg
        .selectAll(".y-axis")
        .call(yAxis);

    svg
        .selectAll('.y-axis-label')
        .data(['Second(TTS)'])
        .join(
            enter => enter.append("text").attr('class', 'y-axis-label')
        )
        .attr("fill", "Navy")//set the fill here
        .attr("transform", "rotate(-90)")
        .attr("y", -35)
        .attr("x", 0 - (dimensions.height / 2) - 48)
        .text(d => d)

    //myLine
    const myLine = line()
        .x((val, i) => xScale(i))
        .y((val) => yScale(val))
        .curve(curveCardinal)
    const myLine2 = line()
        .x((val, i) => xScale2(i))
        .y((val) => yScale2(val))
        .curve(curveCardinal)
    const myLine3 = line()
        .x((val, i) => xScale3(i))
        .y((val) => yScale3(val))
        .curve(curveCardinal)
    //path
    svg
        .selectAll(".line")
        .data([Object.values(data[0])])
        .join("path")
        .attr('class', 'line')
        .attr("d", (val) => myLine(val))
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", '2')
    svg
        .selectAll(".line2")
        .data([Object.values(data2[0])])
        .join("path")
        .attr('class', 'line2')
        .attr("d", (val) => myLine2(val))
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", '2')
        svg
        .selectAll(".line3")
        .data([Object.values(data3[0])])
        .join("path")
        .attr('class', 'line3')
        .attr("d", (val) => myLine3(val))
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", '2')        
    //circle
    svg
        .selectAll("circle")
        .data(Object.values(data[0]))
        .join("circle")
        .attr("cx", (val, i) => xScale(i))
        .attr("cy", (val) => yScale(val))
        .attr("r", (d) => 5)
        .attr('fill', 'red');
    svg
        .selectAll(".circle2")
        .data(Object.values(data2[0]))
        .join("circle")
        .attr('class', 'circle2')
        .attr("cx", (val, i) => xScale2(i))
        .attr("cy", (val) => yScale2(val))
        .attr("r", (d) => 5)
        .attr('fill', 'red');
        svg
        .selectAll(".circle3")
        .data(Object.values(data3[0]))
        .join("circle")
        .attr('class', 'circle3')
        .attr("cx", (val, i) => xScale3(i))
        .attr("cy", (val) => yScale3(val))
        .attr("r", (d) => 5)
        .attr('fill', 'red');
    //text
    svg
        .selectAll(".fast")
        .data(Object.values(data[0]))
        .join(enter => enter.append('text').attr('y', (val) => yScale(val)))
        .attr('class', 'fast')
        .text(d => d)
        .attr('x', (val, i) => xScale(i))
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', d => yScale(d) - 10)
        .attr("opacity", 1);
    svg
        .selectAll(".slow")
        .data(Object.values(data2[0]))
        .join(enter => enter.append('text').attr('y', (val) => yScale2(val)))
        .attr('class', 'slow')
        .text(d => d)
        .attr('x', (val, i) => xScale2(i))
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', d => yScale2(d) - 10)
        .attr("opacity", 1);
    svg
        .selectAll(".avg")
        .data(Object.values(data3[0]))
        .join(enter => enter.append('text').attr('y', (val) => yScale3(val)))
        .attr('class', 'avg')
        .text(d => parseInt(d))
        .attr('x', (val, i) => xScale3(i))
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', d => yScale3(d) - 10)
        .attr("opacity", 1);
        

  }, [data, data2, data3, dimensions]);

  return (
    <div
    className="svgContainer"
    ref={wrapperRef}
    style={{ marginBottom: "2rem" }}
    >
        <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    </div>
  );
}

export default BarChart;
