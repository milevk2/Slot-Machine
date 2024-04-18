"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Slot {
    #reelsCount;
    #rowsCount;
    #symbols;
    #lines;
    #reels;
    #totalWins;
    #totalPrize;
    #subscriptions;
    constructor(reelsCount, rowsCount, symbols, lines, reels) {
        this.#reelsCount = reelsCount;
        this.#rowsCount = rowsCount;
        this.#symbols = symbols;
        this.#lines = lines;
        this.#reels = reels;
        this.#subscriptions = {};
        this.#totalWins = 0;
        this.#totalPrize = 0;
    }
    spin() {
        const visibleReels = [];
        this.#reels.forEach(reel => {
            const index = Math.floor(Math.random() * reel.length);
            const visible = this.spinReel(index, this.#rowsCount, reel);
            visibleReels.push(visible);
        });
        this.calculatePaylines(visibleReels);
        return visibleReels;
    }
    spinReel(index, rows, reel) {
        const visible = [];
        for (let i = 0; i < rows; i++) {
            visible.push(reel[(index + i) % reel.length]);
        }
        return visible;
    }
    calculatePaylines(visibleReels) {
        const subscriptions = this.#subscriptions;
        for (let key in subscriptions) {
            const paylineArr = subscriptions[key];
            if (paylineArr === 'Unsubscribed') {
                continue;
            }
            if (key == '3' || key == '4') {
                const result = this.matchZigZagPattern(visibleReels, paylineArr);
                const prize = this.#symbols[result.matchingSymbol][result.matches];
                this.updateScore(result.matches + 1, prize);
                console.log(`From payline ${key} - [${paylineArr}] you have ${result.matches + 1} matches for symbol ${result.matchingSymbol} and you win ${this.#symbols[result.matchingSymbol][result.matches]}$`);
            }
            else if (key == '0' || key == '1' || key == '2') {
                const result = this.matchLinePattern(visibleReels, paylineArr);
                const prize = this.#symbols[result.matchingSymbol][result.matches];
                this.updateScore(result.matches + 1, prize);
                console.log(`From payline ${key} - [${paylineArr}] you have ${result.matches + 1} matches for symbol ${result.matchingSymbol} and you win ${prize}$`);
            }
        }
    }
    updateScore(matches, prize) {
        if (matches <= 2)
            return;
        this.#totalWins += 1;
        this.#totalPrize += prize;
    }
    displayScore() {
        console.log(`Total wins: ${this.#totalWins}\nTotal prize accumulated: ${this.#totalPrize}$`);
    }
    runSimulation(iterations) {
        let start = new Date().getTime();
        for (let iteration = 1; iteration <= iterations; iteration++) {
            console.log(this.spin());
        }
        let end = new Date().getTime();
        let executionTime = end - start;
        console.log('Simulation execution time: ' + executionTime + 'ms');
    }
    /*
    zig-zag patterns are represented like:
    [0,1,0,1,0]
    [1, 2, 1, 2, 1]
    */
    matchZigZagPattern(visibleReels, paylineArr) {
        let columnIndex = 0;
        let matches = 0;
        let matchingSymbol = visibleReels[columnIndex][paylineArr[0]];
        for (let rowIndex = 0; rowIndex < paylineArr.length; rowIndex++) {
            if (paylineArr[rowIndex + 1] == undefined)
                break;
            if (visibleReels[columnIndex][paylineArr[rowIndex]] == visibleReels[columnIndex + 1][paylineArr[rowIndex + 1]]) {
                matches += 1;
                columnIndex += 1;
            }
            else {
                break;
            }
        }
        return { matches, matchingSymbol };
    }
    /*
        line patterns are represented like:
        [0,0,0,0,0]
        [1, 1, 1, 1, 1]
        [2, 2, 2, 2, 2]
        */
    matchLinePattern(visibleReels, paylineArr) {
        const rowIndex = paylineArr[0];
        let matches = 0;
        let matchingSymbol = visibleReels[0][rowIndex];
        for (let columnIndex = 0; columnIndex < paylineArr.length; columnIndex++) {
            if (paylineArr[columnIndex + 1] == undefined)
                break;
            if (visibleReels[columnIndex][rowIndex] == visibleReels[columnIndex + 1][rowIndex]) {
                matches += 1;
            }
            else {
                break;
            }
        }
        return { matches, matchingSymbol };
    }
    subscribeToPayline(paylineIndex) {
        if (paylineIndex > this.#lines.length - 1) {
            throw new RangeError(`The provided payline index do not exist in lines matrix! Choose an index between 0 and ${this.#lines.length - 1}`);
        }
        if (!this.#subscriptions.hasOwnProperty(paylineIndex)) {
            this.#subscriptions[paylineIndex] = this.#lines[paylineIndex];
        }
    }
    unsubscribePayline(paylineIndex) {
        if (this.#subscriptions.hasOwnProperty(paylineIndex)) {
            this.#subscriptions[paylineIndex] = 'Unsubscribed';
        }
        else {
            throw new Error('Provide only indexes to paylines you have already subscribed to!');
        }
    }
}
exports.default = Slot;
