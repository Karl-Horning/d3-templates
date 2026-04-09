// Chart dimensions and margins.
const width = 928;
const height = 500;
const marginTop = 20;
const marginRight = 30;
const marginBottom = 30;
const marginLeft = 40;

/**
 * Parses ISO date strings into JavaScript Date objects.
 * @type {function(string): Date|null}
 */
const parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
aapl.forEach((d) => {
    d.date = parseDate(d.date);
});

/**
 * Time scale for the x-axis.
 * @type {d3.ScaleTime<number, number>}
 */
const x = d3.scaleUtc(
    d3.extent(aapl, (d) => d.date),
    [marginLeft, width - marginRight]
);

/**
 * Linear scale for the y-axis.
 * @type {d3.ScaleLinear<number, number>}
 */
const y = d3
    .scaleLinear()
    .domain([0, d3.max(aapl, (d) => d.close)])
    .range([height - marginBottom, marginTop]);

/**
 * Area path generator.
 * @type {d3.Area<object>}
 */
const area = d3
    .area()
    .x((d) => x(d.date))
    .y0(y(0))
    .y1((d) => y(d.close));

/**
 * SVG container.
 * @type {d3.Selection<SVGSVGElement, undefined, null, undefined>}
 */
const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Append a path for the area (under the axes).
svg.append("path").attr("fill", "steelblue").attr("d", area(aapl));

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
        d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
    );

// Add the y-axis, remove the domain line, add grid lines and a label.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
        g
            .selectAll(".tick line")
            .clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
        g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Daily close ($)")
    );

// Append the SVG node to the document body.
document.body.appendChild(svg.node());
