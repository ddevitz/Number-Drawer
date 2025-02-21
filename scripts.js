
const quantityNumbers = document.getElementById("qtd-numbers");
const initialNumber = document.getElementById("initial-number");
const finalNumber = document.getElementById("final-number");

const noRepeatNumber = document.getElementById("no-repeat");
const btnRaffle = document.getElementById("btn-raffle");
const btnRefresh = document.getElementById("btn-refresh");
const turn = document.getElementById("turn");

const screenOne = document.querySelector(".screen-1");
const screenTwo = document.querySelector(".screen-2");
const result = document.querySelector(".result")

let nDraws = 0
let startNumber = 0
let endNumber = 0
let turns = 0

let results = [];

quantityNumbers.addEventListener("input", () =>{
  quantityNumbers.value = quantityNumbers.value.replace(/\D/g, ""); // Remove qualquer não número
  nDraws = parseInt(quantityNumbers.value)
})

initialNumber.addEventListener("input", () =>{
  initialNumber.value = initialNumber.value.replace(/\D/g, "");
  startNumber = parseInt(initialNumber.value)
})

finalNumber.addEventListener("input", () =>{
  finalNumber.value = finalNumber.value.replace(/\D/g, "");
  endNumber = parseInt(finalNumber.value)
})

noRepeatNumber.addEventListener("click", () =>{
  noRepeatNumber.classList.toggle("active")
})

btnRaffle.addEventListener("click", () => {
  if(noRepeatNumber.classList.contains("active")){
    singleDrawNumber(nDraws, startNumber, endNumber)
  } else {
    drawNumber(nDraws, startNumber, endNumber)
  }

  turns += 1

  showScreen()
})

btnRefresh.addEventListener("click", () =>{
  disappearScreen()

})

function drawNumber(nDraws, startNumber, endNumber){

  if(startNumber > endNumber){
    alert("O valor inicial não pode ser maior que o valor final.")
    return
  }

  for (let i = 0; i < nDraws; i++){
    let randomNumber = Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
       
    results.push(randomNumber);
  }

  return Array(results)
}

function singleDrawNumber(nDraws, startNumber, endNumber){
  if(startNumber > endNumber){
    alert("O valor inicial não pode ser maior que o valor final.")
    return
  }

  let rangeSize = endNumber - startNumber + 1;

  if (nDraws > rangeSize){
    alert(`Não é possível sortear ${nDraws} números únicos entre ${startNumber} e ${endNumber}.`)
    return
  }

  results = new Set();

  while (results.size < nDraws){
    let randomNumber = Math.floor(Math.random() * rangeSize) + startNumber;
    results.add(randomNumber);
  }
  
  console.log(Array.from(results))
}

function showScreen(){
  screenOne.classList.add("hide")
  screenTwo.classList.remove("hide")

  turn.textContent = `${turns}º resultado`

  for(let i = 0; i < results.length; i++){

    const drawnNumber = document.createElement("div")
    drawnNumber.classList.add("number")
    result.append(drawnNumber)
    
    drawnNumber.textContent = results[i]
  }
}

function disappearScreen(){
  screenOne.classList.remove("hide")
  screenTwo.classList.add("hide")

  results = [];
}

