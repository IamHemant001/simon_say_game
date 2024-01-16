let gameSeq = [];
let userSeq = [];
let Hscore = 0;
let h2 = document.querySelector("h2")
let btns = ["green","red","yellow","voilet"]

let started = false;
let level = 0;

document.addEventListener("keypress",function(event){
    if(event.key == "Enter" && started == false){
        console.log("game stated");
        started = true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("gameflash");

    setTimeout(function(){
        btn.classList.remove("gameflash")
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash")
    },300);
}

function levelUp(){
    level ++
    userSeq = []

    h2.innerText = `Level ${level}`
    
    let randIdx = Math.floor(Math.random() *3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq)

    gameFlash(randBtn);
}

function checkAns(idx){
    console.log(`current level ${level}`)

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML = `Game over! <br>Your <b>score<b> was <b> ${level}<b> <br>Press 'enter' to start the game again`;
        highScore(level);
        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);

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
    document.querySelector("body").style.backgroundColor = "rgb(239, 19, 19)";
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
    document.addEventListener("keypress",function(event){
        document.querySelector("body").style.backgroundColor = "rgba(249, 78, 197, 0.4)";
        if(event.key == "Enter" && started == false){
        console.log("game stated");
        started = true;

        levelUp();
    }
    })
}



