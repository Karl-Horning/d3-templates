# D3 templates

A collection of D3.js chart examples adapted from Observable. The Observable originals use TypeScript—these are plain JavaScript equivalents with JSDoc comments.

## Installation

```bash
git clone https://github.com/Karl-Horning/d3-templates.git
cd d3-templates
```

## Usage

Open any `.html` file in your browser:

```bash
open templates/area-chart/area-chart.html
```

## Templates

| Template | Description |
| --- | --- |
| [area-chart](./templates/area-chart/) | AAPL stock prices as a filled area |
| [bar-chart](./templates/bar-chart/) | English letter frequency |
| [donut-chart](./templates/donut-chart/) | Proportional data with coloured segments |
| [histogram](./templates/histogram/) | US unemployment rate distribution |
| [horizontal-bar-chart](./templates/horizontal-bar-chart/) | English letter frequency (horizontal) |
| [line-chart](./templates/line-chart/) | AAPL stock prices as a line |

## Known issues

- Some templates use hardcoded data.
- Layouts are intentionally unstyled—the focus is on the D3 implementation.
- The bundled `d3.v7.min.js` may be outdated; replace with a CDN link if needed.

## Licence

MIT © 2024 [Karl Horning](https://github.com/Karl-Horning/)
