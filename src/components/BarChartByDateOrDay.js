import React, { useRef, useEffect } from "react";
import { select, axisBottom, scaleLinear, axisLeft, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useHistory } from "react-router-dom";


function BarChartByDateOrDay({ data, opt=false }) {

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
        if (opt) {
            let day = dayConvert(index)
            history.push(`/bar-day-detail/${day}`);
        } else {
            history.push(`/bar-date-detail/${index}`);
        }
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

        let colorTheme = opt ? [300, 400, max(data)] : [75, 100, max(data)]
        const colorScale = 
            opt ? 
            scaleLinear()
            .domain(colorTheme)
            .range(["red", "orange", "green"])
            .clamp(true)
            :
            scaleLinear()
            .domain(colorTheme)
            .range(["red", "orange", "green"])
            .clamp(true);

        //create x-axis
        const xAxis = 
            opt ?
            axisBottom(xScale)
            .ticks(data.length).tickFormat((d, i) => dayConvert(i))
            :
            axisBottom(xScale)
            .ticks(data.length).tickFormat((d, i) => i+3)


        svg
            .select(".x-axis")
            .style("transform", `translateY(${dimensions.height}px)`)
            .call(xAxis);

        let xAxisLabel = opt ? 'Day of Week' : 'Date'
        let xPosition = opt ? dimensions.width/2-45 : dimensions.width/2-17

        svg
            .selectAll('.x-axis-label')
            .data([xAxisLabel])
            .join(
                enter => enter.append("text").attr('class', 'x-axis-label')
            )
            .attr("fill", "Navy")//set the fill here
            .attr("transform",
            "translate(" + (xPosition) + " ," + 
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
                let idx = opt ? index : index + 3; 
                handleClick(d, idx);
            })            
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

export default BarChartByDateOrDay