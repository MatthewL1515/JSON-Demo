let weatherJSON 
let minTemp = Infinity
let maxTemp = -Infinity
let images = {}
let dx
function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast")  
}

function setup() {
  createCanvas(600, 400);
  dx = width/(weatherJSON.properties.periods.length+2)
  
  // const fit = (img) => {
  //   img.resize(dx,0)
  //   redraw()
  // }
  
  for( const p of weatherJSON.properties.periods ) {
    minTemp = min(p.temperature, minTemp)
    maxTemp = max(p.temperature, maxTemp)
    // if( ! (p.icon in images) ) {
    //   images[p.icon] = loadImage(p.icon, fit) 
    // }    
  }
  noLoop()
}

function draw() {
  background(220);
  let px = dx // dx * (i+1), where i = 0
  let py = map( weatherJSON.properties.periods[0].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
  for( let i = 1; i < weatherJSON.properties.periods.length; i++ ) {
    let cx = dx * (i+1)
    let cy = map( weatherJSON.properties.periods[i].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
    line(px,py,cx,cy)
    px = cx
    py = cy
    // if( weatherJSON.properties.periods[i].icon in images ) {
    //   image(images[weatherJSON.properties.periods[i].icon],dx*(i+1),height/2)   
    // }    
  }
  
  // console.log(images)
  
  // Draw: Title
  textAlign(CENTER, CENTER)
  text("Weather Forcast Temperatures", width / 2, 30)
  
  // Draw: Labels for the axises
  textAlign(CENTER, CENTER)
  text("Days", width / 2, height - 20)
  
  textAlign(CENTER, CENTER)
  translate(20, height / 2)
  rotate(-PI / 2)
  text("Temperature (F)", 0, 0)
}

function keyPressed() {
  redraw()
}
