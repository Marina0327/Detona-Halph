const state ={
    view:
    { 
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },        
    values:
    {
        gameVelocity: 1000,
        hitposition:0,
        result:0,
        curretTime:10,
    },  
    actions:
    {
        timerId: setInterval(randomSquare, 1000),
        coutDownTimerId: setInterval(countDown, 1000),
    }
}
function countDown()
{
    state.values.curretTime--;
    state.view.timeleft.textContent= state.values.curretTime;

    if (state.values.curretTime<=0)
    {
        clearInterval(state.actions.coutDownTimerId)
        clearInterval(state.actions.timerId)
        alert("GAME OVER!! SEU RESULTADO FOI " + state.values.result);
    }
}
function playSound(audioName)
{
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume= 0.2;
    audio.play();
}
// Sortear um quadrado para adicionar o "inimigo"
function randomSquare()
{
    state.view.squares.forEach((square) =>
    {
        square.classList.remove("enemy"); // inicialmente ninguém iniciar com o inimigo
    });

    let randomNumber = Math.floor(Math.random()*9); // sortear um numero de 1 a 9
    let randomSquare = state.view.squares[randomNumber]; // "pegar o quadrado conforme o número que foi sorteado"
    randomSquare.classList.add("enemy"); // Adicionando a imagem/ classe do "inimigo"
    state.values.hitposition = randomSquare.id;
}
function addListenerHitBox()
{
    state.view.squares.forEach((square) =>
    {
        square.addEventListener("mousedown", ()=>{
        if(square.id=== state.values.hitposition)
        {
            state.values.result++
            state.view.score.textContent= state.values.result;
            state.values.hitposition=null;
            playSound("hit");
        }    
       
    })
    } );
}
function init()
{
    addListenerHitBox();
}
init();