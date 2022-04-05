# Ilusión dinámica de Ebbinghaus

## Planteamiento del problema

Dentro del sitio web de Michael Bach se encontró una ilusión óptica que es la versión dinámica de ["La ilusión de Ebbinghaus"](https://michaelbach.de/ot/cog-Ebbinghaus/index.html). La ilusión consta de un anillo de discos azules y en su centro un disco naranja y todo se mueve, los discos azules cambian de tamaño pero el disco naranja permanece siempre con un tamaño constante, sin embargo, cuando los discos azules alcanzan el mayor tamaño el disco naranja parece haber disminuido de tamaño y de igual manera cuando los discos azules alcanzan su menor tamaño el disco naranja parece haber aumentado su tamaño.

## Antecedentes

Esta ilusión corresponde a una variación dinámica de la ilusión de Ebbinghaus, variación creada por Christopher D. Blair, Gideon P. Caplovitz y Ryan E.B. Mruczek, que logró potenciar la fuerza de la ilusión y fue ganadora en el "Visual Illusion Contest" de 2014. 
En la ilusión de Ebbinghaus, se ven dos anillos de discos azules uno con los discos grandes y otro con los discos pequeños, en el centro de ambos anillos hay dos discos naranjas que a pesar de que no lo parezcan tienen igual tamaño; la ilusión lleva el nombre de Hermann Ebbinghaus, un pionero en la investigación de la memoria, que probablemente descubrió esta ilusión en la década de 1890, pero no la divulgó en ninguna publicación específica. Más adelante, Titchener (sin reclamar su autoría) la publicó en un libro de texto de 1901; por ello, también se le suele conocer como la ilusión de Titchener. 

## Código (solución) y resultados

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

## Conclusiones y trabajo futuro

Basados en los resultados y en un proceso de observación, se concluye que existe una tendencia a aumentar el fenómeno visual generado cuando la visión del observador se fija en la circunferencia interior plasmada dentro del disco azul superior izquierdo. La ilusión de Ebbinghaus ha desempeñado un papel crucial en el debate sobre la existencia de vías separadas en el cerebro para la visión de percepción y visión de la acción. Se ha argumentado que la ilusión de Ebbinghaus distorsiona la percepción del tamaño, pero no para la acción. Así mismo se encontró un estudio en el cual muestran que existen 70 variantes genéticas relacionadas con la percepción de la ilusión de Ebbinghaus.
Uno de los distintos campos en los que se puede seguir trabajando con la ilusión de Ebbinghaus es con la percepción de colores y si estos afectan de alguna manera la percepción del tamaño, también se puede considerar analizar si la forma en la que se está moviendo el sistema afecta que tanto se percibe la ilusión.
