const canvas1 = document.querySelector('#pixelCanvas1');
const canvas2 = document.querySelector('#pixelCanvas2');
const canvas3 = document.querySelector('#pixelCanvas3');
const canvas4 = document.querySelector('#pixelCanvas4');
const canvas5 = document.querySelector('#pixelCanvas5');
const canvas6 = document.querySelector('#pixelCanvas6');
const canvas7 = document.querySelector('#pixelCanvas7');
const canvas8 = document.querySelector('#pixelCanvas8');
const canvas9 = document.querySelector('#pixelCanvas9');
let timeout = false;
let delay = 1500; // Set's the delay to 1.5 seconds

// Makes the grids and calls activate()
function makeGrid(canvas) {
  let results = findValues();
  let tr;
  let td;
  for (let i = 0; i < results[0]/3; i++) {
    tr = document.createElement('tr');
    canvas.appendChild(tr);
    for (let j = 0; j < results[1]/3; j++) {
        td = document.createElement('td');
        tr.appendChild(td);
    }
  }
  activate(canvas1);
  activate(canvas2);
  activate(canvas3);
  activate(canvas4);
  activate(canvas5);
  activate(canvas6);
  activate(canvas7);
  activate(canvas8);
  activate(canvas9);
}

// Finds the pixel size of the window and returns the values in an array
function findValues() {
  let height = canvas1.offsetHeight;
  let width = canvas1.offsetWidth;
  let values = [height, width];
  return values;
}

// Adds event listeners which adds class and then removes class after a delay
function activate(canvas) {
  canvas.addEventListener('mouseover', function(event) {
    // Initial cell activation
    let cell = event.target;

    if (canvas === canvas1 || canvas === canvas4 || canvas === canvas7) {
      cell.className = "activatedlight";
      setTimeout(function() {
        cell.classList.remove("activatedlight");
      }, 10000);
    } else if (canvas === canvas2 || canvas === canvas5 || canvas === canvas8) {
      cell.className = "activated";
      setTimeout(function() {
        cell.classList.remove("activated");
      }, 10000);
    } else {
      cell.className = "activateddark";
      setTimeout(function() {
        cell.classList.remove("activateddark");
      }, 10000);
    }
  });
}

// Allows a function to be ran at certain intervals
function pollFunc(fn, timeout, interval) {
    var startTime = (new Date()).getTime();
    interval = interval || 14800,
    canPoll = true;

    (function p() {
        canPoll = ((new Date).getTime() - startTime ) <= timeout;
        if (!fn() && canPoll)  {
            setTimeout(p, interval);
        }
    })();
}

// When the background color isn't transparent call randomBG
function checkNight() {
  let body = document.body;
  let day = window.getComputedStyle(body, null).getPropertyValue("background-color");
  if (day == "rgba(0, 0, 0, 0)") {
    console.log(day);
  } else {
    randomBG();
  }
}

// Selects a random background image to display next
function randomBG() {
  let html = document.querySelector('html');
  let bgArray = [
    "url('pax/css/img/mountain.jpeg') no-repeat",
    "url('pax/css/img/stars.jpeg') no-repeat",
    "url('pax/css/img/beach.jpeg') no-repeat",
    "url('pax/css/img/bullcreek.jpg') no-repeat",
    "url('pax/css/img/sculpturefalls.jpg') no-repeat",
    "url('pax/css/img/clouds.jpg') no-repeat",
    "url('pax/css/img/hallstatt.jpg') no-repeat"
  ];
  let selectRandom = bgArray[Math.floor(Math.random()*bgArray.length)];
  html.style.background = selectRandom;
  html.style.backgroundSize = 'cover';
}

// When the window is resized clearGrid() is called after a delay
function windowResize() {
  window.addEventListener("resize", function() {
    clearTimeout(timeout);
    timeout = setTimeout(clearGrid, delay);
    location.reload();
  });
}

// Clears the grid and calls makeGrid()
function clearGrid() {
  canvas.innerHTML = '';
  makeGrid();
}

makeGrid(canvas1);
makeGrid(canvas2);
makeGrid(canvas3);
makeGrid(canvas4);
makeGrid(canvas5);
makeGrid(canvas6);
makeGrid(canvas7);
makeGrid(canvas8);
makeGrid(canvas9);
pollFunc(checkNight, 3600000, 14800);
windowResize();
