const container = document.querySelector(".image-container")
const startButton = document.querySelector(".gamestartbtn")
const gameTextCompleted = document.querySelector(".game-text-Completed")
const gameTextFall = document.querySelector(".game-text-Fall")
const playTime = document.querySelector(".play_time")
const btn = document.querySelector(".btn");
const hintButton = document.querySelector(".hintbtn");
const resetButton = document.querySelector(".resetbtn");
const exitButton = document.querySelector(".exitbtn");

const tileCount = 4;


var tiles = [];

const dragged ={
    el: null,
    class: null,
    index: null,
}

let isPlaying = false;
let timeInterval = null;
let time;
function check(){
    const currentList = [...container.children];
    const unMatchedList = currentList.filter((li, index) =>Number(li.getAttribute("data-index")) !== index)
    if (unMatchedList.length === 0){
        gameTextCompleted.style.display = "block";
        playTime.innerHTML="잘했어요! 본격적으로 시작해볼까요?"
        btn.style.display="block";
        isPlaying = false;
        clearInterval(timeInterval)
    }
}

function setGame(){
    isPlaying = true;
    time=40;
    container.innerHTML = "";
    gameTextCompleted.style.display = 'none';
    clearInterval(timeInterval);

    tiles = createImageTitles();
    tiles.forEach(tile=>container.appendChild(tile));
    shuffle(tiles).forEach(tile => container.appendChild(tile));
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
    var tmp;
    let index = array.length -1;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1))
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
        try {
            isLast ? originPlace.after(obj) : originPlace.before(obj);   
        } catch (error) {
            obj.className = dragged.className;
        }
    }
    check();
})
setGame();
shuffle(tiles).forEach(tile => container.appendChild(tile));
btn.addEventListener('click', function() {
    window.location.href="../stage1/timeS1.html";
});