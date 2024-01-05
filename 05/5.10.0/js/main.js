/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// Sizing
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 50, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 450 - MARGIN.TOP - MARGIN.BOTTOM

// SVG and group elements
const svg = d3.select('#chart-area').append('svg')
	.attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
	.attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append('g')
	.attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// x-axis label
g.append('text')
	.attr('class', 'x axis-label')
	.attr('x', WIDTH / 2)
	.attr('y', HEIGHT + 50)
	.text('GDP Per Capita ($)')
	.attr('text-anchor', 'middle')
	.attr('font-size', '20px')

// y-axis label
g.append('text')
	.attr('class', 'y axis-label')
	.attr('x', - (HEIGHT / 2))
	.attr('y', -50)
	.text('Life Expectancy (yrs)')
	.attr('transform', 'rotate(-90)')
	.attr('text-anchor', 'middle')
	.attr('font-size', '20px')

// year
const timeLabel = g.append('text')
	.attr('class', 'year label')
	.attr('x', WIDTH - 50)
	.attr('y', HEIGHT - 20)
	.text('1800')
	.attr('font-size', '40px')
	.attr('opacity', '0.5')
	.attr('text-anchor', 'middle')

// Create axes
const x = d3.scaleLog()
	.domain([100, 150000])
	.range([0, WIDTH])
	.base(10)
	
const y = d3.scaleLinear()
	.domain([0, 90])
	.range([HEIGHT, 0])

const area = d3.scaleLinear()
	.domain([1000, 1.5e9])
	.range([25*Math.PI, 1500*Math.PI])

const color = d3.scaleOrdinal(d3.schemePastel1)

const xAxisGroup = g.append('g')
	.attr('class', 'x axis')
	.attr('transform', `translate(0, ${HEIGHT})`)
	
const yAxisGroup = g.append('g')
	.attr('class', 'y axis')
	
// Data things
d3.json("data/data.json").then(function(data){
	// clean data
	const formattedData = data.map(d => {
		return d.countries.filter(country => {
			return (country.income && country.life_exp)
		})
	})
	let i = 0
	d3.interval(() => {
		i = (i < 214) ? i+1 : 0
		timeLabel.text(data[i].year)
		update(formattedData[i])
	}, 100)
	update(formattedData[i])
})

	
function update(data) {
	const t = d3.transition().duration(100)

	const xAxisCall = d3.axisBottom(x)
		.tickValues([400, 4000, 40000])
		.tickFormat(d => '$' + d)
	xAxisGroup
		// TODO - add transition
		.call(xAxisCall)

	const yAxisCall = d3.axisLeft(y)
	yAxisGroup
		// TODO - add transition
		.call(yAxisCall)

	// console.log('update data [ix]', data)

	// JOIN new data with old elements
	const circles = g.selectAll('circle')
		.data(data, d => d.countries)

	console.log('circles', circles)

	// EXIT old elements not present in new data
	circles.exit()
		// .transition(t)
		.attr('r', 0)
		.remove()

	// ENTER new elements present in new data
	circles.enter().append('circle')
		.attr('fill', 'grey')
		.attr('cy', y(0))
		.attr('r', 0)
		.merge(circles)
		// .transition(t)
			.attr('cy', d => y(d.life_exp))
			.attr('cx', d => x(d.income))
			.attr('r', d => Math.sqrt(area(d.population) / Math.PI))
			.attr('opacity', 0.7)
			.attr('fill', d => color(d.continent))
}