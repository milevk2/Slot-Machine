"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    line patterns are represented like:
    [0, 0, 0, 0, 0]
    [1, 1, 1, 1, 1]
    [2, 2, 2, 2, 2]
*/
class Line {
    subscribed;
    paylineIndex;
    pattern;
    constructor(paylineIndex, pattern) {
        this.subscribed = false;
        this.paylineIndex = paylineIndex;
        this.pattern = pattern;
    }
    matchPattern(visibleReels) {
        const rowIndex = this.pattern[0];
        let matches = 0;
        let matchingSymbol = visibleReels[0][rowIndex];
        for (let columnIndex = 0; columnIndex < this.pattern.length; columnIndex++) {
            if (this.pattern[columnIndex + 1] == undefined)
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
}
exports.default = Line;
