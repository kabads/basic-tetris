document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId

  // The tetriminoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2+2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
     [0,width,width+1,width*2+1],
     [width+1, width+2,width*2,width*2+1],
     [0,width,width+1,width*2+1],
     [width+1, width+2,width*2,width*2+1]
   ]

   const tTetromino = [
     [1,width,width+1,width+2],
     [1,width+1,width+2,width*2+1],
     [width,width+1,width+2,width*2+1],
     [1,width,width+1,width*2+1]
   ]

   const oTetromino = [
     [0,1,width,width+1],
     [0,1,width,width+1],
     [0,1,width,width+1],
     [0,1,width,width+1]
   ]

   const iTetromino = [
     [1,width+1,width*2+1,width*3+1],
     [width,width+1,width+2,width+3],
     [1,width+1,width*2+1,width*3+1],
     [width,width+1,width+2,width+3]
   ]
  const theTetriminoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  // randomly select a Tetrimino and its first rotation
  let random = Math.floor(Math.random()*theTetriminoes.length)

  let current = theTetriminoes[random][currentRotation]

  // draw the first tetrimino
  function draw(){
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetrimino')
    })
  }

// undraw the Tetrimino
function undraw(){
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetrimino')
  })
}

// make the tetrimino move down every second
// timerId = setInterval(moveDown, 500) // This number is set to 500 for debugging to make the tetriminoes fall faster

// assign functions to keycodes
function control(e){
  if(e.keyCode === 37){
  moveLeft()
  } else if (e.keyCode === 38){
    rotate()
  } else if (e.keyCode === 39){
    moveRight()
  } else if (e.keyCode === 40) {
    moveDown()
  }
}
document.addEventListener('keyup', control)

//moveDown function
function moveDown(){
  undraw()
  currentPosition += width
  draw()
  freeze()
}

// freeze function
function freeze(){
  if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index=> squares[currentPosition + index].classList.add('taken'))
    //start a new tetrimino
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetriminoes.length)
    current = theTetriminoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
  }
}


// move the tetrimino left, unless it is at the edge or there is a blockage
function moveLeft(){
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index ) % width === 0)
  if(!isAtLeftEdge) currentPosition -=1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }
  draw()
}
// move the tetrimino right, unless it is at the edge or there is a blockage
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index ) % width === width -1)
  if(!isAtRightEdge) currentPosition +=1

  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}

// rotate the tetriminoes
function rotate(){
  undraw()
  currentRotation ++
  if (currentRotation  === current.length){ // if the current rotation gets to 4 make it go back to 0
    currentRotation = 0
  }
  current = theTetriminoes[random][currentRotation]
  draw()
}

// show up-next tetrimino in mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0


// the tetriminoes without rotations
const upNextTetriminoes = [
  [1, displayWidth+1, displayWidth*2+1,2], // LTetrimino
  [0, displayWidth, displayWidth+1, displayWidth*2+1], // z tetrimino
  [1, displayWidth, displayWidth+1, displayWidth+2], // t tetrimino
  [0, 1, displayWidth, displayWidth+1], // o tetrimino
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // i tetrimino
]

// display the shape in the mini grid

function displayShape() {
  // remove any trace af a tetrimino from the entire grid
  displaySquares.forEach(square => {
    square.classList.remove('tetrimino')
  })
upNextTetriminoes[nextRandom].forEach(index => {
  displaySquares[displayIndex + index].classList.add('tetrimino')
})
}

// add functionality to the button
startBtn.addEventListener('click', () => {
  if(timerId){
    clearInterval(timerId)
    timerId = null
  } else {
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random()*theTetriminoes.length)
    displayShape()

  }
})



})
