const symbols = {
    
    1: 'banana',
    2: 'bell',
    3: 'coin',
    4: 'diamond',
    5: 'grape',
    6: 'heart',
    7: 'leef',
    8: 'orange',
    9: 'seven',
    10: 'watermelon'
}


async function prepareMachineDom() {

    document.querySelector('button.spin').addEventListener('click', spin);

    const {reelsCount, rowsCount, imagesNames} = await getMachineSettings();
    const slotDiv = document.getElementById('slot');
    
    let currIndex = 0;

    for (let row = 1; row <= rowsCount; row++) {

        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for (let reel = 1;  reel <= reelsCount; reel++) {

            const reelElement = document.createElement('div');
            reelElement.classList.add('reel');
            reelElement.classList.add(imagesNames[currIndex]);
            rowElement.appendChild(reelElement);
            currIndex++;

            if (currIndex > imagesNames.length - 1) currIndex = 0;

        }

        slotDiv.appendChild(rowElement);
    }

    console.log(reelsCount, rowsCount, imagesNames);


}


async function getMachineSettings() {

    const response = await fetch('http://localhost:3000/slot_settings');
    const result = await response.json();

    return result;
}

async function spin() {

    const paylines = [0, 1, 2];

    const response = await fetch('http://localhost:3000/spin', {
 
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify(paylines)

    })

    if (!response.ok) {

        throw new Error('Something went wrong with the request!')
    }

    const visibleReels = await response.json();

    updateVisibleReels(visibleReels);
}

function updateVisibleReels(result) {

    const visibleReels = Array.from(document.querySelectorAll('div.row')).map(el => {

       return Array.from( el.children);

    })

    for (let i = 0; i < visibleReels.length; i++) {

        for (let j = 0; j < visibleReels[i].length; j++) {

            visibleReels[i][j].className = `reel ${symbols[result[j][i]]}`
        }
    }
}



prepareMachineDom()

