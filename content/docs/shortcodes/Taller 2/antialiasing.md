# Anti-Aliasing

## Planteamiento del problema

Considere un triángulo renderizado, si nos acercamos lo suficiente sobre la imagen del mismo, notaremos que los bordes del triángulo no son regulares, en cambio tiene un patrón de “escalera”, de “sierra” o de “tablero de ajedrez”. Dichos bordes que son observados, son llamados “jaggies” o bordes escalonados, y son el resultado de lo que en realidad está sucediendo, que no es más que la figura, en este caso el triángulo, se encuentra dividida en píxeles. En el proceso de rasterización lo que se realiza es descomponer una superficie continua, el triángulo, en elementos discretos, los píxeles. A este efecto en computación gráfica, se le conoce con el nombre de aliasing, que de forma rápida se puede ver como “el escalonamiento visual de los bordes que se produce en una imagen cuando la resolución es demasiado baja”. Siendo más precisos en su definición, el aliasing es el defecto gráfico característico que hace que en una pantalla ciertas curvas y líneas inclinadas presenten un efecto visual tipo “sierra” o “escalón”, dicho defecto se presenta cuando se intenta representar una imagen con curvas y líneas inclinadas en una pantalla, framebuffer o imagen, pero que debido a la resolución finita de la misma resulta que este sea incapaz de representar la curva como es, y por tanto dichas curvas se muestran en pantalla dentadas al estar compuestas por los píxeles.

## Antecedentes

En consecuencia, para abordar los problemas generados por el aliasing, en computación visual se han desarrollado a lo largo de varias décadas algoritmos que buscan disminuir el impacto que tiene este defecto en el aspecto visual de los gráficos, entre los que resaltan nombres como el de Herbert Freeman en 1974 con "Computer processing of line drawing images", o Edwin Catmull con trabajos como “A Subdivision Algorithm for Computer Display of Curved Surfaces” o  "A hidden-surface algorithm with anti-aliasing" en los años 1974 y 1978 respectivamente. Dichos algoritmos se han determinado como algoritmos de anti-aliasing, o también conocido simplemente como AA, cuya definición más básica sería la de buscar “el suavizado de los bordes irregulares en las imágenes digitales promediando los colores de los píxeles en las fronteras”.

![Santiago Vargas](/showcase/sketches/AA.png 'Santiago Vargas')
Figura [1]. La letra de la izquierda sufre de aliasing. A la letra de la derecha se le ha aplicado anti-aliasing para que los bordes parezcan más suaves.

En cambio de renderizar con una única muestra por píxel, se divide el píxel en sub-píxeles, lo que conforme a mayor cantidad de los mismos, permite ilustrar los bordes de los objetos con mayor precisión. En la actualidad existen distintos métodos para tratar el problema del aliasing, Using high-resolution display, Post filtering (Supersampling), Pre-filtering (Area Sampling), Pixel phasing.

Hacer uso de dispositivos con mayor resolución - Una de las soluciones que se presentan para reducir el efecto visual causado por el aliasing es utilizar pantallas o dispositivos que sean de alta definición, con esto los “jaggies” o “bordes dentados” serán conforme mayor resolución  cada vez más indistinguibles para el ojo humano, con lo cual estos bordes se tornan difusos y comenzarán a parecer más lisos.

Pre-filtración, Muestreo de área - En el muestreo de área, la intensidad de los píxeles es determinada calculando las áreas superpuestas de cada píxel con los objetos que van a ser desplegados, considerando los píxeles como áreas. Este método es conocido como pre-filtración ya que es un procedimiento que se hace antes de generar la imagen rasterizada.

Fases de pixel - El método se basa en desplazar la posición de los píxeles a posiciones aproximadas a la geometría del objeto. Algunos sistemas permiten que se ajuste el tamaño de los píxeles individuales para distribuir las intensidades, lo que es útil en la fase de píxeles.

Post-filtración, Sobremuestreo - Los objetos son muestreados con una resolución superior y son desplegados con una resolución menor. En este método se incrementa la resolución de muestreo suponiendo que la pantalla estuviera compuesta de una cuadrícula más delgada de lo que realmente es. Para el cálculo de la intensidad de los píxeles se realiza al combinar o promediar los valores de las intensidades de los subpixeles que lo componen. Este método es conocido como post-filtración debido a que el procedimiento es realizado después de generar la imagen rasterizada. Un estilo mejorado de AA es el MSAA (antialiasing multimuestreo), que es un método más rápido y aproximado de supermuestreo AA, que tiene un menor costo computacional. Actualmente, las grandes empresas de tarjetas gráficas como CSAA de NVIDIA y CFAA de AMD desarrollan técnicas de sobremuestreo mejores y más sofisticadas, con el objetivo de resaltar en el mercado y mejorar el rendimiento de sus hardwares.

