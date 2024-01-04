const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

// LINEAR SCALES
const svg = d3.select('#chart-area').append('svg')
  .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

  const g = svg.append('g')  // add a group element
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
  
  // X label
  g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT + 110)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text("The world's tallest buildings")

  // Y label
  g.append('text')
    .attr('class', 'y axis-labe')
    .attr('transform', 'rotate(-90)')
    .attr('x', - (HEIGHT / 2))
    .attr('y', -60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('Height (m)')

  d3.json('data/buildings.json').then(data => {
    data.forEach(d => {
      d.height = Number(d.height)
    })
    
    const rects = g.selectAll('rect')  // append rectangles to group element
    .data(data)

    // add a y scale
    // const y = d3.scaleLinear()
    //   .domain([0,828])  // max height of bldg
    //   .range([0,400])  // height of svg
      
      // rects.enter().append('rect')
      // .attr('y', 0)
      // .attr('x', (d,i) => (i*60))
      // .attr('width', 40)
      // .attr('height', d => y(d.height))  // scale the heights
      // .attr('fill', 'grey')
// })
      
      
// LOG SCALES
//   const y = d3.scaleLog()
//     .domain([1,828])  // max height of bldg
//     .range([0,400])  // height of svg
//     .base(10)
      
//     rects.enter().append('rect')
//     .attr('y', 0)
//     .attr('x', (d,i) => (i*60))
//     .attr('width', 40)
//     .attr('height', d => y(d.height))  // scale the heights
//     .attr('fill', 'grey')
// })


// TIME SCALES
//   const x = d3.scaleTime()
//     .domain([
//       new Date(2000, 0, 1),
//       new Date(2001, 0, 1)
//     ])
//     .range([0,400])
      
//     console.log(x(new Date(2000, 7, 1)))  // date -> num
//     console.log(x.invert(199))  // num -> date
// })


// ORDINAL SCALES - use colors in viz, useful when using discrete data
//   const color = d3.scaleOrdinal()
//     .domain([
//       'AFRICA', 'N. AMERICA',
//       'EUROPE', 'S. AMERICA',
//       'ASIA', 'AUSTRALASIA'
//     ])
//     .range([
//         'RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'GREY'
//     ])
//     // .range(d3.schemeCategory10)  // pre-defined colors
  
//   console.log(color('AFRICA'))  // RED (custom range) or #1f77b4 (pre-defined scheme)
// })


// BAND SCALES - space out rectangles in bar charts
  // const x = d3.scaleBand()
  //   .domain([
  //     'AFRICA', 'N. AMERICA',
  //     'EUROPE', 'S. AMERICA',
  //     'ASIA', 'AUSTRALASIA'
  //   ])
  //   .range([0, 400])
  //   .paddingInner(0.3)
  //   .paddingOuter(0.2)

  // console.log('S. AMERICA:', x('S. AMERICA'))  // ~209
  // console.log('AFRICA:', x('AFRICA'))  // ~13
  // console.log('bandwidth:', x.bandwidth())
          
  // add a y scale
//   const x = d3.scaleBand()
//     .domain([
//       'Burj Khalifa', 'Shanghai Tower', 'Abraj Al-Bait Clock Tower',
//       'Ping An Finance Centre', 'Lotte World Tower', "One World Trade Center",
//       "CTF Finance Centre"
//     ])
//     .range([0, 400])
//     .paddingInner(0.2)
//     .paddingOuter(0.2)

//   const y = d3.scaleLinear()
//     .domain([0, 828])
//     .range([0, 400])

//   console.log(x('Burj Khalifa'))  // width of each bar ~15.4
  
//   rects.enter().append('rect')
//   .attr('y', 0)
//   .attr('x', (d) => x(d.name))
//   .attr('width', x.bandwidth())
//   .attr('height', d => y(d.height))  // scale the heights
//   .attr('fill', 'grey')
// })


// MIN, MAX, EXTENT - automatically set domain
//   const x = d3.scaleBand()
//     .domain(data.map(d => d.name))  // map function to grab each bldg name
//     .range([0, 400])
//     .paddingInner(0.2)
//     .paddingOuter(0.2)

//   const y = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.height)])
//     .range([0, 400])

//   console.log(x('Burj Khalifa'))  // width of each bar ~15.4
  
//   rects.enter().append('rect')
//   .attr('y', 0)
//   .attr('x', (d) => x(d.name))
//   .attr('width', x.bandwidth())
//   .attr('height', d => y(d.height))  // scale the heights
//   .attr('fill', 'grey')
// })


// MARGINS AND GROUPS
  const x = d3.scaleBand()
    .domain(data.map(d => d.name))  // map function to grab each bldg name
    .range([0, WIDTH])
    .paddingInner(0.2)
    .paddingOuter(0.2)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([HEIGHT, 0])

  const xAxisCall = d3.axisBottom(x)
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll('text')
    // shift text down 10, left 5, rotate 40 degrees counter clockwise
    .attr('y', '10')
    .attr('x', '-5')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)')

  const yAxisCall = d3.axisLeft(y)
    // 3 ticks, show in meters
    .ticks(3)
    .tickFormat(d => d + 'm')
  g.append('g')
    .attr('class', 'y axis')
    .call(yAxisCall)

  console.log(x('Burj Khalifa'))  // width of each bar ~15.4
  
  rects.enter().append('rect')
    .attr('y', (d) => y(d.height))
    .attr('x', (d) => x(d.name))
    .attr('width', x.bandwidth())
    .attr('height', d => HEIGHT - y(d.height))  // scale the heights
    .attr('fill', 'grey')
})

