const tekst = document.querySelector("h1");
const easyIntervalButton = document.querySelectorAll("button")[0];
const mediumIntervalButton = document.querySelectorAll("button")[1];
const hardIntervalButton = document.querySelectorAll("button")[2];
const soundIcon = document.querySelector(".soundIcon")

const ledematen = [ "Rechterhand", "Linkerhand", "Rechtervoet", "Linkervoet"]
const kleuren = ["green", "yellow", "orange", "blue", "red"];
const spreekKleuren = ["groen", "geel", "oranje", "blauw", "rood"];
let huidige_kleuren = [];

let limb_on_color = {
    Rechterhand: "anywhere",
    Linkerhand: "anywhere",
    Linkervoet: "anywhere",
    Rechtervoet: "anywhere",
}

let vorigeKeuze = 0;
let mySpeech;
let myRate = 1;
let setSound = true;

function setSpeech() {
    return new Promise((resolve) =>{

        id = setInterval(() => {
            if (window.speechSynthesis.getVoices().length !== 0) {
                resolve(window.speechSynthesis.getVoices());
                clearInterval(id);
            }
        }, 10);
    })
}

let s = setSpeech();
s.then((voices) => {
    // console.log(voices)
    voices.forEach(voice => {
        if (voice.lang == "nl-NL"){
            console.log("speech gezet naar =>", voice.name);
            mySpeech = voice;
        }
    })
    if(!mySpeech){
        mySpeech = voices[0];
        console.log("Beperkte talen in de browser, " + voices[0].name + " is gekozen");
    }    
});

soundIcon.addEventListener("click", () => {
    if (soundIcon.innerHTML == "🔈"){
        soundIcon.innerHTML = "🔊";
        setSound = true;
    } else {
        soundIcon.innerHTML = "🔈";
        setSound = false;
    }
})

// Set mode(more colors is harder)
easyIntervalButton.addEventListener("click", () => {
    huidige_kleuren = kleuren.splice(0, 3)
    document.body.addEventListener("click", (e) => {
        kiesKleur(e)
    });
    hideButtons();
    showLimbs();
})

mediumIntervalButton.addEventListener("click", () => {
    huidige_kleuren = kleuren.splice(0, 4)
    document.body.addEventListener("click", (e) => {
        kiesKleur(e)
    });
    hideButtons();
    showLimbs();
})

hardIntervalButton.addEventListener("click", () => {
    huidige_kleuren = kleuren
    document.body.addEventListener("click", (e) => {
        kiesKleur(e)
    });
    hideButtons();
    showLimbs();
})

// Select random color and limb
function kiesKleur(event){
    
    let ledemaatIndex = Math.floor(Math.random() * ledematen.length);   
    
    while (ledemaatIndex == vorigeKeuze){
        ledemaatIndex = Math.floor(Math.random() * ledematen.length); 
    }
    vorigeKeuze = ledemaatIndex;
    let ledemaat = ledematen[ledemaatIndex];

    let kleurIndex = Math.floor(Math.random() * huidige_kleuren.length)
    let kleur = huidige_kleuren[kleurIndex]

    let huidige_kleur = limb_on_color[ledemaat]
    while (huidige_kleur == kleur || (kleur == "red" &&  (ledemaatIndex == 2 || ledemaatIndex == 3))) {
        kleurIndex = Math.floor(Math.random() * huidige_kleuren.length)
        kleur = huidige_kleuren[kleurIndex]
    }

    let spreekKleur = spreekKleuren[kleurIndex];


    // Change Fixed Limb
    if (event.target.classList.contains("limb")){
        let index = 0;

        if (!event.target.classList.contains("right")) {
            index += 1
        }
        if (!event.target.classList.contains("arm")){
            index += 2
        }

        ledemaatIndex = index
        ledemaat = ledematen[index]
    }

    limb_on_color[ledemaat] = kleur;
    changeDisplay(kleur, ledemaat);
    changeLimbDisplay(kleur, ledemaatIndex)
    if (setSound){
        spreek(spreekKleur, ledemaat);
    }
}

function changeDisplay(color, limb){
    document.body.style.backgroundColor = color;
    tekst.textContent = limb;  
}

function changeLimbDisplay(color, limbIndex) {
    document.querySelectorAll(".limb")[limbIndex].style.background = color;
}

function spreek(color, limb){
    let uitspreken = limb + " op " + color;
    var msg = new SpeechSynthesisUtterance(uitspreken);
    msg.rate = myRate;
    msg.pitch = 1;
    msg.lang = "nl-NL";
    msg.voice = mySpeech;
    msg.volume = 100;
    window.speechSynthesis.speak(msg);
}

function hideButtons(){
    document.querySelectorAll("button").forEach((button)=>{
        button.hidden = true;
    })
    document.querySelector("img").hidden = true;
}

function showLimbs(){
    document.querySelectorAll(".limb").forEach((limb)=> {
        limb.style.opacity = 1
    })
}