## Código (solución) y resultados

{{< details title="Código en p5.js" open=false >}}
```js
function AA(quadrilleF, points, row0, col0, row1, col1, row2, col2, shader, pattern0, pattern1 = pattern0, pattern2 = pattern0) {
    if (Array.isArray(pattern0) && Array.isArray(pattern1) && Array.isArray(pattern2)) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          let numberPoints = 0;
          for (let k = 0; k < points; k++) {
             for (let h = 0; h < points; h++) {
               let coords = quadrilleF._barycentric_coords(i + 0.01 + k*(0.98)/(points-1), j + 0.01 + h*(0.98)/(points-1), row0, col0, row1, col1, row2, col2);
               if (coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0) {
                 numberPoints++;  
               }
             }
          }
          if (numberPoints > 0) {
            let coords = this._barycentric_coords(i, j, row0, col0, row1, col1, row2, col2);
            let length = Math.max(pattern0.length, pattern1.length, pattern2.length);
            let _pattern = new Array(length);
            for (let k = 0; k < _pattern.length; k++) {
                _pattern[k] = (pattern0[k] ?? 0) * coords.w0 + (pattern1[k] ?? 0) * coords.w1 + (pattern2[k] ?? 0) * coords.w2;
            }
            for (let k = 0; k < _pattern.length; k++) {
              _pattern[k] = 255 - (255 - _pattern[k])/(points*points)*numberPoints;
            }
            quadrilleF._memory2D[i][j] = shader({ pattern: _pattern, row: i, col: j });
          }
        }
      }
    }
  }
```
{{< /details >}}
Para generar un triángulo con Anti-aliasing presione la tecla "r"

{{< p5-global-iframe lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js" id="pyramid" width="525" height="825" >}}
const ROWS = 100;
const COLS = 100;
let numberPoints = 2;
let quadrilleAA, quadrille, length;
let color0 = [255,0,0], color1 = [0,255,0], color2 = [0,0,255];
let row0, col0, row1, col1, row2, col2;

function setup() {
  createCanvas(500, 800);
  quadrilleAA = createQuadrille(ROWS, COLS);
  quadrille = createQuadrille(ROWS, COLS);
  length = 400/ROWS;
  
  colorPicker0 = createColorPicker('red');
  colorPicker0.position(420, 20);
  
  colorPicker1 = createColorPicker('green');
  colorPicker1.position(420, 70);
  
  colorPicker2 = createColorPicker('blue');
  colorPicker2.position(420, 120);
  
  colorPicker0.changed(changeColor);
  colorPicker1.changed(changeColor);
  colorPicker2.changed(changeColor);

  inp = createInput('');
  inp.position(420, 200);
  inp.size(50);
  inp.input(myInputEvent);  
}

function myInputEvent() {
  numberPoints = this.value();
}

function changeColor(){
  color0 = colorPicker0.color().levels.slice(0, 3);
  color1 = colorPicker1.color().levels.slice(0, 3);
  color2 = colorPicker2.color().levels.slice(0, 3);
}

function draw() {
  background('white');
  textSize(15);
  text('Puntos:', 420, 190);
  
  drawQuadrille(quadrilleAA, { cellLength: length, outline: 'black', outlineWeight:0.001, board: false });
  drawQuadrille(quadrille, { cellLength: length, outline: 'black', outlineWeight:0.001, board: false , pixelY: 400});
  line(0,400,400,400);
  line(400,0,400,800);
}

function keyPressed() {
  randomize();
  quadrilleAA.clear();
  quadrille.clear();
  if (key === 'r') {
    AA(quadrilleAA, numberPoints, row0, col0, row1, col1, row2, col2, colorize_shaderAA, color0, color1, color2);
    quadrille.rasterizeTriangle(row0, col0, row1, col1, row2, col2, colorize_shaderAA, color0, color1, color2);
  }
}

function colorize_shaderAA({ pattern: mixin }) {
  let rgb = mixin.slice(0, 3);
  return color(rgb);
}

function randomize() {
  col0 = int(random(0, COLS));
  row0 = int(random(0, ROWS));
  col1 = int(random(0, COLS));
  row1 = int(random(0, ROWS));
  col2 = int(random(0, COLS));
  row2 = int(random(0, ROWS));
}

function AA(quadrilleF, points, row0, col0, row1, col1, row2, col2, shader, pattern0, pattern1 = pattern0, pattern2 = pattern0) {
    if (Array.isArray(pattern0) && Array.isArray(pattern1) && Array.isArray(pattern2)) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          let numberPoints = 0;
          for (let k = 0; k < points; k++) {
             for (let h = 0; h < points; h++) {
               let coords = quadrilleF._barycentric_coords(i + 0.01 + k*(0.98)/(points-1), j + 0.01 + h*(0.98)/(points-1), row0, col0, row1, col1, row2, col2);
               if (coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0) {
                 numberPoints++;  
               }
             }
          }
          if (numberPoints > 0) {
            let coords = this._barycentric_coords(i, j, row0, col0, row1, col1, row2, col2);
            let length = Math.max(pattern0.length, pattern1.length, pattern2.length);
            let _pattern = new Array(length);
            for (let k = 0; k < _pattern.length; k++) {
                _pattern[k] = (pattern0[k] ?? 0) * coords.w0 + (pattern1[k] ?? 0) * coords.w1 + (pattern2[k] ?? 0) * coords.w2;
            }
            for (let k = 0; k < _pattern.length; k++) {
              _pattern[k] = 255 - (255 - _pattern[k])/(points*points)*numberPoints;
            }
            quadrilleF._memory2D[i][j] = shader({ pattern: _pattern, row: i, col: j });
          }
        }
      }
    }
  }

