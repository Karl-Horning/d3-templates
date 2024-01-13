/**
 * Data representing age groups and their corresponding values.
 * @type {Array<{name: string, value: number}>}
 */
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

/**
 * Calculate the width of the chart based on the window's inner width.
 * @type {number}
 */
const width = window.innerWidth;

/**
 * Calculate the height of the chart, ensuring it does not exceed 500 pixels.
 * @type {number}
 */
const height = Math.min(width, 500);

/**
 * Calculate the radius of the pie chart.
 * @type {number}
 */
const radius = Math.min(width, height) / 2;

/**
 * Create an arc generator for the pie chart with an inner radius.
 * The inner radius determines the distance from the center to the inner edge of the arc.
 * In this case, it is set to 67% of the overall radius.
 * @type {function}
 */
const arc = d3
    .arc()
    .innerRadius(radius * 0.67) // Inner radius set to 67% of the overall radius.
    .outerRadius(radius - 1); // Outer radius set to the overall radius minus 1 pixel.

/**
 * Create a pie chart generator.
 * The pie chart generator is responsible for converting input data into an array of arc data,
 * representing the angles and proportions of the slices in the pie chart.
 * @type {function}
 */
const pie = d3
    .pie()
    .padAngle(1 / radius) // Add padding between pie slices, calculated as 1 divided by the radius.
    .sort(null) // Disable sorting of pie slices based on data values.
    .value((d) => d.value); // Define the value accessor function, extracting the 'value' property from the data.

/**
 * Create an ordinal scale for assigning colours to pie chart slices based on the 'name' property of the data.
 * Ordinal scales are used for discrete data, such as category names.
 * @type {function}
 */
const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name)) // Specify the unique domain values based on the 'name' property in the data.
    .range(
        d3
            .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length) // Interpolate colours along the 'Spectral' colour space with an adjusted range.
            .reverse()
    ); // Reverse the order of colours to ensure a visually appealing colour progression.

/**
 * Create an SVG element for the chart, setting width, height, viewBox, and style.
 * @type {SVGElement}
 */
const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

/**
 * Append a group element ('g') to the SVG for rendering pie chart paths.
 */
svg.append("g")
    // Select all existing path elements within the group (initially none).
    // Bind pie chart data to these elements.
    // This prepares the data for data-driven creation and updating of path elements.
    .selectAll()
    .data(pie(data)) // Use the pie generator to convert the data into an array of arc data.
    // Join the data to path elements and create new ones as needed.
    // For each data point, create a new path element and bind the data to it.
    .join("path")
    // Set the fill colour of each path based on the 'name' property of the data,
    // using the previously defined 'color' ordinal scale.
    .attr("fill", (d) => color(d.data.name))
    // Set the 'd' attribute of each path to define the shape of the arc.
    // The 'arc' generator is used to calculate the path data based on the pie chart data.
    .attr("d", arc)
    // Append a 'title' element to each path, displaying a tooltip when hovering over a pie slice.
    // The text content of the title is a combination of category name and value.
    .append("title")
    .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

/**
 * Append a group element ('g') to the SVG for rendering text labels.
 */
svg.append("g")
    // Set font family, size, and text anchor properties for the text labels.
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    // Select all existing text elements within the group (initially none).
    // Bind pie chart data to these elements.
    // This prepares the data for data-driven creation and updating of text elements.
    .selectAll()
    .data(pie(data)) // Use the pie generator to convert the data into an array of arc data.
    // Join the data to text elements and create new ones as needed.
    // For each data point, create a new text element and bind the data to it.
    .join("text")
    // Set the transformation attribute to position the text labels at the centroid of each pie slice.
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    // Call a function on each text element to append a 'tspan' element for multi-line labels.
    .call((text) =>
        // Append a 'tspan' element to each text element for the category name.
        text
            .append("tspan")
            .attr("y", "-0.4em") // Adjust the y-coordinate for proper vertical positioning.
            .attr("font-weight", "bold") // Apply bold font weight to the category name.
            .text((d) => d.data.name)
    )
    // Call a function on each text element to filter and append a 'tspan' for values in large slices.
    .call(
        (text) =>
            text
                // Filter out small slices and append a 'tspan' for displaying values.
                .filter((d) => d.endAngle - d.startAngle > 0.25)
                .append("tspan")
                .attr("x", 0) // Set x-coordinate to center the 'tspan'.
                .attr("y", "0.7em") // Adjust the y-coordinate for proper vertical positioning.
                .attr("fill-opacity", 0.7) // Set fill opacity for visibility.
                .text((d) => d.data.value.toLocaleString("en-US")) // Format and display the value.
    );

// Append the SVG node to the document body.
document.body.appendChild(svg.node());
