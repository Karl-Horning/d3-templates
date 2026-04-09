/**
 * @typedef {Object} AgeGroup
 * @property {string} name - The age group label.
 * @property {number} value - The population count.
 */

/** @type {AgeGroup[]} */
const data = [
    { name: "<5", value: 19912018 },
    { name: "5-9", value: 20501982 },
    { name: "10-14", value: 20679786 },
    { name: "15-19", value: 21354481 },
    { name: "20-24", value: 22604232 },
    { name: "25-29", value: 21698010 },
    { name: "30-34", value: 21183639 },
    { name: "35-39", value: 19855782 },
    { name: "40-44", value: 20796128 },
    { name: "45-49", value: 21370368 },
    { name: "50-54", value: 22525490 },
    { name: "55-59", value: 21001947 },
    { name: "60-64", value: 18415681 },
    { name: "65-69", value: 14547446 },
    { name: "70-74", value: 10587721 },
    { name: "75-79", value: 7730129 },
    { name: "80-84", value: 5811429 },
    { name: "≥85", value: 5938752 },
];

// Chart dimensions derived from the viewport.
const width = window.innerWidth;
const height = Math.min(width, 500);
const radius = Math.min(width, height) / 2;

/**
 * Arc generator with an inner radius of 67% to create the donut shape.
 * @type {d3.Arc<any, d3.DefaultArcObject>}
 */
const arc = d3
    .arc()
    .innerRadius(radius * 0.67)
    .outerRadius(radius - 1);

/**
 * Pie layout generator—converts data values into arc angle descriptors.
 * @type {d3.Pie<any, AgeGroup>}
 */
const pie = d3
    .pie()
    .padAngle(1 / radius)
    .sort(null)
    .value((d) => d.value);

/**
 * Ordinal colour scale mapping age group names to spectral colours.
 * @type {d3.ScaleOrdinal<string, string>}
 */
const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(
        d3
            .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
            .reverse()
    );

/**
 * SVG container.
 * @type {d3.Selection<SVGSVGElement, undefined, null, undefined>}
 */
const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Append arc paths, one per data entry.
svg.append("g")
    .selectAll()
    .data(pie(data))
    .join("path")
    .attr("fill", (d) => color(d.data.name))
    .attr("d", arc)
    .append("title")
    .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

// Append text labels at the centroid of each arc.
svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll()
    .data(pie(data))
    .join("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .call((text) =>
        text
            .append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text((d) => d.data.name)
    )
    .call((text) =>
        text
            .filter((d) => d.endAngle - d.startAngle > 0.25)
            .append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text((d) => d.data.value.toLocaleString("en-US"))
    );

// Append the SVG node to the document body.
document.body.appendChild(svg.node());
