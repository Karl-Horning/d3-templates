// Chart dimensions and margins.
const width = 960;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

/**
 * Bins the unemployment data into 40 intervals.
 * @type {d3.Bin<object, number>[]}
 */
const bins = d3
    .bin()
    .thresholds(40)
    .value((d) => d.rate)(unemployment);

/**
 * Linear scale for the x-axis, spanning the full range of bin boundaries.
 * @type {d3.ScaleLinear<number, number>}
 */
const x = d3
    .scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([marginLeft, width - marginRight]);

/**
 * Linear scale for the y-axis, based on the count of items in each bin.
 * @type {d3.ScaleLinear<number, number>}
 */
const y = d3
    .scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range([height - marginBottom, marginTop]);

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

// Add a rect for each bin.
svg.append("g")
    .attr("fill", "steelblue")
    .selectAll()
    .data(bins)
    .join("rect")
    .attr("x", (d) => x(d.x0) + 1)
    .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
    .attr("y", (d) => y(d.length))
    .attr("height", (d) => y(0) - y(d.length));

// Add the x-axis and label.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
        d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
    )
    .call((g) =>
        g
            .append("text")
            .attr("x", width)
            .attr("y", marginBottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text("Unemployment rate (%) →")
    );

// Add the y-axis and label, and remove the domain line.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
        g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Frequency (no. of counties)")
    );

// Append the SVG node to the document body.
document.body.appendChild(svg.node());
