/**
 * Dataset representing the frequency of letters in the alphabet.
 *
 * @typedef {Object} AlphabetEntry
 * @property {string} letter - The letter.
 * @property {number} frequency - The frequency of the letter.
 */
const alphabet = [
    { letter: "A", frequency: 0.08167 },
    { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 },
    { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 },
    { letter: "F", frequency: 0.02288 },
    { letter: "G", frequency: 0.02015 },
    { letter: "H", frequency: 0.06094 },
    { letter: "I", frequency: 0.06966 },
    { letter: "J", frequency: 0.00153 },
    { letter: "K", frequency: 0.00772 },
    { letter: "L", frequency: 0.04025 },
    { letter: "M", frequency: 0.02406 },
    { letter: "N", frequency: 0.06749 },
    { letter: "O", frequency: 0.07507 },
    { letter: "P", frequency: 0.01929 },
    { letter: "Q", frequency: 0.00095 },
    { letter: "R", frequency: 0.05987 },
    { letter: "S", frequency: 0.06327 },
    { letter: "T", frequency: 0.09056 },
    { letter: "U", frequency: 0.02758 },
    { letter: "V", frequency: 0.00978 },
    { letter: "W", frequency: 0.0236 },
    { letter: "X", frequency: 0.0015 },
    { letter: "Y", frequency: 0.01974 },
    { letter: "Z", frequency: 0.00074 },
];

const barHeight = 25;
const marginTop = 30;
const marginRight = 0;
const marginBottom = 10;
const marginLeft = 30;
const width = 928;
const height =
    Math.ceil((alphabet.length + 0.1) * barHeight) + marginTop + marginBottom;

/**
 * X-scale for positioning bars along the horizontal axis.
 * @type {d3.ScaleLinear<number, number>}
 */
const x = d3
    .scaleLinear()
    .domain([0, d3.max(alphabet, (d) => d.frequency)])
    .range([marginLeft, width - marginRight]);

/**
 * Y-scale for positioning bars along the vertical axis.
 * @type {d3.ScaleBand<string>}
 */
const y = d3
    .scaleBand()
    .domain(d3.sort(alphabet, (d) => -d.frequency).map((d) => d.letter))
    .rangeRound([marginTop, height - marginBottom])
    .padding(0.1);

/**
 * Format function for displaying percentages.
 * @type {(value: number) => string}
 */
const format = x.tickFormat(20, "%");

/**
 * SVG container for the chart.
 * @type {d3.Selection<SVGSVGElement, unknown, HTMLElement, any>}
 */
const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

// Append bars to the SVG.
svg.append("g")
    .attr("fill", "steelblue") // Changes the colour of the bars.
    .selectAll()
    .data(alphabet)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.letter))
    .attr("width", (d) => x(d.frequency) - x(0))
    .attr("height", y.bandwidth());

// Append labels to the SVG.
svg.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .selectAll()
    .data(alphabet)
    .join("text")
    .attr("x", (d) => x(d.frequency))
    .attr("y", (d) => y(d.letter) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text((d) => format(d.frequency))
    .call((text) =>
        text
            .filter((d) => x(d.frequency) - x(0) < 20) // short bars
            .attr("dx", +4)
            .attr("fill", "black")
            .attr("text-anchor", "start")
    );

// Append top axis to the SVG.
svg.append("g")
    .attr("transform", `translate(0,${marginTop})`)
    .call(d3.axisTop(x).ticks(width / 80, "%"))
    .call((g) => g.select(".domain").remove());

// Append left axis to the SVG.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0));

// Append the SVG to the document body.
document.body.appendChild(svg.node());
