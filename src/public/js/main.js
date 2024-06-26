import symbols from "./symbolsDict.js";

document.getElementById('lineBtns').addEventListener('click', paylinesBtnsClick);

async function prepareMachineDom() {

    document.querySelector('button.spin').addEventListener('click', spin);

    const { reelsCount, rowsCount, imagesNames, paylines } = await getMachineSettings();
    const slotDiv = document.getElementById('slot');

    let currIndex = 0;

    //preparing the rows and columns of the machine:
    for (let row = 1; row <= rowsCount; row++) {

        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for (let reel = 1; reel <= reelsCount; reel++) {

            const reelElement = document.createElement('div');
            reelElement.classList.add('reel');
            reelElement.classList.add(imagesNames[currIndex]);
            rowElement.appendChild(reelElement);
            currIndex++;

            if (currIndex > imagesNames.length - 1) currIndex = 0;

        }
        slotDiv.appendChild(rowElement);
    }

    //preparing the payline buttons:

    const payineBtnsField = document.getElementById('lineBtns');

    for (let i = 0; i < paylines; i++) {

        const button = document.createElement('button');
        button.className = 'paylineBtn';
        button.id = `paylineBtn_${i}`;
        button.textContent = `Payline ${i}`
        payineBtnsField.appendChild(button);
    }
}


async function getMachineSettings() {

    const response = await fetch('http://localhost:3000/slot_settings');
    const result = await response.json();

    return result;
}

function clearNotifications() {

    Array.from(document.getElementById('prizeNotification').children).forEach(element => {

        element.remove();
    })
}

async function spin() {

    clearNotifications();

    const { paylines, id } = JSON.parse(sessionStorage.getItem('machine'))

    console.log(paylines, id);
    const response = await fetch('http://localhost:3000/spin', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ paylines, id })
    })

    if (!response.ok) {

        throw new Error('Something went wrong with the request!')
    }

    const spinResult = await response.json();

    getScore();
    updateVisibleReels(spinResult.visibleReels);
    displayPrizeNotifications(spinResult.prizeNotifications);
}

function displayPrizeNotifications(notifications) {

    const messageField = document.getElementById('prizeNotification');

    for (let message of notifications) {

        const paragraph = document.createElement('p');
        paragraph.textContent = message;
        messageField.appendChild(paragraph);
    }
}

function updateVisibleReels(result) {

    const visibleReels = Array.from(document.querySelectorAll('div.row')).map(el => {

        return Array.from(el.children);
    })

    for (let i = 0; i < visibleReels.length; i++) {

        for (let j = 0; j < visibleReels[i].length; j++) {

            visibleReels[i][j].className = `reel ${symbols[result[j][i]]}`
        }
    }
}

async function prepareMachineCache() {

    const response = await fetch('http://localhost:3000/createMachine');
    const id = await response.json();

    sessionStorage.setItem('machine', JSON.stringify({

        id,
        totalPrize: 0,
        totalWins: 0,
        paylines: [],
        currentPrize: 0,
    }))
}

async function getScore() {

    const response = await fetch('http://localhost:3000/score');
    const { totalWins, totalPrize, scoreString } = await response.json();

    updateScore(totalWins, totalPrize)
    displayScore(scoreString);
}

function updateScore(totalWins, totalPrize) {

    const cachedScore = JSON.parse(sessionStorage.getItem('machine'));

    cachedScore['totalWins'] = totalWins;
    cachedScore['totalPrize'] = totalPrize;

    sessionStorage.setItem('machine', JSON.stringify(cachedScore));

}

async function displayScore(score) {

    document.getElementById('score').textContent = score;

}

function paylinesBtnsClick(e) {

    const id = e.target.id;
    const paylineIndex = Number(id.slice(-1));

    if (id == 'lineBtns') return;

    const machineCache = JSON.parse(sessionStorage.getItem('machine'));
    const paylines = Array.from(machineCache.paylines);

    if (!paylines.includes(paylineIndex)) {

        paylines.push(paylineIndex);
        machineCache.paylines = paylines;
        sessionStorage.setItem('machine', JSON.stringify(machineCache));

        subscribeToPayline(paylineIndex);
    }
    else {

        paylines.splice(paylines.indexOf(paylineIndex),1);
        machineCache.paylines = paylines;
        sessionStorage.setItem('machine', JSON.stringify(machineCache));

        unsubscribePayline(paylineIndex);
    }

    const machineRows = document.querySelectorAll('div.slot div.row');

    
    if (paylineIndex == 0) {

        machineRows[0].classList.toggle('yellowBorder');
    }
    else if (paylineIndex == 1) {

        machineRows[1].classList.toggle('greenBorder');
    }
    else if (paylineIndex == 2) {

        machineRows[2].classList.toggle('blueBorder');
    }
}

async function subscribeToPayline(index) {

    const machineId = JSON.parse(sessionStorage.getItem('machine')).id;

    const response = await fetch('http://localhost:3000/subscribe', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ index, machineId })

    })

    if (!response.ok) throw new Error('Something went wrong with the request!')

    const result = await response.json();

    console.log(result);
}

async function unsubscribePayline(index) {
    const machineId = JSON.parse(sessionStorage.getItem('machine')).id;

    const response = await fetch('http://localhost:3000/unsubscribe', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ index, machineId })

    })

    if (!response.ok) throw new Error('Something went wrong with the request!')

    const result = await response.json();

    console.log(result);
}

prepareMachineCache();
prepareMachineDom();

