"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pattern {
    subscribed;
    paylineIndex;
    pattern;
    constructor(paylineIndex, pattern) {
        this.subscribed = false;
        this.paylineIndex = paylineIndex;
        this.pattern = pattern;
    }
}
exports.default = Pattern;
