function fullscreen() {
    if (document.getElementById('body').classList.contains('p-40')) {
        document.getElementById('body').classList.remove('p-40');
        document.getElementById('body').classList.add('p-10');
        document.getElementById('wrapper').classList.remove('rounded-lg');
        document.getElementById('sidebar').classList.add('dissappear');
        document.getElementById('timeControl').classList.remove('flex-1');
        document.getElementById('totalAndQueue').classList.add('flex-1');
        document.getElementById('output').classList.add('text-6xl');
        document.getElementById('addGrid').classList.remove('grid-cols-3');
        document.getElementById('addGrid').classList.add('grid-cols-2');
    } else {
        document.getElementById('body').classList.remove('p-10');
        document.getElementById('body').classList.add('p-40');
        document.getElementById('wrapper').classList.add('rounded-lg');
        document.getElementById('sidebar').classList.remove('dissappear');
        document.getElementById('timeControl').classList.add('flex-1');
        document.getElementById('totalAndQueue').classList.remove('flex-1');
        document.getElementById('output').classList.remove('text-6xl');
        document.getElementById('addGrid').classList.remove('grid-cols-2');
        document.getElementById('addGrid').classList.add('grid-cols-3');
    }
}

function toggleTimer() {
    const btn = document.getElementById('toggleTimer')
    if (btn.classList.contains('initial')) {
        btn.innerHTML = 'Stop Timer';
        btn.classList.remove('initial');
        timer(intervals[0])
    } else {
        btn.innerHTML = 'Start Timer';
        btn.classList.add('initial');
        clearInterval(clock);
        document.getElementById('output').innerHTML = parseSecs(0);
    }
}

function addInterval(interval) {
    intervals.push(interval)
    printIntervals()
}

async function useralert() {
    if (config.alertSound === true) {
        const player = document.getElementById('alertSoundPlayer');
        player.play();
    }
    if (config.alertFlash === true) {
        const wrapper = document.getElementById('wrapper');
        wrapper.classList.add('bg-red-600');
        await sleep(0.5)
        wrapper.classList.remove('bg-red-600');
        await sleep(0.5)
        wrapper.classList.add('bg-red-600');
        await sleep(0.5)
        wrapper.classList.remove('bg-red-600');
    }
}

var intervals = [];
var intStep = 0;

var loopStep = 0;

var time = 0;
var clock;

function printIntervals() {
    document.getElementById('intervalList').innerHTML = '';
    intervals.forEach(async function (entry, index) {
        document.getElementById('intervalList').innerHTML += '<div onclick="removeInterval(' + index + ')" id="queue-' + index + '" class="queueElement transform transition-all duration-500 ease-in-out">' + parseSecs(entry) + '</div>';
    });
}

function setLoopInt() {
    const input = document.getElementById('loopInt').value
    if (input == '') {
        config.loopInt = 999999999;
    } else {
        config.loopInt = input;
    }
}

window.onload = function () {
    const player = document.getElementById('alertSoundPlayer');
    player.setAttribute('src', config.soundPath);
    document.getElementsByClassName('controlsDivStyle')[0].remove();
    document.getElementById('interInt').style.paddingRight = 0;
    document.getElementById('interInt').style.textAlign = 'center';
    document.getElementById('interInt').style.width = '100%';
    document.getElementById('interInt').style.borderRadius = 0;
    document.getElementById('interInt').style.marginBottom = '0.5rem';
    // document.getElementsByClassName('controlsDivStyle')[0].classList.add('hidden', 'overflow-hidden', 'invisible')
}

function removeInterval(int) {
    intervals.splice(int, 1)
    printIntervals()
}

function timer(interval) {
    var start = Date.now();
    clock = setInterval(function () {
        var delta = Date.now() - start;
        output(Math.floor(delta / 1000));
        if (time >= interval) {
            step()
            useralert();
        }
    }, 500);
}

function output(t) {
    if (t < 10) {
        time = '0' + t;
    } else {
        time = t;
    }
    document.getElementById('output').innerHTML = parseSecs(time);
}

const config = {
    "alertFlash": true,
    "alertSound": true,
    "soundPath": "./alertChime.mp3",
    "loop": false,
    "loopInt": 3,
};

function toggleFlash() {
    if (document.getElementById('alertFlash').classList.contains('btn-pushed')) {
        config.alertFlash = false;
        document.getElementById('alertFlash').classList.remove('btn-pushed')
    } else {
        config.alertFlash = true;
        document.getElementById('alertFlash').classList.add('btn-pushed')
    }
}

function toggleSound() {
    if (document.getElementById('alertSound').classList.contains('btn-pushed')) {
        config.alertSound = false;
        document.getElementById('alertSound').classList.remove('btn-pushed')
    } else {
        config.alertSound = true;
        document.getElementById('alertSound').classList.add('btn-pushed')
    }
}

function toggleLoop() {
    if (document.getElementById('loop').classList.contains('btn-pushed')) {
        config.loop = false;
        document.getElementById('loop').classList.remove('btn-pushed');
        document.getElementById('loopIntWrapper').classList.add('height-zero');
    } else {
        config.loop = true;
        document.getElementById('loop').classList.add('btn-pushed');
        document.getElementById('loopIntWrapper').classList.remove('height-zero');
    }
}

function clearIntervals() {
    intervals = [];
    printIntervals();
}

function addCustomInterval(el) {
    var value = document.getElementById(el).value;
    var hrs = (value.slice(0, 2)) * 3600;
    var mins = (value.slice(3, 5)) * 60;
    var secs = (value.slice(6, 8));

    hrs = parseInt(hrs);
    mins = parseInt(mins);
    secs = parseInt(secs);

    addInterval(hrs + mins + secs)
    document.getElementById(el).value = '00:00:00';
}

async function step() {
    await sleep(0.25)
    document.getElementById('output').innerHTML = '00:00:00';
    clearInterval(clock);
    if (config.loop == true && loopStep <= config.loopInt) {
        intervals.push(intervals[0])
        loopStep = loopStep + 1;
    }
    intervals.shift();
    document.getElementById('queue-0').classList.add('slideOut')
    await sleep(2)
    printIntervals();
    if (intervals === undefined || intervals.length == 0) {
        const btn = document.getElementById('toggleTimer')
        btn.innerHTML = 'Start Timer';
        btn.classList.add('initial');
        clearInterval(clock);
        document.getElementById('output').innerHTML = parseSecs(0);
    } else {
        timer(intervals[0])
    }
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, (s * 1000)));
}

function parseSecs(secs) {
    var out = new Date(secs * 1000);
    var outStr = out.toISOString().substr(11, 8)
    return outStr;
}