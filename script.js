const tekst = document.querySelector("h1");
const clickChangeButton = document.querySelectorAll("button")[0]
const intervalButton = document.querySelectorAll("button")[1]

const kleuren = ["red", "green", "blue", "yellow", "orange"];
const spreekKleuren = ["rood", "groen", "blauw", "geel", "oranje"];
const ledematen = [ "Rechterhand", "Linkerhand", "Linkervoet", "Rechtervoet"]

let nederlands = window.speechSynthesis.getVoices()[18];

document.addEventListener("click", kiesKleur);

intervalButton.addEventListener("click", function(){
    setInterval(kiesKleur, 5000)
    hideButtons()
})

clickChangeButton.addEventListener("click", hideButtons)

function kiesKleur(){
    let kleurIndex = Math.floor(Math.random() * kleuren.length)
    let kleur = kleuren[kleurIndex]

    let ledemaatIndex = Math.floor(Math.random() *ledematen.length)
    let ledemaat = ledematen[ledemaatIndex];
    let spreekKleur = spreekKleuren[kleurIndex];

    changeDisplay(kleur, ledemaat);
    spreek(spreekKleur, ledemaat);
}

function changeDisplay(color, limb){
    document.body.style.backgroundColor = color;
    tekst.textContent = limb;    
}

function spreek(color, limb){
    let uitspreken = limb + " op " + color;
    var msg = new SpeechSynthesisUtterance(uitspreken);
    msg.rate = 1;
    msg.pitch = 1;
    msg.lang = "NL";
    msg.voice = nederlands;
    msg.volume = 100;
    window.speechSynthesis.speak(msg);
}

function hideButtons(){
    document.querySelectorAll("button").forEach((button)=>{
        button.hidden = true;
    })
}