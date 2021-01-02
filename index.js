let startButton = document.getElementById('start-button')
let grid =  document.querySelector('.grid')
let scoresDiv = document.getElementById('scores')
let scores = document.querySelectorAll(".score")
let hScore = document.getElementById("hScore")
let restartDiv = document.getElementById("restart")
let resBtn = document.getElementById("restart-button")
let finalStat = document.querySelector('.final')
let squares = []
let direction = 1
let highestScore =0
let currentScore =0
let appleIndex = 0
let interval = 400
let speed = 0.95
let currentSnake = [2,1,0]
let loop = null

// Creating grid
for(let i = 0; i<196 ; i++){
    let square = document.createElement('div')
    square.classList.add('square')
    squares.push(square)
    grid.append(square)
}


 function start() {
    grid.style.display = 'flex'
    startButton.style.background = 'lightblue' 
    startButton.style.color = 'black'  
    document.querySelector("#title").style.display = 'none' 
    scoresDiv.style.display = 'flex' 
    for(let square of currentSnake){
        squares[square].classList.add('snake')
    }
    setHead()
    setTail()
    appleGen()
    startButton.removeEventListener("click", start)
    startButton.classList.remove('hover')
    loop = setInterval(move,interval)

}

startButton.addEventListener("click", start)


function endGame(e){
    clearInterval(loop)
    startButton.style.background = 'rgba(0,0,0,0)'
    scoresDiv.style.display = 'none'
    restartDiv.style.display = 'flex'
    if(highestScore < currentScore){
        finalStat.classList.add('rainbow_text_animated')
    }
    resBtn.addEventListener("click", restart)

}

function restart(){
    startButton.style.background = 'lightblue' 
    startButton.style.color = 'black'
    direction = 1
    appleGen()
    interval = 400
    restartDiv.style.display = 'none'
    scoresDiv.style.display = 'flex'
    if(currentScore > highestScore) {
        highestScore = currentScore
        hScore.textContent = currentScore
    }
    for(let score of scores){score.textContent = 0}
    currentScore = 0
    for(let square of squares){square.classList.remove('snake')}
    currentSnake = [2,1,0]
    for(let square of currentSnake){
        squares[square].classList.add('snake')
    }
    setHead()
    setTail()
    loop = setInterval(move,interval)
    finalStat.classList.remove('rainbow_text_animated')
    resBtn.removeEventListener("click", restart)

}
function move(e) {
    
    let toMoveSquare = currentSnake[0] + direction
    if(((toMoveSquare+1)%14===0 && direction === -1)
    ||((toMoveSquare)%14===0 && direction === 1)
    ||(toMoveSquare < 0)
    ||(toMoveSquare > 195)
    ||squares[toMoveSquare].classList.contains('snake')
    ) return endGame(toMoveSquare)

    removeTail()
    const tail = currentSnake.pop()
    setTail()
    squares[tail].classList.remove('snake')
    removeHead()
    currentSnake.unshift(toMoveSquare)
    setHead()
    squares[toMoveSquare].classList.add('snake')

    if(appleIndex === currentSnake[0]){
        for(let score of scores){score.textContent = parseInt(score.textContent) + 1}
        currentSnake.push(tail)
        squares[tail].classList.add('snake')
        setTail()
        appleGen()
        currentScore++
        clearInterval(loop)
        interval *= speed
        loop = setInterval(move,interval)
    }

}

function appleGen() {
    for(let square of squares){
        square.classList.remove('apple')
    }
    do {
       appleIndex = Math.floor(Math.random()*196) 
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

document.addEventListener('keydown', e => {
    //console.log(e.code)
    if(e.code === 'ArrowUp' || e.code === 'KeyW' ){
        e.preventDefault()
        direction = -14
    }else if(e.code === 'ArrowDown' || e.code === 'KeyS'){
        e.preventDefault()
        direction = 14
    }else if(e.code === 'ArrowLeft' || e.code === 'KeyA'){
        e.preventDefault()
        direction = -1
    }else if(e.code === 'ArrowRight' || e.code === 'KeyD'){
        e.preventDefault()
        direction = 1
    }
})


function removeHead(){
    squares[currentSnake[0]].classList.remove('head-right')
    squares[currentSnake[0]].classList.remove('head-left')
    squares[currentSnake[0]].classList.remove('head-top')
    squares[currentSnake[0]].classList.remove('head-down')
}

function setHead(){
    removeHead()
    if(direction === 1){
        squares[currentSnake[0]].classList.add('head-right')
    }else if(direction === 14){
        squares[currentSnake[0]].classList.add('head-down')   
    }else if(direction === -14){
        squares[currentSnake[0]].classList.add('head-top')
    }else if(direction === -1){
        squares[currentSnake[0]].classList.add('head-left')
    }
}

function removeTail(){
    for(let x of currentSnake){squares[x].classList.remove('tail')}
}

function setTail(){
    removeTail()
    squares[currentSnake[currentSnake.length-1]].classList.add('tail')
}



