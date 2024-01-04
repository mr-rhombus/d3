// ADDING SVGs

// Create an SVG canvas
const svg = d3.select('#chart-area').append('svg')
  .attr('width', 400)
  .attr('height', 400);

// // Create a circle
// svg.append('circle')
//   .attr('cx', 200)
//   .attr('cy', 200)
//   .attr('r', 100)
//   .attr('fill', 'blue');

// EXERCISE - Create a rectangle on the screen
// svg.append('rect')
//   .attr('x', 0)
//   .attr('y', 10)
//   .attr('width', 200)
//   .attr('height', 100)
//   .attr('fill', '#a3b4c5')
//   .attr('stroke', 'black')


// SELECTIONS AND DATA LOADING
// const data = [25, 20, 10, 12, 15]

// const cirlces = svg.selectAll('circle')
//   .data(data)

// cirlces.enter().append('circle')  // dynamically set radius and position of circles
//   .attr('cx', (d, i) => {
//     console.log('item:' + d, 'index:' + i)
//     return (i * 50) + 50
//   })
//   .attr('cy', 250)
//   .attr('r', (d) => {
//     console.log(d)
//     return d
//   })
//   .attr('fill', 'red');


// LOAD EXTERNAL DATA
// d3.csv('data/ages.csv').then(data => {  // d3.tsv(".tsv") or d3.json(".json) work as well
//   data.forEach(d => {
//     d.age = Number(d.age);
//   })
//   console.log(data)
  
//   const circles = svg.selectAll('circle')
//   .data(data)
  
//   circles.enter().append('circle')
//   .attr('cx', (d, i) => (i * 50) + 50)
//   .attr('cy', 250)
//   .attr('r', (d) => 2 * d.age)
//   .attr('fill', d => {
//     if (d.name === 'Tony') {
//       return 'blue'
//     }
//     else {
//       return 'red'
//     }
//   }).catch(error => {  // error handling
//     console.log(error)
//   })
// })

// EXERCISE - Use buildings.json to make bars whose heights correspond to the building heights
d3.json('data/buildings.json').then(data => {
  // Convert height to int
  console.log(data)
  data.forEach(d => {
    d.height = Number(d.height)
  })

  const bldgs = svg.selectAll('rect')
  .data(data)
  console.log(bldgs)

  bldgs.enter().append('rect')
  // iterate through rectangles and get element (d) and index (i)
  .attr('x', (d, i) => i*60)  // x-coords of 0, 60, 120, ...
  .attr('y', 40)
  .attr('width', 40)
  .attr('height', (bldg) => bldg.height)
  .attr('fill', 'gray')
  .attr('stroke', 'black')
})
  