# Efecto estereoquinético

## Planteamiento del problema

En la profundidad estereo cinética, el movimiento de rotación aumenta la impresión de profundidad que se observa en los patrones de anillos concéntricos. Normalmente, la rotación crea una impresión vívida de un cono que sobresale o un túnel que retrocede, o ambos.

## Antecedentes

La primera vez que el término de profundidad estereoquinética fue descrito, fue en 1924 por Musatti CL en un informe científico (Sui fenomeni stereocineti) sobre la ilusión estereoquinética, atribuyendo el descubrimiento y el nombre a su maestro Vittorio Benussi. Este también fue usado cerca del año 1935 por el artista Marcel Duchamp, que llamaba ["rotorrelieves"](https://img.macba.cat/public/styles/obra_ficha/public/imagenes/obras/3392_001_l.jpg?itok=MJDW51uZ&timestamp=1577372127) a sus discos giratorios.


## Código (solución) y resultados

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

## Manejo de la ilusión

En la parte superior derecha se encuentra un botón de "Resetear" el cual devuelve la ilusión a su estado original que es sin cráter y la posición inicial; en la esquina inferior izquierda se encuentra el botón de "Parar" con el cual la ilusión interrumpe su rotación hasta que este sea pulsado de nuevo; por último en la esquina inferior derecha se encuentra un boton de "cráter" el cual sirve para generar dentro de la ilusión un efecto de profundidad.

## Conclusiones y trabajo futuro

Tomando en cuenta los resultados de la codificación y  las pruebas visuales del mismo, se puede evidenciar cómo el movimiento de rotación en los círculos genera la impresión de profundidad. Como implementaciones a desarrollar para próximos intentos, se sugiere la idea de estudiar la combinación otro tipo de figuras y cómo eso cambia la dinámica de rotación, adicionalmente se sugiere que se tengan en cuenta los componente principales de la ilusión, tanto la rotación como la rapidez con la que se realiza, y sus relaciones o capacidades de potenciar las ilusiones propuestas.
