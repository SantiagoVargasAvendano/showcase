# Espacios

## Planteamiento del problema
En computación, la interacción 3D es una forma de interacción hombre-máquina en la que los usuarios pueden moverse y realizar interacciones en el espacio 3D. Tanto el ser humano como la máquina procesan información en la que la posición física de los elementos en el espacio 3D es relevante.
El espacio 3D utilizado para la interacción puede ser el espacio físico real, una representación del espacio virtual simulado en el ordenador o una combinación de ambos. Cuando se utiliza el espacio físico real para la entrada de datos, el humano interactúa con la máquina realizando acciones mediante un dispositivo de entrada que detecta la posición 3D de la interacción humana, entre otras cosas. Cuando se utiliza para la salida de datos, la escena virtual 3D simulada se proyecta en el entorno real a través de un dispositivo de salida. Los principios de la interacción 3D se aplican en diversos ámbitos como el turismo, el arte, los juegos, la simulación, la educación, la visualización de información o la visualización científica.

## Antecedentes
La investigación sobre la interacción y la visualización en 3D comenzó en la década de los sesenta, de la mano de investigadores como Ivan Sutherland, Fred Brooks, Bob Sproull, Andrew Ortony y Richard Feldman. Pero no fue hasta 1962 cuando Morton Heilig inventó el simulador Sensorama. Proporcionaba retroalimentación de vídeo en 3D, así como movimiento, audio y retroalimentación para producir un entorno virtual. La siguiente etapa de desarrollo fue la finalización del trabajo pionero del Dr. Ivan Sutherland en 1968, la Espada de Damocles. Creó una pantalla montada en la cabeza que producía un entorno virtual en 3D presentando una imagen fija a la izquierda y a la derecha de ese entorno.

La disponibilidad de la tecnología, así como los costes poco prácticos, frenaron el desarrollo y la aplicación de los entornos virtuales hasta la década de 1980. Las aplicaciones se limitaron a empresas militares en Estados Unidos. Desde entonces, la investigación y los avances tecnológicos han permitido abrir nuevas puertas a la aplicación en otros ámbitos como la educación, el entretenimiento y la fabricación.

Hardware de entrada de la interfaz de usuario 3D: Estos dispositivos de hardware se denominan dispositivos de entrada y su objetivo es capturar e interpretar las acciones realizadas por el usuario. Los grados de libertad (DOF) son una de las principales características de estos sistemas. Los componentes clásicos de la interfaz (como el ratón y los teclados, y podría decirse que la pantalla táctil) suelen ser inadecuados para las necesidades de interacción no 2D. Estos sistemas también se diferencian según el grado de interacción física necesario para utilizar el dispositivo: los puramente activos necesitan ser manipulados para producir información, los puramente pasivos no lo necesitan. Las principales categorías de estos dispositivos son: dispositivos de entrada estándar (de escritorio), dispositivos de seguimiento, dispositivos de control, equipos de navegación, interfaces gestuales, ratones 3D e interfaces cerebro-ordenador.
- Dispositivos de entrada de escritorio
- Dispositivos de seguimiento
- Nintendo Wii Remote ("Wiimote")
- Dispositivos Google Tango
- Microsoft Kinect
- Movimiento de salto

¿Qué es una transformación del mundo?
Una transformación de mundo cambia las coordenadas del espacio del modelo, donde los vértices se definen en relación con el origen local de un modelo, al espacio del mundo, donde los vértices se definen en relación con un origen común a todos los objetos de una escena. En esencia, la transformación del mundo coloca un modelo en el mundo; de ahí su nombre. La transformación del mundo puede incluir cualquier combinación de traslaciones, rotaciones y escalas.

![coordinates](/showcase/sketches/coordinates.jpg 'coordinates') <br>
El diagrama muestra la relación entre el sistema de coordenadas mundial y el sistema de coordenadas local de un modelo. 

## Código (solución) y resultados

{{< details title="Código en p5.js" open=false >}}
```js
function initPressure() {  
  Pressure.set('#uiCanvas', {      
    end: function(){
      pressure = 0;
      },
    change: function(force, event) {
      pressure = force;
    }
  });

  Pressure.config({
    polyfill: true, 
    polyfillSpeedUp: 1000, 
    polyfillSpeedDown: 300,
    preventSelect: true,
    only: null
       });
}
```
{{< /details >}}

Instrucciones para el manejo:
- Para empezar y detener la grabación del dibujo presione la letra "r".
- Para borrar el dibujo presione la letra "c".
- Para agrandar el tamaño de la brocha presione la letra "a".
- Para disminuir el tamaño de la brocha presione la letra "m".

