var t1 = 100;
var t2 = 500;

var dd = 200;
var pD;
var pY;

var div1 = 5;
var div2 = 4;

var table1;
var table2;

var rowCount1, row1;
var rowCount2, row2;

let nodes1 = [];
let nodes2 = [];
let tempcat = [];
let eachphrase = [];

//translate to middle of canvas
var tx;
var ty;

var n1 = 1;
var n2 = 1;
var n3 = 1;

//ellipse size
var eS = 2;
var eH = 5;

var t = 0;
var infoBox1;
var infoBox2;

function preload() {
  table1 = loadTable("networks.csv", "csv", "header");
  table2 = loadTable("CH.csv", "csv", "header");

  cnm = loadImage("cnmt.png");
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);

  rowCount2 = table2.getRowCount();
  rowCount1 = table1.getRowCount();

  for (var i = 0; i < rowCount2; i++) {

    var yr = table2.getNum(i, "year");
    var data = table2.getString(i, "data");

    nodes2.push(new Node(i, yr, data));

  }

  for (var i = 0; i < rowCount1; i++) {

    var year = table1.getNum(i, "year");
    var author = table1.getString(i, "author");
    var title = table1.getString(i, "title");
    var subject = table1.getString(i, "subject");
    var category = table1.getString(i, "category");

    var details = table1.getString(i, "details")

    nodes1.push(new Node(i, year, details));
  }
}

function draw() {
  background(15, 15, 75); //Navy

  t2 = height - 40;

  stroke(255, 150);
  strokeWeight(.75);
  //noFill();
  //tint(100, 100);
  imageMode(CENTER);
  image(cnm, width / 2, height / 2 - 60);
  /*image(cnm, 55, 80, width / 3.7, width / 3.7);
  image(cnm, 348, 80, width / 3.7, width / 3.7);
  image(cnm, 640, 80, width / 3.7, width / 3.7);
  image(cnm, 933, 80, width / 3.7, width / 3.7);*/

  // star
  star((width / 5) - 120, height / 5);
  star((width / 5) * 2 - 120, height / 5);
  star((width / 5) * 3 - 120, height / 5);
  star((width / 5) * 4 - 120, height / 5);

  // title bar
  noStroke();
  fill(15, 15, 75, 150);
  rect(0, 0, width, 80);
  rect(0, height - 200, width, 200);
  textAlign(CENTER);
  textSize(50);
  noFill();
  stroke(0, 0, 255, 100);
  text("CHICAGO   NEW   MEDIA                     1973-1992", width / 2, 45);
  stroke(0, 0, 255, 150);
  text("CHICAGO   NEW   MEDIA                    1973-1992", width / 2, 40);
  stroke(255, 0, 255);
  text("CHICAGO   NEW   MEDIA                   1973-1992", width / 2, 35);

  //timeline text
  stroke(255, 0, 255, 200);
  noFill();
  textSize(23);
  textAlign(CENTER, CENTER);
  push();
  translate(15, t2 - 30);
  rotate(-HALF_PI);
  text("prehystories", 0, 0);
  pop();
  push();
  translate(width - 15, t2 - 20);
  rotate(HALF_PI);
  text("present", 0, 0);
  pop();

  //timeline lines
  stroke(255, 190);
  //strokeWeight(.25);
  line(33, t2, width - 30, t2);
  //stroke(255);
  line(200, t2 - 20, 200, t2 + 20);
  line(203, t2 - 20, 203, t2 + 20);
  line(206, t2 - 20, 206, t2 + 20);
  noStroke();
  fill(255, 100);
  textSize(13);
  push();
  translate(200, height - 100);
  rotate(-HALF_PI);
  text("Chicago" + '\n' + "EST. 1830", 0, 0);
  pop();

  var row1 = table1.getRows();

  // create a division for 1973 and 1992
  var begin = map(1973, 1830, (table1.get(row1.length - 1, "year")), 196, width - 35);
  var end = map(1992, 1830, (table1.get(row1.length - 1, "year")), 196, width - 35);

  noStroke();
  fill(255, 0, 100, 80);
  quad(begin - 2, 0, end + 2, 0, end + 2, height, begin - 2, height);

  //stroke(255, 100);
  //line(end + 2, 0, end + 2, height);

  // create numbering for cnm prehystories:

  for (var rT = 0; rT < div1; rT++) {
    var yearT = table1.getNum(rT, "year");
    var timelineT = map(yearT, (table1.get(0, "year")), 1830, 35, 196);

    if (rT > 0) {
      pD = table1.getString(rT - 1, "details");
      pY = table1.getNum(rT - 1, "year");

      nodes1[rT].label(mouseX, mouseY, timelineT, t2 - 10, eS, pY, pD, 1);
    }
    nodes1[rT].display(mouseX, mouseY, timelineT, t2 - 10, eS);
  }

  // creating timeline data for CNM rhizome:

  for (var r = div1; r < row1.length; r++) {

    var year = table1.getNum(r, "year");
    var timeline = map(year, 1830, (table1.get(row1.length - 1, "year")), 196, width - 35);

    pD = table1.getString(r - 1, "details");
    pY = table1.getNum(r - 1, "year");
    var pT = map(pY, 1830, (table1.get(row1.length - 1, "year")), 196, width - 35);

    if (pY > 0 && timeline == pT) {
      n1++;

      nodes1[r].display(mouseX, mouseY, timeline, t2 - (10 * n1), eS);
    } else {
      n1 = 1;

      nodes1[r].display(mouseX, mouseY, timeline, t2 - 10, eS);
    }

    nodes1[r].label(mouseX, mouseY, timeline, t2 - 10, eS, pY, pD, 1);
  }

  //creating prehystories Chicago data

  var row2 = table2.getRows();

  for (var iT = 0; iT < div2; iT++) {

    var yrT = table2.getNum(iT, "year");
    if (yrT > 0) {
      var timeline2T = map(yrT, (table2.get(0, "year")), 1830, 35, 196);


      pD2 = table1.getString(iT - 1, "details");
      pY2 = table1.getNum(iT - 1, "year");
      var pTt = map(pY, (table2.get(0, "year")), 1830, 35, 196);

      if (pY2 > 0 && timeline2T == pTt) {
        n3++;

        nodes2[iT].display(mouseX, mouseY, timeline2T, t2 + (10 * n3), eS);

      } else {
        n3 = 1;

        nodes2[iT].display(mouseX, mouseY, timeline2T, t2 + 10, eS);
      }
    }
    nodes2[iT].label(mouseX, mouseY, timeline2T, t2 + 10, eS, pY2, pD2, 2);
  }


  // creating Chicago history data

  for (var i = div2; i < row2.length; i++) {

    var yr = table2.getNum(i, "year");
    var timeline2 = map(yr, 1830, (table1.get(row1.length - 1, "year")), 196, width - 35);

    var pY2 = table2.getNum(i - 1, "year");
    var pD2 = table2.getString(i - 1, "data");
    var pT2 = map(pY2, 1830, (table1.get(row1.length - 1, "year")), 196, width - 35);

    if (pY2 > 0 && timeline2 == pT2) {
      n2++;

      nodes2[i].display(mouseX, mouseY, timeline2, t2 + (10 * n2), eS);

    } else {
      n2 = 1;

      nodes2[i].display(mouseX, mouseY, timeline2, t2 + 10, eS);
    }
    nodes2[i].label(mouseX, mouseY, timeline2, t2 - 10, eS, pY2, pD2, 2);
  }
}

