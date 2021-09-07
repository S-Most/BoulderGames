const body = document.body;
const tekst = document.querySelector("h1");

const kleuren = ["red", "green", "blue", "yellow", "orange"];
const ledematen = [ "Rechterhand", "Linkerhand", "Linkervoet", "Rechtervoet"]

document.addEventListener("click", kiesKleur);

function kiesKleur(){
    let kleurIndex = Math.floor(Math.random() * kleuren.length)
    let kleur = kleuren[kleurIndex]

    let ledemaatIndex = Math.floor(Math.random() *ledematen.length)
    let ledemaat = ledematen[ledemaatIndex]

    changeDisplay(kleur, ledemaat)
    
}

function changeDisplay(color, handfeet){
    body.style.backgroundColor = color;
    tekst.textContent = handfeet;
}