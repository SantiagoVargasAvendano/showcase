# Efecto estereoquinético

## Ilusión

{{< details title="Código en p5.js" open=false >}}
```js
let movement = 0, stop = 1, crater = 1;
function setup() {
  createCanvas(500, 500);
  background(255);
  frameRate(30);
  noStroke();
  
  buttonStop = createButton('Parar');
  buttonStop.position(0, 478);
  buttonStop.mousePressed(stop_move);
  
  buttonReset = createButton('Resetear');
  buttonReset.position(430, 0);
  buttonReset.mousePressed(reset);
  
  buttonInvert = createButton('Crater');
  buttonInvert.position(447, 478);
  buttonInvert.mousePressed(invert);
  buttonInvert.style('background-color', color(255));
}

function invert() {
  crater *= -1;
  if(crater > 0){
    buttonInvert.style('background-color', color(255));
  }else{
    buttonInvert.style('background-color', color(125));
  }
}

function reset() {
  movement = 0;
  stop = 1;
  crater = 1;
  buttonInvert.style('background-color', color(255));
}

function stop_move() {
  stop *= -1;
}

function draw() {
  let aux = 2;
  fill(0,0,255);
  ellipse(250,250,500);
  for (let i = 1; i < 12; i++) {
    if(i % 2 == 0){
      fill(0,0,255);
    }else{
      fill(255,255,0);
    }
    if(crater==1){
      ellipse(250+(cos((movement % 360)*PI/180)*i*20),250+(sin((movement % 360)*PI/180)*i*20),500-i*40);
    }else{
      if(i < 7){
        ellipse(250+(cos((movement % 360)*PI/180)*i*20),250+(sin((movement % 360)*PI/180)*i*20),500-i*40);
        aux = i - 1;
      }else{
        ellipse(250+(cos((movement % 360)*PI/180)*aux*20),250+(sin((movement % 360)*PI/180)*aux*20),500-i*40);
        aux -= 1;
      }
    }
  }
  if(stop == 1){
    movement += 1;
  }
  
}
```
{{< /details >}}
{{< p5-global-iframe id="pyramid" width="525" height="525" >}}
let movement = 0, stop = 1, crater = 1;
function setup() {
  createCanvas(500, 500);
  background(255);
  frameRate(30);
  noStroke();
  
  buttonStop = createButton('Parar');
  buttonStop.position(0, 478);
  buttonStop.mousePressed(stop_move);
  
  buttonReset = createButton('Resetear');
  buttonReset.position(430, 0);
  buttonReset.mousePressed(reset);
  
  buttonInvert = createButton('Crater');
  buttonInvert.position(447, 478);
  buttonInvert.mousePressed(invert);
  buttonInvert.style('background-color', color(255));
}

function invert() {
  crater *= -1;
  if(crater > 0){
    buttonInvert.style('background-color', color(255));
  }else{
    buttonInvert.style('background-color', color(125));
  }
}

function reset() {
  movement = 0;
  stop = 1;
  crater = 1;
  buttonInvert.style('background-color', color(255));
}

function stop_move() {
  stop *= -1;
}

function draw() {
  let aux = 2;
  fill(0,0,255);
  ellipse(250,250,500);
  for (let i = 1; i < 12; i++) {
    if(i % 2 == 0){
      fill(0,0,255);
    }else{
      fill(255,255,0);
    }
    if(crater==1){
      ellipse(250+(cos((movement % 360)*PI/180)*i*20),250+(sin((movement % 360)*PI/180)*i*20),500-i*40);
    }else{
      if(i < 7){
        ellipse(250+(cos((movement % 360)*PI/180)*i*20),250+(sin((movement % 360)*PI/180)*i*20),500-i*40);
        aux = i - 1;
      }else{
        ellipse(250+(cos((movement % 360)*PI/180)*aux*20),250+(sin((movement % 360)*PI/180)*aux*20),500-i*40);
        aux -= 1;
      }
    }
  }
  if(stop == 1){
    movement += 1;
  }
  
}
{{< /p5-global-iframe >}}

## ¿Qué se observa?

El 

## ¿Qué está sucediendo?

La