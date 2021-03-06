import {game, adjustType, adjustDiff} from "./external.js";
import {startGame} from "./main.js";

// elements
const gameTypeEl = document.querySelector(".game-type span");
const gameTypeButtonEls = document.querySelectorAll(".game-type button");
const gameDiffEl = document.querySelector(".game-difficulty span");
const gameDiffButtonEls = document.querySelectorAll(".game-difficulty button");
const gameStartEl = document.querySelector(".menu > button");
const loadingEl = document.querySelector(".loading");
const timesEl = document.querySelector(".fa-times");

// main 
    // highlight selected elements
gameTypeButtonEls.forEach(element => {
    if(element.classList.contains("selected")){
        const targetColor = getComputedStyle(element).color;
        element.style.backgroundColor = targetColor;
        element.style.color = "white";
        if(!element.textContent.toLowerCase().includes("."))
        game.type = adjustType(element.textContent.trim().toLowerCase());
    }
})
gameDiffButtonEls.forEach(element => {
    if(element.classList.contains("selected")){
        const targetColor = getComputedStyle(element).color;
        element.style.backgroundColor = targetColor;
        element.style.color = "white";
    }
})

    // select clicked game type elements
gameTypeEl.addEventListener('click', (e) => {
    if(e.target.classList.contains("selected") || e.target.nodeName !== "BUTTON") return;

    const targetColor = getComputedStyle(e.target).color;
    e.target.style.backgroundColor = targetColor;
    e.target.style.color = "white";
    e.target.classList.add("selected"); 
    game.type = adjustType(e.target.textContent.toLowerCase().toLowerCase());

    gameTypeButtonEls.forEach(element => {
        if(element.textContent.trim() !== e.target.textContent.trim() && element.classList.contains("selected")){
            element.classList.remove("selected");

            const tempColor = getComputedStyle(element).backgroundColor;
            element.style.color = tempColor;
            element.style.backgroundColor = "white";
        }
    })
})

    // select clicked game difficulty elements
gameDiffEl.addEventListener('click', (e) => {
    if(e.target.classList.contains("selected") || e.target.nodeName !== "BUTTON") return;

    const targetColor = getComputedStyle(e.target).color;
    e.target.style.backgroundColor = targetColor;
    e.target.style.color = "white";
    e.target.classList.add("selected"); 

    switch(adjustDiff(e.target.textContent.toLowerCase())){
        case "easy":
            game.changeDifficulty("easy");
            break;
        case "normal":
            game.changeDifficulty("normal");
            break;
        case "hard":
            game.changeDifficulty("hard");
            break;
        default:
            game.changeDifficulty("easy");
    }

    gameDiffButtonEls.forEach(element => {
        if(element.textContent.trim() !== e.target.textContent.trim() && element.classList.contains("selected")){
            element.classList.remove("selected");

            const tempColor = getComputedStyle(element).backgroundColor;
            element.style.color = tempColor;
            element.style.backgroundColor = "white";
        }
    })
})

    // click start button 
gameStartEl.addEventListener('click', () => {
    gameStartEl.disabled = true;
    loadingEl.style.display = "inline-block";
    startGame();
    setTimeout(() => timesEl.style.display = "none", 500);

    setTimeout(() => gameStartEl.disabled = false, 2000)
})

document.onkeydown = (e) => {
    if(e.which === 13 && !game.hasStarted){
        gameStartEl.disabled = true;
        loadingEl.style.display = "inline-block";
        startGame();
        setTimeout(() => timesEl.style.display = "none", 500);

        setTimeout(() => gameStartEl.disabled = false, 2000)
    }
}