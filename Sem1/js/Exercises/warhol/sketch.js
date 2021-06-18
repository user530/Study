var stepLeft = 480;
var stepDown = 450;


function setup() 
{
    createCanvas(1600,1600);
    //noFill();
    //stroke(0,0,255);
}

function draw()
{
    background(255);
    for (let i = 0 ; i < 3 ; i++)
        {
            for (let j = 0 ; j < 3 ; j++)
                {
                    var upHead = [255 - (i * 107) + j * 60, 165 + i * 57 - j * (j + i) * 55, 150 * i];
                    var lowHead = [225 + (i * 38) - j * 50, 225 - i * 27 - j * (j + i) * 15, 225 - i * 65];
                    
                    fill(115 + j * 25 - i * 17, 150 + j * 33 - i * 75, 175 - j * 45 + i * 10);
                    rect(0 + j * stepLeft, 0 + i * stepDown, stepLeft, stepDown);

                    //lower head
                    fill(lowHead);
                    beginShape();
                        vertex(103 + j * stepLeft, 149 + i * stepDown);//left head
                        vertex(118 + j * stepLeft, 156 + i * stepDown);
                        vertex(115 + j * stepLeft, 188 + i * stepDown);
                        vertex(125 + j * stepLeft, 215 + i * stepDown); //nose
                        vertex(139 + j * stepLeft, 216 + i * stepDown);
                        vertex(166 + j * stepLeft, 226 + i * stepDown);
                        vertex(221 + j * stepLeft, 243 + i * stepDown);
                        vertex(283 + j * stepLeft, 232 + i * stepDown);
                        vertex(320 + j * stepLeft, 206 + i * stepDown);
                        vertex(366 + j * stepLeft, 204 + i * stepDown);
                        vertex(405 + j * stepLeft, 218 + i * stepDown); //right head
                        vertex(421 + j * stepLeft, 206 + i * stepDown);
                        vertex(391 + j * stepLeft, 299 + i * stepDown);
                        vertex(346 + j * stepLeft, 341 + i * stepDown);
                        vertex(286 + j * stepLeft, 396 + i * stepDown);
                        vertex(225 + j * stepLeft, 413 + i * stepDown);
                        vertex(175 + j * stepLeft, 415 + i * stepDown);
                        vertex(134 + j * stepLeft, 397 + i * stepDown);
                        vertex(96 + j * stepLeft, 357 + i * stepDown);
                        vertex(65 + j * stepLeft, 313 + i * stepDown);
                        vertex(58 + j * stepLeft, 262 + i * stepDown);
                        vertex(71 + j * stepLeft, 226 + i * stepDown);
                        vertex(84 + j * stepLeft, 185 + i * stepDown);
                    endShape(CLOSE);



                    //Upper head
                    fill(upHead);
                    beginShape();
                        vertex(186 + j * stepLeft, 8 + i * stepDown);
                        vertex(173 + j * stepLeft, 4 + i * stepDown);
                        vertex(163 + j * stepLeft, 12 + i * stepDown);
                        vertex(158 + j * stepLeft, 93 + i * stepDown);
                        vertex(140 + j * stepLeft, 103 + i * stepDown);
                        vertex(118 + j * stepLeft, 122 + i * stepDown);
                        vertex(103 + j * stepLeft, 149 + i * stepDown);//left head
                        vertex(118 + j * stepLeft, 156 + i * stepDown);
                        vertex(115 + j * stepLeft, 188 + i * stepDown);
                        vertex(125 + j * stepLeft, 225 + i * stepDown); //nose
                        vertex(139 + j * stepLeft, 226 + i * stepDown);
                        vertex(166 + j * stepLeft, 235 + i * stepDown);
                        vertex(221 + j * stepLeft, 243 + i * stepDown);
                        vertex(283 + j * stepLeft, 232 + i * stepDown);
                        vertex(320 + j * stepLeft, 206 + i * stepDown);
                        vertex(366 + j * stepLeft, 204 + i * stepDown);
                        vertex(405 + j * stepLeft, 218 + i * stepDown); //right head
                        vertex(421 + j * stepLeft, 206 + i * stepDown);
                        vertex(412 + j * stepLeft, 184 + i * stepDown);
                        vertex(420 + j * stepLeft, 88 + i * stepDown);
                        vertex(404 + j * stepLeft, 19 + i * stepDown);
                        vertex(376 + j * stepLeft, 26 + i * stepDown);
                        vertex(324 + j * stepLeft, 76 + i * stepDown);
                        vertex(228 + j * stepLeft, 69 + i * stepDown);
                    endShape(CLOSE);



                    //left eye(w)
                    fill (255,255,255);
                    beginShape();
                        vertex(148 + j * stepLeft, 147 + i * stepDown); // upper point
                        vertex(137 + j * stepLeft, 149 + i * stepDown);
                        vertex(130 + j * stepLeft, 160 + i * stepDown);
                        vertex(131 + j * stepLeft, 172 + i * stepDown);
                        vertex(135 + j * stepLeft, 179 + i * stepDown);
                        vertex(140 + j * stepLeft, 181 + i * stepDown); //low point
                    endShape(CLOSE);

                    //right eye(w)
                    beginShape();
                        vertex(261 + j * stepLeft, 169 + i * stepDown); // upper point
                        vertex(250 + j * stepLeft, 174 + i * stepDown);
                        vertex(244 + j * stepLeft, 182 + i * stepDown);
                        vertex(241 + j * stepLeft, 187 + i * stepDown);
                        vertex(241 + j * stepLeft, 192 + i * stepDown);
                        vertex(244 + j * stepLeft, 203 + i * stepDown);
                        vertex(260 + j * stepLeft, 208 + i * stepDown); //low point
                    endShape(CLOSE);

                    //nose+mouth
                    fill(0, 0, 0);
                    beginShape();
                        vertex(101 + j * stepLeft, 289 + i * stepDown);
                        vertex(125 + j * stepLeft, 285 + i * stepDown);
                        vertex(125 + j * stepLeft, 269 + i * stepDown);
                        vertex(104 + j * stepLeft, 257 + i * stepDown);
                        vertex(102 + j * stepLeft, 235 + i * stepDown);
                        vertex(109 + j * stepLeft, 220 + i * stepDown);
                        vertex(133 + j * stepLeft, 213 + i * stepDown);
                        vertex(149 + j * stepLeft, 218 + i * stepDown);
                        vertex(171 + j * stepLeft, 226 + i * stepDown);
                        vertex(175 + j * stepLeft, 235 + i * stepDown);
                        vertex(164 + j * stepLeft, 251 + i * stepDown);
                        vertex(141 + j * stepLeft, 268 + i * stepDown);
                        vertex(132 + j * stepLeft, 269 + i * stepDown);
                        vertex(132 + j * stepLeft, 285 + i * stepDown);
                        vertex(160 + j * stepLeft, 296 + i * stepDown);
                        vertex(180 + j * stepLeft, 305 + i * stepDown);
                        vertex(227 + j * stepLeft, 301 + i * stepDown);
                        vertex(184 + j * stepLeft, 316 + i * stepDown);
                        vertex(150 + j * stepLeft, 304 + i * stepDown);
                    endShape(CLOSE);

                    //left eye(b)
                    beginShape();
                        vertex(148 + j * stepLeft, 147 + i * stepDown); // upper point
                        vertex(159 + j * stepLeft, 148 + i * stepDown);
                        vertex(166 + j * stepLeft, 159 + i * stepDown);
                        vertex(161 + j * stepLeft, 172 + i * stepDown);
                        vertex(151 + j * stepLeft, 180 + i * stepDown);
                        vertex(140 + j * stepLeft, 181 + i * stepDown); //low point
                        vertex(137 + j * stepLeft, 172 + i * stepDown);
                        vertex(136 + j * stepLeft, 163 + i * stepDown);
                        vertex(140 + j * stepLeft, 156 + i * stepDown);
                    endShape(CLOSE);

                    //right eye(b)
                    beginShape();
                        vertex(261 + j * stepLeft, 169 + i * stepDown); // upper point
                        vertex(273 + j * stepLeft, 172 + i * stepDown);
                        vertex(285 + j * stepLeft, 180 + i * stepDown);
                        vertex(290 + j * stepLeft, 190 + i * stepDown);
                        vertex(283 + j * stepLeft, 202 + i * stepDown);
                        vertex(260 + j * stepLeft, 208 + i * stepDown); //low point
                        vertex(256 + j * stepLeft, 201 + i * stepDown);
                        vertex(253 + j * stepLeft, 190 + i * stepDown);
                        vertex(256 + j * stepLeft, 178 + i * stepDown);
                    endShape(CLOSE);

                    //ear
                    beginShape();
                        vertex(340 + j * stepLeft, 120 + i * stepDown);
                        vertex(361 + j * stepLeft, 87 + i * stepDown);
                        vertex(390 + j * stepLeft, 60 + i * stepDown);
                        vertex(400 + j * stepLeft, 96 + i * stepDown);
                        vertex(380 + j * stepLeft, 146 + i * stepDown);
                    endShape(CLOSE);
                    }
        }
    
    
}