{{< p5-global-iframe id="spaces" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" lib3="/showcase/sketches/pressure.js" width="625" height="475" >}}
// Brush controls
let color;
let brush;

let easycam;
let state;
let drawState;

let escorzo;
let points;
let record;

var pressure = -2;
let size = 1;

function setup() {
  canvas = createCanvas(600, 450, WEBGL);
  canvas.id("uiCanvas");
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 1000); // now animate to that state
  escorzo = true;
  perspective();

  // brush stuff
  points = [];
  color = createColorPicker('#ed225d');
  color.position(width - 70, 40);
  
  sel = createRadio();
  sel.option('1', 'Esfera');
  sel.option('2', 'Cubo');
  sel.option('3', 'Cono');
  sel.option('4', 'Toroide');
  sel.option('5', 'Cilindro');
  sel.position(width - 80, 100);
  sel.selected('1');
  sel.style('width', '75px');
  // select initial brush
  brush = Brush;
  
  initPressure();
}

function draw() {
  lights();
  update();
  background(120);
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();
  for (const point of points) {
    push();
    translate(point.worldPosition);
    brush(point);
    pop();
  }
  console.log(pressure);
}

function update() {
  let dx = abs(mouseX - pmouseX);
  let dy = abs(mouseY - pmouseY);
  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
  if (record) {
    points.push({
      worldPosition: treeLocation([mouseX, mouseY,pressure], { from: 'SCREEN', to: 'WORLD' }),
      color: color.color(),
      speed: speed,
      size: size,
      shape: sel.value()
    });
  }
}

function Brush(point) {
  push();
  noStroke();
  fill(point.color);
  if(point.shape=="1"){
    sphere(point.size);
  }else if(point.shape=="2"){
    box(point.size);
  }else if(point.shape=="3"){
    cone(point.size,point.size);
  }else if(point.shape=="4"){
    torus(point.size+1,point.size);
  }else{
    cylinder(point.size,point.size);
  }  
  pop();
}


function keyPressed() {
  if (key === 'r') {
    record = !record;
    if(record){
      easycam.removeMouseListeners();
      easycam.attachListener(easycam.renderer.elt    , 'touchend'  , easycam.mouse.touchend  , { passive:false });
      easycam.attachListener(easycam.renderer.elt    , 'touchstart'  , easycam.mouse.touchstart  , { passive:false });
    }else{
      easycam.attachMouseListeners();
    }
  }
  if (key === 'p') {
    escorzo = !escorzo;
    escorzo ? perspective() : ortho();
  }
  if (key == 'c') {
    points = [];
  }
  if (key == 'a') {
    size++;
  } 
  if (key == 'm') {
    size--;
  } 
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}

function initPressure() {  
  Pressure.set('#uiCanvas', {      
    end: function(){
      pressure = 0;
      },
    change: function(force, event) {
      pressure = force;
    }
  });

  Pressure.config({
    polyfill: true, 
    polyfillSpeedUp: 1000, 
    polyfillSpeedDown: 300,
    preventSelect: true,
    only: null
       });
}
{{< /p5-global-iframe >}}

Para la realización del ejercicio se tomó como base la librería pressure.js de Javascript, con la cual fue posible realizar una medición de la presión ejercida y de esa manera evaluar este parámetro como la profundidad dentro del lienzo, así mismo se realizó la implementación de nuevas brochas añadidas desde las figuras 3D base que ofrece p5.

Ejemplos: <br>
![arbol](/showcase/sketches/arbol_example.png 'arbol') <br>
![visual](/showcase/sketches/visual_example.png 'visual') <br>
![barco](/showcase/sketches/barco_example.png 'barco') <br>

## Conclusiones y trabajo futuro
La exploración que se hizo con el 3D brush presentado durante las clases de Computación Visual, complementa las ideas y las lleva a la práctica, especialmente la del uso de las transformaciones de screen to world, cómo entendemos y manejamos estas interacciones, además de proponer nuevos estilos distintos a los tradicionalmente conocidos como ratón y teclado, que permiten explorar nuevas alternativas para el desarrollo de la computación visual y lo que puede ser un nuevo espacio para nuevas posibilidades desde escritorios con ambientes 3D hasta en general una interacción mucho más completa en todo aspecto con nuestras máquinas de uso diario.

Basados en el desarrollo del taller, encontramos interés en el desarrollo de modelos 3D y software especializado que permita trabajar con un mayor grado de libertad. Consideramos que esta es una aproximación a lo que puede ser nuevas herramientas y áreas de trabajo en las cuales se permita manipular entornos inmersivos para la construcción de prototipos y modelos de la realidad que permitan avanzar en áreas tanto científicas como del entretenimiento, ya sean en animación de series, videojuegos, entre otros. Dado que este tipo de herramientas ofrecen la capacidad al usuario de crear mundos virtuales que puedan usarse con múltiples fines. Para trabajos futuros creemos que es importante evaluar la comodidad con la cual se manejan los controles, realizar estudios sobre su “ergonomía” e intuición para el usuario y experimentar si dicha percepción aumenta o disminuye con el uso continuo de la herramienta. Adicionalmente se promueve la idea de añadir más capacidades al entorno, como podría ser agregar la capacidad de añadir puntos de luces adicionales, permitir subir modelos ya prefabricados, guardar modelos hechos en la herramienta o que exista la posibilidad de crear su propia brocha.


