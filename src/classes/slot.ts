import SymbolsInterface from "../interfaces/SymbolsInterface";
import ResultInterface from "../interfaces/ResultInterface";
import PatternInterface from "../interfaces/PatternInterface";
import SpinResultInterface from "../interfaces/SpinResultInterface";
import ScoreInterface from "../interfaces/ScoreInterface";

class Slot {

    #lines: number[][];
    #reels: number[][];
    #reelsCount: number;
    #rowsCount: number;
    #totalWins: number;
    #totalPrize: number;
    #symbols: SymbolsInterface;
    #subscriptions: PatternInterface[];

    constructor(reelsCount: number, rowsCount: number, symbols: SymbolsInterface, lines: number[][], reels: number[][], subscriptions: PatternInterface[]) {
        this.#reelsCount = reelsCount;
        this.#rowsCount = rowsCount;
        this.#symbols = symbols;
        this.#lines = lines;
        this.#reels = reels;
        this.#subscriptions = subscriptions
        this.#totalWins = 0;
        this.#totalPrize = 0;
    }

    public getReelsRows() {

        return {
            reelsCount: this.#reelsCount,
            rowsCount: this.#rowsCount
        }
    }

    public displayScore():ScoreInterface {

        const scoreString = `Total wins: ${this.#totalWins}\nTotal prize accumulated: ${this.#totalPrize}$`

        return {

            scoreString,
            totalWins: this.#totalWins,
            totalPrize: this.#totalPrize
        }
    }

    public runSimulation(iterations: number) {

        let start = new Date().getTime();

        for (let iteration = 1; iteration <= iterations; iteration++) {
            console.log(this.spin());
        }
        let end = new Date().getTime();
        let executionTime = end - start;
        console.log('Simulation execution time: ' + executionTime + 'ms');
    }

    public subscribeToPayline(paylineIndex: number) {

        if (paylineIndex > this.#lines.length - 1) {

            throw new RangeError(`The provided payline index do not exist in lines matrix! Choose an index between 0 and ${this.#lines.length - 1}`);
        }

        if (!this.#subscriptions[paylineIndex].subscribed) {
            this.#subscriptions[paylineIndex].subscribed = true;
        }
    }

    public unsubscribePayline(paylineIndex: number) {

        if (this.#subscriptions[paylineIndex].subscribed) {

            this.#subscriptions[paylineIndex].subscribed = false
        }
        else {

            throw new Error('Provide only indexes to paylines you have already subscribed to!')
        }
    }

    public spin(): SpinResultInterface {

        const visibleReels: number[][] = [];

        this.#reels.forEach(reel => {

            const index: number = Math.floor(Math.random() * reel.length);
            const visible: number[] = this.spinReel(index, this.#rowsCount, reel);
            visibleReels.push(visible);
        });

        const prizeNotifications = this.calculatePaylines(visibleReels);
        return { visibleReels, prizeNotifications };
    }

    private spinReel(index: number, rows: number, reel: number[]): number[] {

        const visible: number[] = [];

        for (let i = 0; i < rows; i++) {

            visible.push(reel[(index + i) % reel.length]);
        }
        return visible;
    }

    private updateScore(matches: number, prize: number) {

        if (matches <= 2) return;

        this.#totalWins += 1;
        this.#totalPrize += prize;
    }

    private calculatePaylines(visibleReels: number[][]): string[] {

        const subscriptions = this.#subscriptions;
        let prizeNotifications: string[] = [];

        for (let subscription of subscriptions) {

            if (subscription == undefined) continue;
            if (!subscription.subscribed) continue;

            const result: ResultInterface = subscription.matchPattern(visibleReels);
            const prize = this.#symbols[result.matchingSymbol][result.matches];
            this.updateScore(result.matches + 1, prize);
            prizeNotifications.push(`From payline ${subscription.paylineIndex} - [${subscription.pattern}] you have ${result.matches + 1} matches for symbol ${result.matchingSymbol} and you win ${this.#symbols[result.matchingSymbol][result.matches]}$`);
        }

        return prizeNotifications;
    }
}

export default Slot;