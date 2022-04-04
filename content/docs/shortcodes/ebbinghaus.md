# Ilusión dinámica de Ebbinghaus

## Ilusión

{{< details title="Código en p5.js" open=false >}}
```js
let x = 400,y = 400, L = 22, A, H, rad, distance, aux = 1;

function setup() {
  createCanvas(500, 500);
  frameRate(40);
  
  A = cos(PI/3)*L;
  H = sin(PI/3)*L;
}

function draw() {
  background(191);
  if((frameCount-1) % 125 == 0){
    aux = -aux;
   }
  x = x + aux * 1.25;
  y = y + aux * 1.25;
  noStroke();
  fill(235, 131, 26);
  ellipse(x,y,30);
  fill(80, 125, 230);
  
  rad = 12*pow((400/x),5);
  distance = pow((400/x),4)
  
  ellipse(x-L*distance,y,rad);
  ellipse(x+L*distance,y,rad);
  
  ellipse(x+A*distance,y-H*distance,rad);
  ellipse(x-A*distance,y-H*distance,rad);

  ellipse(x+A*distance,y+H*distance,rad);
  ellipse(x-A*distance,y+H*distance,rad);
  
  strokeWeight(5);
  stroke(230, 216, 32);
  point(x,y);
  stroke(0, 60, 138);
  point(x-A*distance,y-H*distance);
}
```
{{< /details >}}
{{< p5-global-iframe id="pyramid" width="525" height="525" >}}
let x = 400,y = 400, L = 22, A, H, rad, distance, aux = 1;

function setup() {
  createCanvas(500, 500);
  frameRate(40);
  
  A = cos(PI/3)*L;
  H = sin(PI/3)*L;
}

function draw() {
  background(191);
  if((frameCount-1) % 125 == 0){
    aux = -aux;
   }
  x = x + aux * 1.25;
  y = y + aux * 1.25;
  noStroke();
  fill(235, 131, 26);
  ellipse(x,y,30);
  fill(80, 125, 230);
  
  rad = 12*pow((400/x),5);
  distance = pow((400/x),4)
  
  ellipse(x-L*distance,y,rad);
  ellipse(x+L*distance,y,rad);
  
  ellipse(x+A*distance,y-H*distance,rad);
  ellipse(x-A*distance,y-H*distance,rad);

  ellipse(x+A*distance,y+H*distance,rad);
  ellipse(x-A*distance,y+H*distance,rad);
  
  strokeWeight(5);
  stroke(230, 216, 32);
  point(x,y);
  stroke(0, 60, 138);
  point(x-A*distance,y-H*distance);
}
{{< /p5-global-iframe >}}

## ¿Qué se observa?

El 

## ¿Qué está sucediendo?

La