"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slot_1 = __importDefault(require("./classes/slot"));
const ZigZag_1 = __importDefault(require("./classes/patterns/ZigZag"));
const Line_1 = __importDefault(require("./classes/patterns/Line"));
const configuration_1 = __importDefault(require("./configuration"));
//Initialize the pattern objects:
const lineZeroPattern = new Line_1.default(0, configuration_1.default.lines[0]);
const lineOnePattern = new Line_1.default(1, configuration_1.default.lines[1]);
const lineTwoPattern = new Line_1.default(2, configuration_1.default.lines[2]);
const zeroOnePattern = new ZigZag_1.default(3, configuration_1.default.lines[3]);
const oneTwoPattern = new ZigZag_1.default(4, configuration_1.default.lines[4]);
const subscriptions = [lineZeroPattern, lineOnePattern, lineTwoPattern, zeroOnePattern, oneTwoPattern];
const slotMachine = new slot_1.default(configuration_1.default.reelsCount, configuration_1.default.rowsCount, configuration_1.default.symbols, configuration_1.default.lines, configuration_1.default.reels, subscriptions);
//displaying the total results - total wins and total accumulated prize:
//slotMachine.displayScore();
exports.default = slotMachine;
