import React, { useRef, useEffect } from "react";
import { select, axisBottom, scaleLinear, axisLeft, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function BarChart({ data }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {        
        const svg = select(svgRef.current);
        if (!dimensions) return;

        //scale
        const xScale = scaleBand()
            .domain(Object.keys(data[0]).map((value, index) => index))
        //   .domain(data.map((val, index) => index))
        .range([0, dimensions.width]) // change
        .padding(0.3);

        const yScale = scaleLinear()
            .domain([0, max(Object.values(data[0]))+50]) //todo
            .range([dimensions.height, 0]); // change

        const colorScale = scaleLinear()
            .domain([350, 400, max(Object.values(data[0]))])
            .range(["red", "orange", "green"])
            .clamp(true);

        //create x-axis
        const xAxis = axisBottom(xScale)
            .ticks(Object.keys(data[0]).length)
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
        const yAxis = axisLeft(yScale);
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

        svg
            .selectAll(".bar")
            .data(Object.values(data[0]))
            .join("rect")
            .attr("class", "bar")
            .style("transform", 'scale(1, -1)')
            .attr('x', (value, index) => xScale(index))
            .attr('y', -dimensions.height)
            .attr('width', xScale.bandwidth())
            .transition()
            .attr('fill', colorScale)
            .attr('height', val => dimensions.height - yScale(val))

        svg
            .selectAll(".content")
            .data(Object.values(data[0]))
            .join(enter => enter.append('text').attr('y', d => yScale(d) - 4))
            .style("color", 'navy')
            .attr('class', 'content')
            .text(d => d.toFixed(2) + 'sec')
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('text-anchor', 'middle')
            .transition()
            .attr('y', d => yScale(d) - 8)
            .attr("opacity", 1);
        

    }, [data, dimensions]);

    return (
        <div className="svgContainer" ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg> 
        </div>
    );
}

export default BarChart