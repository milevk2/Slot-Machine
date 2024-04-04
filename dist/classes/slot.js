"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Slot {
    #reelsCount;
    #rowsCount;
    #symbols;
    #lines;
    #reels;
    #subscriptions;
    constructor(reelsCount, rowsCount, symbols, lines, reels) {
        this.#reelsCount = reelsCount;
        this.#rowsCount = rowsCount;
        this.#symbols = symbols;
        this.#lines = lines;
        this.#reels = reels;
        this.#subscriptions = {};
    }
    spin() {
        // const visibleReels: number[][] = [[3, 2, 1], [3, 2, 1], [3, 2, 1], [2, 2, 1], [3, 2, 1]]; // line pattern matches
        //const visibleReels: number[][] = [[3, 2, 1], [1, 3, 2], [3, 2, 4], [2, 2, 2], [3, 2, 1]]; // zig-zag pattern matches
        const visibleReels = [];
        this.#reels.forEach(reel => {
            const visible = this.spinReel(reel, this.#rowsCount);
            visibleReels.push(visible);
        });
        this.calculatePaylines(visibleReels);
        return visibleReels;
    }
    spinReel(reel, rowsCount) {
        let firstRowElement = 0;
        let secondRowElement = 0;
        let thirdRowElement = 0;
        //create unit tests to check whether logic works with index 0, 1, 10, reel.length-1, reel.length-2, reel.length-3;
        let index = Math.floor(Math.random() * reel.length);
        if (index <= reel.length - rowsCount) {
            firstRowElement = reel[index];
            secondRowElement = reel[index + 1];
            thirdRowElement = reel[index + 2];
        }
        else if (reel[index + 1] == undefined) {
            firstRowElement = reel[index];
            secondRowElement = reel[0];
            thirdRowElement = reel[1];
        }
        else if (reel[index + 2] == undefined) {
            firstRowElement = reel[index];
            secondRowElement = reel[index + 1];
            thirdRowElement = reel[0];
        }
        return [firstRowElement, secondRowElement, thirdRowElement];
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
                console.log(`From payline ${key} you have ${result.matches + 1} matches for symbol ${result.matchingSymbol} and you win ${this.#symbols[result.matchingSymbol][result.matches]}$`);
            }
            else if (key == '0' || key == '1' || key == '2') {
                const result = this.matchLinePattern(visibleReels, paylineArr);
                console.log(`From payline ${key} you have ${result.matches + 1} matches for symbol ${result.matchingSymbol} and you win ${this.#symbols[result.matchingSymbol][result.matches]}$`);
            }
        }
    }
    //zig-zag pattern
    matchZigZagPattern(visibleReels, paylineArr) {
        let columnIndex = 0;
        let matches = 0;
        let matchingSymbol = visibleReels[columnIndex][paylineArr[0]];
        for (let rowIndex = 0; rowIndex < paylineArr.length; rowIndex++) {
            //[0,1,0,1,0]
            //[1, 2, 1, 2, 1]
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
    matchLinePattern(visibleReels, paylineArr) {
        //[0,0,0,0,0]
        //[1, 1, 1, 1, 1]
        //[2, 2, 2, 2, 2]
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
