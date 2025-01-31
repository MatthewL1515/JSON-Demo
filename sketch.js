// All Variables
let weatherJSON
let minTemp = Infinity
let maxTemp = -Infinity
let images = {}
let dx
let periods

// Preload JSON data
function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast")
}

function setup() {
  createCanvas(600, 400)
  periods = weatherJSON.properties.periods
  dx = width / (periods.length + 2)

  for (const p of periods) {
    minTemp = min(p.temperature, minTemp)
    maxTemp = max(p.temperature, maxTemp)
  }

  noLoop()
}

// Map temperatures to y-coordinates
function mapTempToY(temp) {
  return map(temp, minTemp, maxTemp, 0.8 * height, 0.2 * height)
}

// Draw axes
function drawAxes() {
  let h = height * 0.9

  // Y-axis
  line(dx, h, dx, height * 0.1)

  // X-axis
  line(dx, h, width - dx, h)
}

// Draw labels for axes
function drawLabels() {
  textAlign(CENTER, CENTER)
  text("Days", width / 2, height - 20)

  push()
  translate(20, height / 2)
  rotate(-PI / 2)
  text("Temperature (°F)", 0, 0)
  pop()
}

// Draw legend (key) just above x-axis
function drawLegend() {
  let keyX = width / 2 + 100
  let keyY = height * 0.8

  fill(220)
  stroke(0)
  rect(keyX, keyY - 10, 130, 30, 10)

  fill(255, 0, 0)
  noStroke()
  ellipse(keyX + 15, keyY + 5, 8, 8)

  fill(0)
  textSize(12)
  textAlign(LEFT, CENTER)
  text("Temperature Data", keyX + 25, keyY + 5)
}

// Draw the line connecting temperature points
function drawTemperatureLine() {
  let px = dx
  let py = mapTempToY(periods[0].temperature)

  for (let i = 1; i < periods.length; i++) {
    let cx = dx * (i + 1)
    let cy = mapTempToY(periods[i].temperature)
    
    stroke(0)
    line(px, py, cx, cy)

    px = cx
    py = cy
  }
}

// Draw data points (red dots)
function drawDataPoints() {
  fill(255, 0, 0)
  noStroke()

  for (let i = 0; i < periods.length; i++) {
    let x = dx * (i + 1)
    let y = mapTempToY(periods[i].temperature)
    ellipse(x, y, 8, 8)
  }
}

// Label each data point with its temperature
function drawDataLabels() {
  textAlign(CENTER, BOTTOM)

  for (let i = 0; i < periods.length; i++) {
    let x = dx * (i + 1)
    let y = mapTempToY(periods[i].temperature)
    text(periods[i].temperature + "°F", x, y - 10)
  }
}

function draw() {
  background(220)

// Note: for some reason, I've to make an order for the following functions, or else previous functions might mess up later ones.
  
  // Draw axes
  drawAxes()

  // Draw title at top of screen
  textAlign(CENTER, CENTER)
  textSize(20)
  text("Weather Forecast Temperatures", width / 2, 30)

  // Input all other functions
  drawLabels()
  drawTemperatureLine()
  drawDataPoints()
  drawDataLabels()
  drawLegend()
}
