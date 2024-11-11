const douchegeluid = new Audio('regen.mp3');
const stopgeluid = new Audio('alarm.mp3');
const h1 = document.querySelector('h1');
const time = document.querySelector('time');
const start = document.querySelector('#start');
let douchetijd = localStorage.getItem('opgeslagen_douchetijd');
let doucheseconden = tijd_naar_seconden(douchetijd)

function tijd_naar_seconden(tijd) {
    return 60*parseInt(tijd.slice(0,2)) + parseInt(tijd.slice(3,5));
}

function seconden_naar_tijd(seconden) {
    let min = Math.floor(seconden / 60);
    if (min < 10) {
        min = '0' + String(min)
    } else {
        min = String(min)
    }
    let sec = seconden % 60;
    if (sec < 10) {
        sec = '0' + String(sec)
    } else {
        sec = String(sec)
    }
    return min + ':' + sec;
}

if (doucheseconden <= 600) {
    h1.textContent = 'Je doucht zo kort dat het zelfs niet nodig is om minder lang te douchen.';
    time.textContent = douchetijd;
} else {
    if (douchetijd.slice(3,5) === '00') {
        h1.textContent = 'Je doucht normaal gezien ' + String(parseInt(douchetijd.slice(0,2))) + ' minuten, nu moet je 10 procent korter douchen om minder water te verspillen.';
    } else {
        h1.textContent = 'Je doucht normaal gezien ' + String(parseInt(douchetijd.slice(0,2))) + ' minuten en ' + String(parseInt(douchetijd.slice(3,5))) + ' seconden, nu moet je 10 procent korter douchen om minder water te verspillen.';
    }
    doucheseconden = Math.round(doucheseconden * 0.9);
    time.textContent = seconden_naar_tijd(doucheseconden);
}

start.addEventListener('click', start_timer);
document.addEventListener('keydown', spatie);
function spatie(e) {
    if (e.code === 'Space') {
        start_timer();
    }
}
function start_timer() {
    start.removeEventListener('click', start_timer);
    document.removeEventListener('keydown', spatie);
    douchegeluid.play();
    let aftelseconden = doucheseconden;
    tel_af();
    const interval = setInterval(tel_af, 1000);
    function tel_af() {
        time.textContent = seconden_naar_tijd(aftelseconden);
        aftelseconden = aftelseconden - 1;
        if (aftelseconden < 0) {
            clearInterval(interval);
            start.addEventListener('click', start_timer);
            document.addEventListener('keydown', spatie);
            douchegeluid.pause()
            stopgeluid.play()
        }
    }
}