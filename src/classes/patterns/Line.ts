import ResultInterface from "../../interfaces/ResultInterface";

/*
    line patterns are represented like:
    [0, 0, 0, 0, 0]
    [1, 1, 1, 1, 1]
    [2, 2, 2, 2, 2] 
*/

class Line {
    
    subscribed: boolean;
    paylineIndex: number;
    pattern:number[];

    constructor(paylineIndex: number, pattern:number[]) {

        this.subscribed = false;
        this.paylineIndex = paylineIndex;
        this.pattern = pattern;
    }

    public matchPattern(visibleReels: number[][]): ResultInterface {

        const rowIndex: number = this.pattern[0];
        let matches: number = 0;
        let matchingSymbol: number = visibleReels[0][rowIndex];

        for (let columnIndex = 0; columnIndex < this.pattern.length; columnIndex++) {

            if (this.pattern[columnIndex + 1] == undefined) break;

            if (visibleReels[columnIndex][rowIndex] == visibleReels[columnIndex + 1][rowIndex]) {

                matches += 1;
            }
            else {
                break;
            }
        }
        return { matches, matchingSymbol };
    }
}
export default Line;