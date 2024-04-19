"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pattern_1 = __importDefault(require("./Pattern"));
/*
    zig-zag patterns are represented like:
    [0, 1, 0, 1, 0]
    [1, 2, 1, 2, 1]
*/
class ZigZag extends Pattern_1.default {
    constructor(paylineIndex, pattern) {
        super(paylineIndex, pattern);
    }
    matchPattern(visibleReels) {
        let columnIndex = 0;
        let matches = 0;
        let matchingSymbol = visibleReels[columnIndex][this.pattern[0]];
        for (let rowIndex = 0; rowIndex < this.pattern.length; rowIndex++) {
            if (this.pattern[rowIndex + 1] == undefined)
                break;
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
exports.default = ZigZag;
