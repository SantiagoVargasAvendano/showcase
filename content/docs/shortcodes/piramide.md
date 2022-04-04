# Ilusión de la pirámide

## Ilusión

{{< details title="Código en p5.js" open=false >}}
```js
let maxSixe = 500, h, maxMumberSquares = 50, squares = 1, color_val = "Azul", invert_flag = 1;
function setup() {
  createCanvas(maxSixe+100, maxSixe);
  background(255);
  noStroke();
  frameRate(20);
  
  buttonUp = createButton('⯅');
  buttonUp.position(560, 200);
  buttonUp.mousePressed(changeUp);
  
  buttonDown = createButton('⯆');
  buttonDown.position(560, 220);
  buttonDown.mousePressed(changeDown);
  
  buttonReset = createButton('Resetear');
  buttonReset.position(525, 100);
  buttonReset.mousePressed(reset);
  
  buttonInvert = createButton('Invertir');
  buttonInvert.position(530, 400);
  buttonInvert.mousePressed(invert);
  buttonInvert.style('background-color', color(255));
  
  color_sel = createSelect();
  color_sel.position(530, 300);
  color_sel.option('Azul');
  color_sel.option('Verde');
  color_sel.option('Rojo');
  color_sel.selected('Azul');
  color_sel.changed(mySelectEvent);
}

function invert() {
  invert_flag *= -1;
  if(invert_flag > 0){
    buttonInvert.style('background-color', color(255));
  }else{
    buttonInvert.style('background-color', color(125));
  }
}

function reset() {
  squares = 1;
  color_val = "Azul";
  color_sel.selected('Azul');
}

function mySelectEvent() {
  color_val = color_sel.value();
}

function changeUp() {
  if(squares+1 < maxMumberSquares){
    squares += 1;
  }
}

function changeDown() {
  if(squares-1>0){
    squares -= 1;
  }
}

function draw() {
  fill(255);
  rect(530,200,20,45)
  textSize(15);
  fill(0);
  text(squares, 530,210,20,60);
  
  if(squares < maxMumberSquares){
    h = maxSixe/(2*squares);
    for(let i = 0; i < squares; i++){
      if(invert_flag > 0){
        if(color_val == "Rojo"){
          fill(255,0+i*(255/squares),0+i*(255/squares));
        }else if(color_val == "Verde"){
            fill(0+i*(255/squares),255,0+i*(255/squares));
        }else{
            fill(0+i*(255/squares),0+i*(255/squares),255);
        }
      }else{
        if(color_val == "Rojo"){
          fill(255-i*(255/squares),0,0);
        }else if(color_val == "Verde"){
            fill(0,255-i*(255/squares),0);
        }else{
            fill(0,0,255-i*(255/squares));
        }
      }
      rect(0+i*h,0+i*h, 500-i*2*h);
    }
  }
}
```
{{< /details >}}
{{< p5-global-iframe id="pyramid" width="625" height="525" >}}
let maxSixe = 500, h, maxMumberSquares = 50, squares = 1, color_val = "Azul", invert_flag = 1;
function setup() {
  createCanvas(maxSixe+100, maxSixe);
  background(255);
  noStroke();
  frameRate(20);
  
  buttonUp = createButton('⯅');
  buttonUp.position(560, 200);
  buttonUp.mousePressed(changeUp);
  
  buttonDown = createButton('⯆');
  buttonDown.position(560, 220);
  buttonDown.mousePressed(changeDown);
  
  buttonReset = createButton('Resetear');
  buttonReset.position(525, 100);
  buttonReset.mousePressed(reset);
  
  buttonInvert = createButton('Invertir');
  buttonInvert.position(530, 400);
  buttonInvert.mousePressed(invert);
  buttonInvert.style('background-color', color(255));
  
  color_sel = createSelect();
  color_sel.position(530, 300);
  color_sel.option('Azul');
  color_sel.option('Verde');
  color_sel.option('Rojo');
  color_sel.selected('Azul');
  color_sel.changed(mySelectEvent);
}

function invert() {
  invert_flag *= -1;
  if(invert_flag > 0){
    buttonInvert.style('background-color', color(255));
  }else{
    buttonInvert.style('background-color', color(125));
  }
}

function reset() {
  squares = 1;
  color_val = "Azul";
  color_sel.selected('Azul');
}

function mySelectEvent() {
  color_val = color_sel.value();
}

function changeUp() {
  if(squares+1 < maxMumberSquares){
    squares += 1;
  }
}

function changeDown() {
  if(squares-1>0){
    squares -= 1;
  }
}

function draw() {
  fill(255);
  rect(530,200,20,45)
  textSize(15);
  fill(0);
  text(squares, 530,210,20,60);
  
  if(squares < maxMumberSquares){
    h = maxSixe/(2*squares);
    for(let i = 0; i < squares; i++){
      if(invert_flag > 0){
        if(color_val == "Rojo"){
          fill(255,0+i*(255/squares),0+i*(255/squares));
        }else if(color_val == "Verde"){
            fill(0+i*(255/squares),255,0+i*(255/squares));
        }else{
            fill(0+i*(255/squares),0+i*(255/squares),255);
        }
      }else{
        if(color_val == "Rojo"){
          fill(255-i*(255/squares),0,0);
        }else if(color_val == "Verde"){
            fill(0,255-i*(255/squares),0);
        }else{
            fill(0,0,255-i*(255/squares));
        }
      }
      rect(0+i*h,0+i*h, 500-i*2*h);
    }
  }
}
{{< /p5-global-iframe >}}

## Manejo de la ilusión

En la parte derecha de la ilusión se encuentran los controles para manejarla, el primero es un botón de "Resetearla" que lleva la ilusión a sus valores por defecto que es 1 cuadro y el color azul; seguido encontramos dos botones junto con un número a su lado el botón con la flecha hacia arriba aumenta la cantidad de cuadrados (hasta 50), el botón con la flecha hacia abajo disminuye la cantidad de cuadrados (hasta 1) y el número al lado de ellos muestra la cantidad actual de cuadrados; luego hayamos un menú desplegable en el cual podemos escoger cualquiera de los tres colores con los cuales se presenta la ilusión de la pirámide y por ultimo se encuentra un botón para “Invertir” la ilusión, es decir, que el degrade desde el color principal sea hacia blanco o hacia negro.

## ¿Qué se observa?

El propósito de la ilusión es que entre mayor sea la cantidad de recuadros se genera una ilusión óptica como si existiera una "X" en las esquinas cuando está realmente no existe, cuando el centro es blanco la "X" es clara mientras que cuando el centro es negro la "X" es oscura. Esto se va generando, superponiendo cuadrados que en cuento se vuelven más pequeños, también se acercan más hacia el color esperado (negro o blanco).

## ¿Qué está sucediendo?

La ilusión de la pirámide (también llamada ilusión de Vasarely) es un llamativo efecto perceptivo relacionado con todos los fenómenos que implican inhibición lateral. El efecto se produce cuando se apilan cuadrados concéntricos (u otras figuras geométricas como la estrella) de tamaño y luminancia decrecientes.
La explicación consiste en considerar las disposiciones de los campos receptivos de las células ganglionares antagónicas del centro-rededor que conviven con la imagen. Imaginemos una célula en una esquina con su centro en la mancha más clara, será inhibida por 1/4 de entorno de las manchas más claras y por 3/4 de las manchas más oscuras, así las células ganglionares de los bordes señalan más luminosidad. La percepción se integra con la información de las células ganglionares y se elimina la fuerte distorsión de la luminancia.