const tekst = document.querySelector("h1");
const clickChangeButton = document.querySelectorAll("button")[0];
const easyIntervalButton = document.querySelectorAll("button")[1];
const mediumIntervalButton = document.querySelectorAll("button")[2];
const hardIntervalButton = document.querySelectorAll("button")[3];

const kleuren = ["red", "green", "blue", "yellow", "orange"];
const spreekKleuren = ["rood", "groen", "blauw", "geel", "oranje"];
const ledematen = [ "Rechterhand", "Linkerhand", "Linkervoet", "Rechtervoet"]

let vorigeKeuze = 0;
let mySpeech;

function setSpeech() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}

let s = setSpeech();
s.then((voices) => {
    voices.forEach(voice => {
        if (voice.lang == "nl-NL"){
            console.log("speech gezet naar =>", voice.name);
            mySpeech = voice;
        }
    })
    if(!mySpeech){
        mySpeech = voices[0];
        console.log("Beperkte talen in de browser, " + voices[0].lang + " is gekozen");
    }
});


easyIntervalButton.addEventListener("click", function(){
    setDificulty(5000);
})

mediumIntervalButton.addEventListener("click", function(){
    setDificulty(3000);
})

hardIntervalButton.addEventListener("click", function(){
    setDificulty(1800);
})

function setDificulty(dificulty){
    hideButtons();
    showLimbs();
    kiesKleur();
    setInterval(kiesKleur, dificulty);
}

clickChangeButton.addEventListener("click", function(){  
    document.addEventListener("click", kiesKleur);
    hideButtons();
    showLimbs();
})

function kiesKleur(){
    let kleurIndex = Math.floor(Math.random() * kleuren.length)
    let kleur = kleuren[kleurIndex]

    let ledemaatIndex = Math.floor(Math.random() *ledematen.length);   

    while (ledemaatIndex == vorigeKeuze){
        ledemaatIndex = Math.floor(Math.random() * ledematen.length); 
    }

    vorigeKeuze = ledemaatIndex;
    let ledemaat = ledematen[ledemaatIndex];
    let spreekKleur = spreekKleuren[kleurIndex];

    changeDisplay(kleur, ledemaat);
    changeLimbDisplay(kleur, ledemaatIndex)
    spreek(spreekKleur, ledemaat);
}

function changeDisplay(color, limb){
    document.body.style.backgroundColor = color;
    tekst.textContent = limb;  
}

function changeLimbDisplay(color, limbIndex) {
    document.querySelectorAll(".limb")[limbIndex].style.borderColor = color;
}

function spreek(color, limb){
    let uitspreken = limb + " op " + color;
    var msg = new SpeechSynthesisUtterance(uitspreken);
    msg.rate = 1;
    msg.pitch = 1;
    // msg.lang = "nl-NL";
    msg.lang = "nl-NL";
    msg.voice = mySpeech;
    msg.volume = 100;
    window.speechSynthesis.speak(msg);
}

function hideButtons(){
    document.querySelectorAll("button").forEach((button)=>{
        button.hidden = true;
    })
}

function showLimbs(){
    document.querySelectorAll(".limb").forEach((limb)=> {
        limb.style.opacity = 1
    })
}