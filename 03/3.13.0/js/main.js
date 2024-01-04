/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

// Define SVG canvas
const svg = d3.select('#chart-area').append('svg')
  .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

// Add group element where graphics will live
const g = svg.append('g')
  .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// x-label
g.append('text')
  .attr('class', 'x axis-label')
  .attr('x', WIDTH / 2)
  .attr('y', HEIGHT + 50)
  .text('Revenue/Profit by Month')
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')

// y-label
g.append('text')
  .attr('class', 'y axis-label')
  .attr('transform', 'rotate(-90)')
  .attr('x', - (HEIGHT / 2))
  .attr('y', -70)
  .text('Revenue (Dark) and Profit (Light)')
  .attr('font-size', '15px')
  .attr('text-anchor', 'middle')

// Load data
d3.csv('data/revenues.csv').then(data => {

  // Fix dtypes
  data.forEach(d => {
    d.revenue = Number(d.revenue)
    d.profit = Number(d.profit)
  })
  console.log('data:', data)
  
  // Instantiate bars for bar chart - one set for revenue, another for profit
  const rects_rev = g.selectAll('rect')
    .data(data)
  
  const rects_prof = g.selectAll('rect')
    .data(data)

  // Axis bounds
  const x = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, WIDTH])
    .paddingInner(0.2)
    .paddingOuter(0.2)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.revenue)])
    .range([HEIGHT, 0])

  // Axes
  const xAxisCall = d3.axisBottom(x)
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT})`)
    .call(xAxisCall)

  const yAxisCall = d3.axisLeft(y)
    .ticks(6)
    .tickFormat(d => '$' + d)
  g.append('g')
    .attr('class', 'y axis')
    .call(yAxisCall)

  // Add bars
  rects_rev.enter().append('rect')
    .attr('y', d => y(d.revenue))
    .attr('x', d => x(d.month))
    .attr('width', x.bandwidth())
    .attr('height', d => HEIGHT - y(d.revenue))
    .attr('fill', 'green')
  
  rects_prof.enter().append('rect')
    .attr('y', d => y(d.profit))
    .attr('x', d => x(d.month))
    .attr('width', x.bandwidth())
    .attr('height', d => HEIGHT - y(d.profit))
    .attr('fill', '#4daf4a')

})
