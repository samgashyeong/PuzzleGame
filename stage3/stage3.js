const container = document.querySelector(".image-container");  
const startButton = document.querySelector(".gamestartbtn");
const gameTextCompleted = document.querySelector(".game-text-Completed");
const gameTextFall = document.querySelector(".game-text-Fall");
const playTime = document.querySelector(".play_time");
const btn = document.querySelector(".btn");

const tileCount = 25;


var tiles = [];
var musicBg = new Audio('stage3.mp3');
var sansE = new Audio('Sans Sound.mp3');
const dragged ={
    el: null,
    class: null,
    index: null,
}

let isPlaying = false;
let timeInterval = null;
let time;

function music(){
    musicBg.play();
}
function check(){
    const currentList = [...container.children];
    const unMatchedList = currentList.filter((li, index) =>Number(li.getAttribute("data-index")) !== index);
    if (unMatchedList.length === 0){
        gameTextCompleted.style.display = "block";
        let timer2 = setInterval(function(){
            musicBg.pause();
            sansE.play();
        }, 100)
        let timer1 = setInterval(function(){
            window.location.href="../finish/finishgame.html";
        }, 5000)
        isPlaying = false;
        clearInterval(timeInterval);
    }

}

function setGame(){
    isPlaying = true;
    time=120;
    container.innerHTML = "";
    gameTextCompleted.style.display = 'none';
    clearInterval(timeInterval);
    tiles = createImageTitles();
    tiles.forEach(tile=>container.appendChild(tile));
    setTimeout(()=>{
        container.innerHTML = "";
        shuffle(tiles).forEach(tile => container.appendChild(tile));
        timeInterval = setInterval(()=>{
            playTime.innerText = Math.floor(time*100)/100;
            time.toFixed(2);
            time-=0.01;
            if(time<=0){
                console.log(time);
                isPlaying=false;
                window.location.href="endgame_3.html"
                clearInterval(timeInterval);
            }
            if(time<=5){
                playTime.style.color="red";
            }
        }, 10)
    },2000)
}

function createImageTitles(){
    const tempArray = [];
    for(var i=0;i<tileCount;i++){
        const li = document.createElement("li")
        li.setAttribute('data-index', i)
        li.setAttribute('draggable', 'true');
        li.classList.add('list'+i);
        tempArray.push(li)
    }
    return tempArray;
}


function shuffle(array){
    let tmp;
    let index = array.length -1;
    let a= 3;
    while(index > 0){
        let randomIndex = Math.floor(Math.random()*(index+1))
        tmp=array[index];
        array[index]=array[randomIndex]
        array[randomIndex]=tmp;
        index--;
    }
    return array;
}

container.addEventListener('dragstart', e=>{
    if(!isPlaying) return;
    console.log(e)
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj);
})

container.addEventListener('dragover', e =>{
    e.preventDefault();
})

container.addEventListener('drop', e =>{
    if(!isPlaying) return;
    const obj = e.target;
    console.log('dropped')

    let originPlace;
    let isLast = false;

    if (obj.className !== dragged.class) {
        if (dragged.el.nextSibling) {
            originPlace = dragged.el.nextSibling
        }
        else {
            originPlace = dragged.el.previousSibling
            isLast = true;
        }
        const droppedIndex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
        isLast ? originPlace.after(obj) : originPlace.before(obj);
    }
    check();
})
setGame();
shuffle(tiles).forEach(tile => container.appendChild(tile));