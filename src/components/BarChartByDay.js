import React, { useRef, useEffect } from "react";
import { select, axisBottom, scaleLinear, axisLeft, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useHistory } from "react-router-dom";


function BarChartByDay({ data }) {

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef)
    const history = useHistory();
    const padding = 35

    const dayConvert = (num) => {
        let arr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return arr[num]
    }

    function handleClick(d, index) {
        let day = dayConvert(index)
        history.push(`/bar-day-detail/${day}`);
    }   

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;

        //scale
        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
        //   .domain(data.map((val, index) => index))
        .range([0, dimensions.width]) // change
        .padding(0.3);

        const yScale = scaleLinear()
            .domain([0, max(data)+50]) //todo
            .range([dimensions.height, 0]); // change

        const colorScale = scaleLinear()
            .domain([300, 400, max(data)])
            .range(["red", "orange", "green"])
            .clamp(true);

        //create x-axis
        const xAxis = axisBottom(xScale)
            .ticks(data.length).tickFormat((d, i) => dayConvert(i));

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
            (dimensions.height + padding) + ")")
            .text(d => d)

        //create y-axis
        const yAxis = axisLeft(yScale);
        svg
            .selectAll(".y-axis")
            .call(yAxis);

        svg
            .selectAll('.y-axis-label')
            .data(['Number of Customer'])
            .join(
                enter => enter.append("text").attr('class', 'y-axis-label')
            )
            .attr("fill", "Navy")//set the fill here
            .attr("transform", "rotate(-90)")
            .attr("y", -padding)
            .attr("x", 0 - (dimensions.height / 2) - 75)
            .text(d => d)

        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
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
            .style("transform", 'scale(1, -1)')
            .attr('x', (value, index) => xScale(index))
            .attr('y', -dimensions.height)
            .attr('width', xScale.bandwidth())
            .on("click", function(e, d) {
                const index = svg.selectAll(".bar").nodes().indexOf(this);
                handleClick(d, index);
            })            
            // .on("mouseenter", function (event, val) {
            //     const index = svg.selectAll(".bar").nodes().indexOf(this);
            //     svg
            //         .selectAll(".tooltip")
            //         .data([val])
            //         .join(enter => enter.append('text').attr('y', yScale(val) - 4))
            //         .attr('class', 'tooltip')
            //         .text(val)
            //         .attr('x', xScale(index) + xScale.bandwidth() / 2)
            //         .attr('text-anchor', 'middle')
            //         .transition()
            //         .attr('y', yScale(val) - 8)
            //         .attr("opacity", 1);
            // })
            // .on("mouseleave", () => svg.select(".tooltip").remove())
            .transition()
            .attr('fill', colorScale)
            .attr('height', val => dimensions.height - yScale(val))

        svg
            .selectAll(".content")
            .data(data)
            .join(enter => enter.append('text').attr('y', d => yScale(d) - 4))
            .attr('class', 'content')
            .text(d => d)
            .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr('text-anchor', 'middle')
            .transition()
            .attr('y', d => yScale(d) - 8)
            .attr("opacity", 1);
        

    }, [data, dimensions, history]);

    return (
        <div className="svgContainer" ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg> 
        </div>
    );
}

export default BarChartByDay