"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slot_1 = __importDefault(require("./classes/slot"));
const configuration_1 = __importDefault(require("./configuration"));
const slotMachine = new slot_1.default(configuration_1.default.reelsCount, configuration_1.default.rowsCount, configuration_1.default.symbols, configuration_1.default.lines, configuration_1.default.reels);
slotMachine.subscribeToPayline(0);
slotMachine.subscribeToPayline(1);
slotMachine.subscribeToPayline(2);
slotMachine.subscribeToPayline(3);
slotMachine.subscribeToPayline(4);
slotMachine.unsubscribePayline(4);
console.log(slotMachine.spin());
//TO DO: simulation that iterates a large amount of spins with information about total wins, bets, and execution speed
