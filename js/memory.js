let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];

let arrayComparison = [];

document.body.onload = startGame();



var interval; 
var modal = document.querySelector("#modal");
var timer = document.querySelector(".timer");
var iconsFind = document.getElementsByClassName("find");


function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}



function playAgain() {
    modal.classList.remove("active");
    startGame();
}



function startGame() {
    
    emptyArray= [];
    clearInterval(interval);

    let arrayShuffle = shuffle(arrayAnimali);
    let cardGrid = document.querySelector("body #griglia");
    while (cardGrid.hasChildNodes()) {
        cardGrid.removeChild(cardGrid.firstChild);
    }

    for (let i = 0; i < 24; i++) {
        let box = document.createElement('div');
        let card = document.createElement('div');
        card.className = 'icon';
        document.querySelector("body #griglia").appendChild(box).appendChild(card);
        card.innerHTML = arrayShuffle[i];
    }


    Timer();

    let icon = document.getElementsByClassName("icon");
    let icons = [...icon];

    for (let i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", showModal);
    }
}

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    this.classList.toggle("show");
    arrayComparison.push(this);

    var len = arrayComparison.length;

    if (len === 2) {

        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {

            icons.forEach(function (item) {
                item.classList.add('disabled');
            });

            setTimeout(function () {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function (item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
    console.log(iconsFind)
}



function showModal() {
    if (iconsFind.length == 24) {
        clearInterval(interval);
        modal.classList.add("active");
        document.querySelector(".content #tempoTrascorso").innerHTML = timer.innerHTML;
    }
}

function hideModal() {
    closeicon.addEventListener("click", function () {
        modal.classList.remove("active");
        startGame();
    });
}



function Timer() {

    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    interval = setInterval(function () {
        timer.innerHTML = 'Tempo: ' + hours + " ore " + minutes + " minuti " + seconds + " secondi";
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}



