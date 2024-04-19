"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Slot {
    #lines;
    #reels;
    #reelsCount;
    #rowsCount;
    #totalWins;
    #totalPrize;
    #symbols;
    #subscriptions;
    constructor(reelsCount, rowsCount, symbols, lines, reels, subscriptions) {
        this.#reelsCount = reelsCount;
        this.#rowsCount = rowsCount;
        this.#symbols = symbols;
        this.#lines = lines;
        this.#reels = reels;
        this.#subscriptions = subscriptions;
        this.#totalWins = 0;
        this.#totalPrize = 0;
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
    subscribeToPayline(paylineIndex) {
        if (paylineIndex > this.#lines.length - 1) {
            throw new RangeError(`The provided payline index do not exist in lines matrix! Choose an index between 0 and ${this.#lines.length - 1}`);
        }
        if (!this.#subscriptions[paylineIndex].subscribed) {
            this.#subscriptions[paylineIndex].subscribed = true;
        }
    }
    unsubscribePayline(paylineIndex) {
        if (this.#subscriptions[paylineIndex].subscribed) {
            this.#subscriptions[paylineIndex].subscribed = false;
        }
        else {
            throw new Error('Provide only indexes to paylines you have already subscribed to!');
        }
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
    updateScore(matches, prize) {
        if (matches <= 2)
            return;
        this.#totalWins += 1;
        this.#totalPrize += prize;
    }
    calculatePaylines(visibleReels) {
        const subscriptions = this.#subscriptions;
        for (let subscription of subscriptions) {
            if (subscription == undefined)
                continue;
            if (!subscription.subscribed)
                continue;
            const result = subscription.matchPattern(visibleReels);
            const prize = this.#symbols[result.matchingSymbol][result.matches];
            this.updateScore(result.matches + 1, prize);
            console.log(`From payline ${subscription.paylineIndex} - [${subscription.pattern}] you have ${result.matches + 1} matches for symbol ${result.matchingSymbol} and you win ${this.#symbols[result.matchingSymbol][result.matches]}$`);
        }
    }
}
exports.default = Slot;
