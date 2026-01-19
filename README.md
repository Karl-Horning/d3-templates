# D3 Templates

---

## Table of Contents

- [D3 Templates](#d3-templates)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Scripts / Usage](#scripts--usage)
  - [Project Structure](#project-structure)
  - [Demo](#demo)
  - [Known Issues](#known-issues)
  - [To Do](#to-do)
  - [FAQ](#faq)
  - [Licence](#licence)
  - [Author / Credits](#author--credits)

---

## Overview

A small collection of beginner-friendly D3.js chart templates, converted from TypeScript to JavaScript and annotated with JSDoc-style comments. Each example includes minimal HTML/JS files that you can open directly in your browser. Useful for learning or remixing.

---

## Installation

Clone the repository and explore locally:

```bash
git clone https://github.com/your-username/d3-templates.git
cd d3-templates
```

No build step is required — just open the `.html` files in your browser.

---

## Scripts / Usage

There are no scripts — each template is self-contained and runs in the browser. To view an example:

```bash
open templates/area-chart/area-chart.html
```

Or right-click the file and choose **Open in browser**.

---

## Project Structure

```text
templates/
├── area-chart/
│   ├── area-chart.html       # Chart HTML
│   ├── area-chart.js         # JS logic with D3
│   ├── data.js               # Optional dataset
│   ├── d3.v6.min.js          # D3 library (local)
│   └── README.md             # Per-chart notes
├── bar-chart/
│   └── ...
├── donut-chart/
│   └── ...
├── histogram/
│   └── ...
├── horizontal-bar-chart/
│   └── ...
├── line-chart/
│   └── ...
```

Each folder includes:

- A chart HTML page
- A JavaScript implementation with D3
- A local D3.js build for offline use

---

## Demo

Examples (open in browser):

- [Area Chart](./templates/area-chart/area-chart.html)
- [Bar Chart](./templates/bar-chart/bar-chart.html)
- [Donut Chart](./templates/donut-chart/donut-chart.html)
- [Histogram](./templates/histogram/histogram.html)
- [Horizontal Bar Chart](./templates/horizontal-bar-chart/horizontal-bar-chart.html)
- [Line Chart](./templates/line-chart/line-chart.html)

---

## Known Issues

- Some templates use hardcoded data or basic layouts.
- Layouts are unstyled beyond SVG defaults — this is intentional to focus on D3.
- The local `d3.v6.min.js` may be outdated; consider replacing with a CDN link if needed.

---

## To Do

- [x] Add per-chart READMEs
- [x] Convert templates from TypeScript to JavaScript
- [x] Add usage instructions to root README
- [ ] Create GitHub Pages site to host live versions of each template
- [ ] Embed preview iframes into the README or a demo page

---

## FAQ

**Q: Can I use these templates in my own project?**
A: Yes! These are intentionally minimal — feel free to adapt and reuse.

**Q: Why JavaScript instead of TypeScript?**
A: The templates were originally written in TypeScript but converted for approachability. They’re now pure JS with JSDoc comments.

**Q: Do I need to install anything to use these?**
A: Nope — just open the `.html` files in your browser. No build tools, no npm.

---

## Licence

MIT © 2025 Karl Horning

---

## Author / Credits

Originally adapted from Observable notebooks and other D3 learning materials. Converted to JavaScript and annotated by [Karl Horning](https://github.com/Karl-Horning)
