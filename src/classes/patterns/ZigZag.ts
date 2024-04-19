
import ResultInterface from "../../interfaces/ResultInterface";

/*
    zig-zag patterns are represented like:
    [0, 1, 0, 1, 0]
    [1, 2, 1, 2, 1]
*/

class ZigZag {
    
    subscribed: boolean;
    paylineIndex: number;
    pattern:number[];

    constructor(paylineIndex: number, pattern:number[]) {

        this.subscribed = false;
        this.paylineIndex = paylineIndex;
        this.pattern = pattern;
    }

    public matchPattern(visibleReels: number[][]): ResultInterface {

        let columnIndex: number = 0;
        let matches: number = 0;
        let matchingSymbol: number = visibleReels[columnIndex][this.pattern[0]];

        for (let rowIndex = 0; rowIndex < this.pattern.length; rowIndex++) {

            if (this.pattern[rowIndex + 1] == undefined) break;

            if (visibleReels[columnIndex][this.pattern[rowIndex]] == visibleReels[columnIndex + 1][this.pattern[rowIndex + 1]]) {

                matches += 1;
                columnIndex += 1;
            }
            else {
                break;
            }
        }
        return { matches, matchingSymbol };
    }
}

export default ZigZag;
