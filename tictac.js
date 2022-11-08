let audioTurn = new Audio('click.wav')



let turn = 'X'
let gameover = false;

const  changeTurn = () =>{
    return turn === 'X' ? '0' : 'X'
}


const checkWin = () =>{
    let boxtexts = document.querySelectorAll('.boxtext')
    let win = [
        [0,1,2,2,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-6,15,90],
        [1,4,7,1,15,90],
        [2,5,8,14,15,90],
        [0,4,8,1,15,45],
        [2,4,6,5,15,135],
    ]
    win.forEach((e) =>{
        if(boxtexts[e[0]].innerHTML === boxtexts[e[1]].innerHTML && boxtexts[e[1]].innerHTML === boxtexts[e[2]].innerHTML && boxtexts[e[0]].innerHTML !== '' ){
            document.querySelector('.info').innerHTML = boxtexts[e[0]].innerHTML + ' won'
            gameover = true
            const cont = document.querySelector('.gameContainer')
            let width = cont.offsetWidth
          
            if(width > 1000){
            document.querySelector('img').style.width = '156px'
            document.querySelector('.line').style.width = '22vw'
            document.querySelector('.line').style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
        }else{
            document.querySelector('img').style.width = '156px'
        }
        
        }
        })
}
//game logic
 
const box = document.querySelectorAll('.box')


box.forEach(element => {
   
    let boxtext = element.querySelector('.boxtext')
    element.addEventListener('click',()=>{
        if(boxtext.innerHTML === ''){
            boxtext.innerHTML = turn
            turn = changeTurn()
            audioTurn.play()
            checkWin()
            if(gameover == false){
            document.querySelector('.info').innerHTML = `${turn}'s turn`
            
        }
    }
    })
});

const reset = document.querySelector('#reset')

reset.addEventListener('click',() =>{
    
    const boxtexts = document.querySelectorAll('.boxtext')
    boxtexts.forEach(e=>{
        
        e.innerHTML = ''
    })
    turn = 'X'
    gameover = false
    document.querySelector('.line').style.width = '0px'
    document.querySelector('.info').innerHTML = `${turn}'s turn`
    document.querySelector('img').style.width = '0px'

})


const input = document.querySelector('.input')
const body = document.querySelector('body')

input.checked = JSON.parse(localStorage.getItem('mode'))

input.addEventListener('input',() =>{
    updateBody()
    updateLocalStorage()
})

updateBody()
function updateBody() {
    if(input.checked){
        body.style.backgroundColor = 'black'
        document.querySelectorAll('.box').forEach(e=>{
            e.classList.add('toggle')
        })
        document.querySelectorAll('.boxtext').forEach(e=>{
            e.classList.add('white')
        })
        document.querySelector('.gameInfo').classList.add('toggle')
    }else{
        body.style.backgroundColor = 'black'
        document.querySelectorAll('.box').forEach(e=>{
            e.classList.remove('toggle')
        })
        document.querySelectorAll('.boxtext').forEach(e=>{
            e.classList.remove('white')
        })
        document.querySelector('.gameInfo').classList.remove('toggle')
        body.style.background = 'white'
    }
}

function updateLocalStorage(){
    localStorage.setItem('mode',JSON.stringify(input.checked))
}
