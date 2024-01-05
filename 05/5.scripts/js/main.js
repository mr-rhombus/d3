// // BAR CHART

// const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
// const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
// const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

// let flag = true  // true for profit, false for revenue

// const svg = d3.select("#chart-area").append("svg")
//   .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
//   .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

// const g = svg.append("g")
//   .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// // X label
// g.append("text")
//   .attr("class", "x axis-label")
//   .attr("x", WIDTH / 2)
//   .attr("y", HEIGHT + 60)
//   .attr("font-size", "20px")
//   .attr("text-anchor", "middle")
//   .text("Month")

// // Y label
// const yLabel = g.append("text")
//   .attr("class", "y axis-label")
//   .attr("x", - (HEIGHT / 2))
//   .attr("y", -60)
//   .attr("font-size", "20px")
//   .attr("text-anchor", "middle")
//   .attr("transform", "rotate(-90)")
//   .text("Revenue ($)")

// // Set axis scales
// const x = d3.scaleBand()
//   .range([0, WIDTH])
//   .paddingInner(0.3)
//   .paddingOuter(0.2)

// const y = d3.scaleLinear()
//   .range([HEIGHT, 0])

// const xAxisGroup = g.append("g")
//   .attr("class", "x axis")
//   .attr("transform", `translate(0, ${HEIGHT})`)

// const yAxisGroup = g.append("g")
//   .attr("class", "y axis")

// d3.csv("data/revenues.csv").then(data => {
//   data.forEach(d => {
//     d.revenue = Number(d.revenue)
//     d.profit = Number(d.profit)
//   })
//   console.log(data)

//   // Add an interval
//   d3.interval(() => {
//     flag = !flag  // swap value of flag
//     const newData = flag ? data : data.slice(1)
//     update(newData)
//   }, 1000)

//   update(data)
// })

// function update(data) {
//   const value = flag ? 'profit' : 'revenue'
//   const t = d3.transition().duration(750)  // keep transition shorter than value of loop delay

//   x.domain(data.map(d => d.month))
//   y.domain([0, d3.max(data, d => d[value])])

//   const xAxisCall = d3.axisBottom(x)
//   xAxisGroup
//     .transition(t)
//     .call(xAxisCall)
//     .selectAll("text")
//       .attr("y", "10")
//       .attr("x", "-5")
//       .attr("text-anchor", "end")
//       .attr("transform", "rotate(-40)")

//   const yAxisCall = d3.axisLeft(y)
//     .ticks(3)
//     .tickFormat(d => d + "m")
//   yAxisGroup
//     .transition(t)
//     .call(yAxisCall)

//   // JOIN new data with old elements
//   const rects = g.selectAll("rect")
//     .data(data, d => d.month)  // ensure data is tracked based on month

//   // console.log(rects)
//     // _enter: all elements in data array that don't exist on screen yet
//     // _exit: all elements on screen that don't exist in data array
//     // _groups: all elements that exist on the screen

//   // EXIT old elements not present in new data
//   rects.exit()
//     .attr('fill', 'red')  // pre-transition
//     .transition(t)
//       .attr('height', 0)  // post-transition
//       .attr('y', y(0))
//       .remove()
  
//   // ENTER new elements present in new data
//   rects.enter().append("rect")
//     // applied ONLY to ENTER
//     .attr("fill", "grey")
//     .attr('y', y(0))  // initially hidden
//     .attr('height', 0)  // initially hidden
//     // AND UPDATE old elements present in new data
//     .merge(rects)
//     .transition(t)
//       .attr("x", (d) => x(d.month))
//       .attr("width", x.bandwidth)
//       // fly up from bottom of chart
//       .attr('y', d => y(d[value]))
//       .attr("height", d => HEIGHT - y(d[value]))

//   const text = flag ? 'Profit ($)' : 'Revenue ($)'
//   yLabel.text(text)
// }


// SCATTER PLOT
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

let flag = true  // true for profit, false for revenue

const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month")

// Y label
const yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue ($)")

// Set axis scales
const x = d3.scaleBand()
  .range([0, WIDTH])
  .paddingInner(0.3)
  .paddingOuter(0.2)

const y = d3.scaleLinear()
  .range([HEIGHT, 0])

const xAxisGroup = g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)

const yAxisGroup = g.append("g")
  .attr("class", "y axis")

d3.csv("data/revenues.csv").then(data => {
  data.forEach(d => {
    d.revenue = Number(d.revenue)
    d.profit = Number(d.profit)
  })
  console.log(data)

  // Add an interval
  d3.interval(() => {
    flag = !flag  // swap value of flag
    const newData = flag ? data : data.slice(1)
    update(newData)
  }, 1000)

  update(data)
})

function update(data) {
  const value = flag ? 'profit' : 'revenue'
  const t = d3.transition().duration(750)  // keep transition shorter than value of loop delay

  x.domain(data.map(d => d.month))
  y.domain([0, d3.max(data, d => d[value])])

  const xAxisCall = d3.axisBottom(x)
  xAxisGroup
    .transition(t)
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")

  const yAxisCall = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + "m")
  yAxisGroup
    .transition(t)
    .call(yAxisCall)

  // JOIN new data with old elements
  const rects = g.selectAll("circle")
    .data(data, d => d.month)  // ensure data is tracked based on month

  // console.log(rects)
    // _enter: all elements in data array that don't exist on screen yet
    // _exit: all elements on screen that don't exist in data array
    // _groups: all elements that exist on the screen

  // EXIT old elements not present in new data
  rects.exit()
    .attr('fill', 'red')  // pre-transition
    .transition(t)
      .attr('cy', y(0))
      .remove()
  
  // ENTER new elements present in new data
  rects.enter().append("circle")
    // applied ONLY to ENTER
    .attr("fill", "grey")
    .attr('cy', y(0))  // initially hidden
    .attr('r', 5)  // initially hidden
    // AND UPDATE old elements present in new data
    .merge(rects)
    .transition(t)
      .attr("cx", (d) => x(d.month) + (x.bandwidth() / 2))
      // fly up from bottom of chart
      .attr('cy', d => y(d[value]))

  const text = flag ? 'Profit ($)' : 'Revenue ($)'
  yLabel.text(text)
}
