let gameSeq = [];
let userSeq = [];
let Hscore = 0;
let gOh1 = document.querySelector("#game-over");
let h2 = document.querySelector("h2");
let startBtn = document.getElementById("start-btn");
let btns = ["green","red","yellow","voilet"];

const audio1 = new Audio();
audio1.src = "start-13691.mp3";
const audio2 = new Audio();
audio2.src = "stop-13692.mp3";
const audio3 = new Audio();
audio3.src = "short-beep-tone-47916.mp3";
const audio4 = new Audio();
audio4.src = "achive-sound-132273.mp3";

let started = false;
let level = 0;


startBtn.addEventListener("click",function(event){
    if(started == false){
        console.log("game stated");
        started = true;
        levelUp();
    }
})

function gameFlash(btn,audio){
    btn.classList.add("gameflash");

    setTimeout(function(){
        audio.play();
    },50)

    setTimeout(function(){
        btn.classList.remove("gameflash")
    },250);
}


function userFlash(btn,audio){
    btn.classList.add("userflash");

    setTimeout(function(){
        audio.play();
    },10)

    setTimeout(function(){
        btn.classList.remove("userflash")
    },300);
}

function levelUp(){
    level ++
    userSeq = []
    startBtn.style.display = "none";
    h2.innerText = `Level ${level}`
    
    let randIdx = Math.floor(Math.random() *3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    let audio; 

    if(randIdx == 0){
        audio = audio1;
    }else if (randIdx == 1){
        audio = audio2;
    }else if (randIdx ==2){
        audio = audio3;
    }else if (randIdx == 3){
        audio = audio4;
    }
    gameSeq.push(randColor);
    console.log(gameSeq)

    gameFlash(randBtn,audio);
}

function checkAns(idx){
    console.log(`current level ${level}`)

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        gOh1.style.display = "block";
        gOh1.innerText = "GAME OVER!";
        h2.innerHTML = `Your Score ${level}`;
        highScore(level);
        reset();
    }
}

function btnPress(){
    let btn = this;
    let audio;
    if(btn.id == "green"){
        audio = audio1;
    }else if(btn.id == "red"){
        audio = audio2;
    }else if(btn.id == "yellow"){
        audio = audio3;
    }else if(btn.id == "voilet"){
        audio = audio4;
    }
    userFlash(btn,audio);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor)
    console.log(userSeq)

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function highScore(level){
    let highScore = document.querySelector("#highScore");
    if(Hscore<level){
        Hscore = level;
    }
    highScore.innerText = `High Score is ${Hscore}`;
}

function reset(){
    startBtn.innerText = "Play Again"
    startBtn.style.fontSize = "1.5rem";
    startBtn.style.display = "block";
    startBtn.style.height = "4rem";
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function fun(){
        document.querySelector("body").style.backgroundColor = "black";
    }, 150);

    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
    startBtn.addEventListener("click",function(event){
        gOh1.style.display = "none";
        console.log("game stated");
        if(started == false){
        started = true;
        levelUp();
    }
    })
}

