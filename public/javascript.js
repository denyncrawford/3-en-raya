
var socket = io();

let turno = 0;
let tablero = [];
const player = document.querySelector("#player");

const btnPulsado = async (e, pos) =>{
    turno ++;
    const btn = document.querySelector(`#${e}`);
    const color = turno % 2 ?'salmon':'paleGreen' ;
    const payerName = !(turno % 2) ?'salmon':'paleGreen';
    btn.style.backgroundColor = color;
    player.innerHTML = `Es turno de ${payerName}`
    tablero[pos] = color;
    if(haGanado()) {
        alert('enorabuena player ' + color);
        socket.emit('reset');
    }
}

const haGanado = () =>{
    if(tablero[0] == tablero [1] && tablero[0] == tablero[2] && tablero[0]){
        return true;

    } else if (tablero[3] == tablero [4] && tablero[3] == tablero[5] && tablero[3]){
        return true;

    } else if (tablero[6] == tablero [7] && tablero[6] == tablero[8] && tablero[6]){
        return true;

    } else if (tablero[0] == tablero [3] && tablero[0] == tablero[6] && tablero[0]){
        return true;

    } else if (tablero[1] == tablero [4] && tablero[1] == tablero[7] && tablero[1]){
        return true;

    } else if (tablero[2] == tablero [5] && tablero[2] == tablero[8] && tablero[2]){
        return true;

    } else if (tablero[0] == tablero [4] && tablero[0] == tablero[8] && tablero[0]){
        return true;

        
    } else if (tablero[2] == tablero [4] && tablero[2] == tablero[6] && tablero[2]){
        return true;
    }
    return false;
}


document.querySelectorAll('button').forEach((obj, i) => obj.addEventListener('click',(e) => socket.emit('button', {id: e.target.id, pos: i})));

socket.on('button', ({id, pos}) => {
    btnPulsado(id, pos);
})

socket.on('reset', () => {
    tablero = [];
    turno = 0;
    document.querySelectorAll('button').forEach((obj, i) => obj.style.backgroundColor = 'white');
    player.innerHTML = 'Es turno de salmon';
})