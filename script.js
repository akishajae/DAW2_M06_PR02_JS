
// EXERCICI 3

showTable();

function showTable() {
    let table = document.getElementById("taula_propietats");

    table.innerHTML = `
    <table>
        <tbody>
            <tr>
                <td>Valor máxim que pot tenir un número JS
                </td>
                <td>` + Number.MAX_VALUE + `</td>
            </tr>
            <tr>
                <td>Altura total de la pantalla</td>
                <td>` + screen.height + `</td>
            </tr>
            <tr>
                <td>Altura interna de la finestra</td>
                <td>`+ window.innerHeight + `</td>
            </tr>
            <tr>
                <td>URL de la web</td>
                <td>` + document.URL + `</td>
            </tr>
        </tbody>
    </table>`;
}

// EXERCICI 4

let timer;
let total_sec = 0;
let is_paused = false;

const start_btn = document.getElementById("start_btn");
const pause_btn = document.getElementById("pause_btn");
const continue_btn = document.getElementById("continue_btn");
const reset_btn = document.getElementById("reset_btn");
const stop_btn = document.getElementById("stop_btn");

const input_min = document.getElementById("min");
const input_sec = document.getElementById("sec");
const timer_display = document.getElementById("timer_display");
const alarm_sound = document.getElementById("alarm_sound");

// buttons off state

if (total_sec === 0) {
    pause_btn.style.display = 'none';
    continue_btn.style.display = 'none';
    reset_btn.style.display = 'none';
}

//start timer

function startTimer() {
    const min = parseInt(input_min.value) || 0;
    const sec = parseInt(input_sec.value) || 0;

    total_sec = min * 60 + sec;
    if (total_sec > 0) {
        is_paused = false;
        timer = setInterval(endTimer, 1000);
        start_btn.disabled = true;

        pause_btn.style.display = 'inline';
        reset_btn.style.display = 'inline';
    }
}

// end timer

function endTimer() {
    if ((total_sec > 0) && (!is_paused)) {
        total_sec--;
        displayTime();
    } else if (total_sec === 0) {
        clearInterval(timer);
        alarm_sound.play();
        stop_btn.style.display = 'block';
    }
}

// display time

function displayTime() {
    const min = Math.floor(total_sec / 60);
    const sec = total_sec % 60;
    timer_display.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// pause

function pauseTimer() {
    is_paused = true;

    pause_btn.style.display = 'none';
    continue_btn.style.display = 'inline';

}

// continue

function continueTimer() {
    is_paused = false;

    continue_btn.style.display = 'none';
    pause_btn.style.display = 'inline';
}

// reset

function resetTimer() {
    clearInterval(timer);
    total_sec = 0;
    displayTime();
    start_btn.disabled = false;
    is_paused = false;

    pause_btn.style.display = 'none';
    continue_btn.style.display = 'none';
    reset_btn.style.display = 'none';
}

// stop

if (start_btn.disabled == false) {
    stop_btn.style.display = 'none';
}

function stopAlarm() {
    alarm_sound.pause();
    alarm_sound.currentTime = 0;
    stop_btn.style.display = 'none';

    resetTimer();
}

start_btn.addEventListener("click", startTimer);
pause_btn.addEventListener("click", pauseTimer);
continue_btn.addEventListener("click", continueTimer);
reset_btn.addEventListener("click", resetTimer);
stop_btn.addEventListener("click", stopAlarm);



// EXERCICI 5
showClock();

function showClock() {
    const time = new Date();

    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    hour = checkTime(hour);
    min = checkTime(min);
    sec = checkTime(sec);

    document.getElementById("clock").innerHTML = hour + ":" + min + ":" + sec;
    setInterval(showClock, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

// ALARM
let alarm_time = null;
let alarm_timeout = null;

const save_btn = document.getElementById("save_btn");
const delete_btn = document.getElementById("delete_btn");
const stop_btn_2 = document.getElementById("stop_btn_2");


const play_sound_btn = document.getElementById("play_sound_btn");
const stop_sound_btn = document.getElementById("stop_sound_btn");
const sound = document.getElementById("sound");

const audio = document.getElementById("audio");
const vol_ctrl = document.getElementById("vol_ctrl");

const input_time = document.getElementById("alarm_time");
const alarm_saved = document.getElementById("alarm_saved");

// buttons off state
window.onload = function () {
    stop_btn_2.style.display = 'none';
    delete_btn.style.display = 'none';
    stop_sound_btn.style.display = 'none';
}

// alarm sound

function playSound() {
    audio.src = sound.value;
    audio.volume = vol_ctrl.value;
    audio.play();

    stop_sound_btn.style.display = 'inline';
    play_sound_btn.style.display = 'none';
}

function stopSound() {
    audio.pause();
    audio.currentTime = 0;

    stop_sound_btn.style.display = 'none';
    play_sound_btn.style.display = 'inline';
}

play_sound_btn.addEventListener("click", playSound);
stop_sound_btn.addEventListener("click", stopSound);

// alarm volume

// executed each time "input" event is triggered
vol_ctrl.addEventListener("input", (e) => {
    // get the current value of slider
    audio.volume = e.target.value;
});

// set alarm

function selectTime() {
    const selected_time = input_time.value;

    // pop-up alert: not selected time
    if (!selected_time) {
        alert("Error. Selecciona una hora per a l'alarma.");
        return;
    }

    // array destructuring          string representing HH:MM   converts to number
    const [alarm_hour, alarm_minute] = selected_time.split(":").map(Number);
    const now = new Date();

    alarm_time = new Date();
    alarm_time.setHours(alarm_hour, alarm_minute, 0, 0);

    let time_difference = alarm_time.getTime() - now.getTime();

    // alarm for next day
    if (time_difference < 0) {
        time_difference += 24 * 60 * 60 * 1000; //adds 24h in milisecons
    }

    // set timeout for alarm
    alarm_timeout = setTimeout(() => {
        audio.src = sound.value;
        audio.volume = vol_ctrl.value;
        audio.play();

        stop_btn_2.style.display = 'inline';
        delete_btn.style.display = 'none';
    }, time_difference);

    save_btn.style.display = 'none';
    delete_btn.style.display = 'inline';

    alarm_saved.style.display = 'inline';
    alarm_saved.textContent = `Tens una alarma a aquesta hora: ${selected_time}.`;
}

save_btn.addEventListener("click", selectTime);

// delete alarm

function deleteAlarm() {

    clearTimeout(alarm_timeout);
    alarm_timeout = null;

    audio.pause();
    audio.currentTime = 0;

    alarm_saved.style.display = 'none';
    stop_btn_2.style.display = 'none';
    delete_btn.style.display = 'none';
    save_btn.style.display = 'inline';
}

delete_btn.addEventListener("click", deleteAlarm);


// stop alarm

stop_btn_2.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;

    stop_btn_2.style.display = 'none';
    delete_btn.style.display = 'inline';
});