function Node(iD, y, d) {
  this.id = iD;
  this.yr = y;
  this.d = d;
  this.radius = eS;
  this.height = eH;

  //this.x = this.radius;
  //this.y = this.radius;

  tx = width / 2;
  ty = height / 2;

  this.display = function(px, py, xT, yT, r) {

    if ((px < xT + this.radius && px > xT - this.radius)) {
      noFill();
      stroke(255);
      ellipseMode(CENTER);
      ellipse(xT, yT, this.radius, this.height);

      //noFill();
      stroke(255, 0, 0);
      line(xT, 0, xT, height);

    } else if ((px > xT + this.radius || px < xT - this.radius)) {
      noFill();
      stroke(255, 150);
      ellipseMode(CENTER);
      ellipse(xT, yT, this.radius, this.height);
    } else {
      noFill();
      stroke(255, 150);
      ellipseMode(CENTER);
      ellipse(xT, yT, this.radius, this.height);
    }
  }

  this.label = function(px, py, xT, yT, r, pYear, pData, pin) {
    if (this.d != null) {

      if ((px < xT + this.radius && px > xT - this.radius) && this.yr != pYear) {
        t = 1;
        infoBox1 = this.d;
        textSize(14);

        if (pin == 1) {
          for (var i = 0; i < width / 2; i++) {
            stroke(255, i / width * 255);
            line(i, 80, i, height - 200);
          }
          for (var i = width; i >= width / 2; i--) {
            stroke(255, i / width * 255);
            line(i, 80, i, height - 200);
          }
          noStroke();
          textAlign(RIGHT, CENTER);
          fill(15, 15, 150);
          text(infoBox1, width - 100, 110);
        } else if (pin == 2) {
          noStroke();
          fill(255, 200);
          textAlign(LEFT, CENTER);
          text(infoBox1, 100, 110);
        }
        // formatting years
        textSize(100);
        noFill();
        stroke(15, 15, 150);
        textAlign(LEFT, CENTER);
        push();
        translate(width - 45, 85);
        rotate(PI / 2);
        text(this.yr, 0, 0);
        pop();
        push();
        textAlign(RIGHT, CENTER);
        translate(45, 85);
        rotate(-PI / 2);
        stroke(255, 200);
        text(this.yr, 0, 0);
        pop();
      } else if ((px < xT + this.radius && px > xT - this.radius) && this.yr == pYear && pData != null) {
        t++;
        textSize(14);
        noStroke();

        if (pin == 1) {
          textAlign(RIGHT, CENTER);
          fill(15, 15, 150);
          infoBox1 = this.d;
          text(infoBox1, width - 100, 80 + 30 * t);
        } else {
          textAlign(LEFT, CENTER);
          fill(255, 200);
          infoBox1 = this.d;
          text(infoBox1, 100, 80 + 30 * t);
        }
      }
    }
  }
}

function star(x, y) {
  noStroke();
  fill(255, 0, 255, 70);
  push();
  translate(x, y);
  beginShape();
  vertex(0, 80);
  vertex(93, 100);
  vertex(120, 0);
  vertex(147, 100);
  vertex(240, 80);
  vertex(174, 150);
  vertex(240, 220);
  vertex(147, 200);
  vertex(120, 300);
  vertex(93, 200);
  vertex(0, 220);
  vertex(66, 150);
  endShape(CLOSE);
  pop();
}