function _barycentric_coords(row, col, row0, col0, row1, col1, row2, col2) {
    let edges = this._edge_functions(row, col, row0, col0, row1, col1, row2, col2);
    let area = this._parallelogram_area(row0, col0, row1, col1, row2, col2);
    return { w0: edges.e12 / area, w1: edges.e20 / area, w2: edges.e01 / area };
  }

function  _parallelogram_area(row0, col0, row1, col1, row2, col2) {
    return (col1 - col0) * (row2 - row0) - (col2 - col0) * (row1 - row0);
  }

 function _edge_functions(row, col, row0, col0, row1, col1, row2, col2) {
    let e01 = (row0 - row1) * col + (col1 - col0) * row + (col0 * row1 - row0 * col1);
    let e12 = (row1 - row2) * col + (col2 - col1) * row + (col1 * row2 - row1 * col2);
    let e20 = (row2 - row0) * col + (col0 - col2) * row + (col2 * row0 - row2 * col0);
    return { e01, e12, e20 };
  }
{{< /p5-global-iframe >}}

Para la realización de este ejercicio de Anti-aliasing  nos basamos en el método de Supersample Anti-aliasing (SSAA), mediante el cual por cada pixel existente dentro de la grilla original generamos una subgrilla virtual (la cantidad de filas y columnas de esta puede ser modificada por el usuario) dentro de cada uno de estos y mediante el uso de las coordenadas baricéntricas determinamos cual es la cantidad de subpíxeles dentro de cada pixel que se encuentra a su vez dentro de las coordenadas del triángulo, valga la pena recalcar que entre mayor sea el tamaño de la subgrilla virtual mayor cantidad de subpíxeles van a existir y el muestreo será más exacto y por lo tanto se tendrán resultados visuales más refinados y sutiles para el ojo humano. 
A partir de la cantidad de subpixeles que se encuentren dentro del triangulo podemos tomar la decisión sobre cual es la influencia que tiene este pixel dentro de nuestro muestreo de color, de esa manera asignarle el tono correspondiente, siendo los pixeles que menos puntos tienen dentro del triángulo los que poseen un color más tenue o cercano al blanco. De la misma manera se implementó gracias al uso de las coordenadas baricéntricas un sombreado del triángulo, donde cada una de sus vértices tiene un color (que puede ser escogido por el usuario en la animación) y a partir de estas se calcula el color de cada uno de los puntos coincidentes en la construcción del triángulo. 


## Conclusiones y trabajo futuro
Es importante resaltar la relevancia que tienen las coordenadas baricéntricas y sus potenciales usos en el área de computación gráfica. Como pudimos observar durante la experimentación y la investigación acerca del tema, las coordenadas fueron una herramienta vital para la construcción de nuestro ejemplo, permitiendo submuestrear cada pixel basados en la idea identificar gracias a los valores arrojados por las coordenadas si el subpixel estaba en el interior o no del triángulo. Durante las búsquedas que se realizaron sobre el tema se encontró que actualmente el anti-aliasing es un tema de relevancia y más en el campo de los videojuegos, debido a los agradables efectos que genera en los gráficos y cómo logra mejorar la calidad estética de lo que diariamente observamos a través de las pantallas. Pensando en futuro, se sugiere trabajar sobre las ideas que actualmente ya se han desarrollado, en especial sobre los algoritmos basados en MSAA, y observando sus costos computacionales con respecto a su antecesor el SSAA.
