document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10

  // The tetriminoes
  const lTetrimino = [
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
  const theTetriminoes = [lTetrimino, zTetromino, tTetromino, oTetromino, iTetromino]

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
timerId = setInterval(moveDown, 500) // This number is set to 500 for debugging to make the tetriminoes fall faster

// assign functions to keycodes

function control(e){
  if(e.keyCode === 37)
  moveLeft()
}

document.addEventListener()

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
    random = Math.floor(Math.random() * theTetriminoes.length)
    current = theTetriminoes[random][currentRotation]
    currentPosition = 4
    draw()
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

})
