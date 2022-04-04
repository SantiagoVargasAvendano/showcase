
new p5((p) => {
    let maxSixe = 500, h, maxMumberSquares = 50, squares = 1, color_val = "Azul", invert_flag = 1;

    p.setup = function () {
        p.createCanvas(maxSixe+100, maxSixe);
        p.background(255);
        p.noStroke();
        p.frameRate(20);
        
        buttonUp = p.createButton('⯅');
        buttonUp.position(560, 200);
        buttonUp.mousePressed(changeUp);
        
        buttonDown = p.createButton('⯆');
        buttonDown.position(560, 220);
        buttonDown.mousePressed(changeDown);
        
        buttonUp = p.createButton('Resetear');
        buttonUp.position(525, 100);
        buttonUp.mousePressed(reset);
        
        buttonInvert = p.createButton('Invertir');
        buttonInvert.position(530, 400);
        buttonInvert.mousePressed(invert);
        buttonInvert.style('background-color', color(255));
        
        color_sel = p.createSelect();
        color_sel.position(530, 300);
        color_sel.option('Azul');
        color_sel.option('Verde');
        color_sel.option('Rojo');
        color_sel.selected('Azul');
        color_sel.changed(mySelectEvent);+

        p.noLoop();
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
        color_val = "Blue";
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

    p.draw = function () {
        p.fill(255);
        p.rect(530,200,20,45)
        p.textSize(15);
        p.fill(0);
        p.text(squares, 530,210,20,60);
        
        if(squares < maxMumberSquares){
            h = maxSixe/(2*squares);
            for(let i = 0; i < squares; i++){
            if(invert_flag > 0){
                if(color_val == "Rojo"){
                    p.fill(255,0+i*(255/squares),0+i*(255/squares));
                }else if(color_val == "Verde"){
                    p.fill(0+i*(255/squares),255,0+i*(255/squares));
                }else{
                    p.fill(0+i*(255/squares),0+i*(255/squares),255);
                }
            }else{
                if(color_val == "Rojo"){
                    p.fill(255-i*(255/squares),0,0);
                }else if(color_val == "Verde"){
                    p.fill(0,255-i*(255/squares),0);
                }else{
                    p.fill(0,0,255-i*(255/squares));
                }
            }
            p.rect(0+i*h,0+i*h, 500-i*2*h);
            }
        }
    }
}, "pyramid");