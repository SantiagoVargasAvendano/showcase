# Ilusión de la pirámide

## Planteamiento del problema

Se encontró dentro del archivo web del investigador [Michael Bach](https://michaelbach.de/ot) sobre fenómenos visuales, una ilusión óptica denominada “ilusión de la pirámide” efecto perceptivo relacionado con todos los fenómenos que implican inhibición lateral. 
 
La inhibición lateral se define como el proceso por el cual una célula inhibe la actividad de las células adyacentes. En las células de la retina, la inhibición lateral genera un realce de los bordes y un mayor contraste en las imágenes que se forman en el cerebro. El efecto de ésta inhibición lateral fue descubierto por Ernst Mach, que explicó en 1865 la ilusión visual denominada bandas de March. Este efecto produce que paneles que generan diferentes sombras colocados uno al lado del otro aparezcan más claros o más oscuros en las transiciones, a pesar del color uniforme dentro de un panel. Los paneles aparecen más claros en el borde con un panel más oscuro, y más oscuros en el borde con un panel más claro. 
 
El propósito de la ilusión yace en generar la sensación de la existencia de una “X” dentro de cuadrados concéntricos en sus esquinas cuando realmente no existe. Para esto, se implementó un código que generase cuadrados concéntricos uno encima de otro, en el cual se va degradando ligeramente el color del cuadro siguiente, con lo cual, conforme mayor sea la cantidad de cuadros generados, la ilusión óptica empieza a hacer su aparición.

## Antecedentes

Se tiene conocimiento de que fue demostrado por primera vez por Martinez-Conde & Macknik en la Reunión Soc Neurosci de 2001. Se ha incorporado a muchas pinturas Op Art como Arcturus II de Victor Vasarely.

## Código (solución) y resultados

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

## Conclusiones y trabajo futuro

La ilusión de la pirámide es un llamativo efecto perceptivo relacionado con todos los fenómenos que implican inhibición lateral. Como se puedo observar, al generar varios cuadrados y conforme esta cantidad aumentaba el efecto visual de la aparición de una “X” en medio del escenario, adicionalmente, dicho efecto y su impresión en el observador podría cambiar dependiendo del color al que se dezplacen los cuadrados, blanco o negro, generando una sensación de realce o profundidad respectivamente. La explicación consiste en considerar las disposiciones de los campos receptivos de las células ganglionares antagónicas del centro-rededor que conviven con la imagen. Imaginemos una célula en una esquina con su centro en la mancha más clara, será inhibida por 1/4 de entorno de las manchas más claras y por 3/4 de las manchas más oscuras, así las células ganglionares de los bordes señalan más luminosidad. La percepción se integra con la información de las células ganglionares y se elimina la fuerte distorsión de la luminancia.