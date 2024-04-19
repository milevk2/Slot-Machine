import Slot from "./classes/slot";
import ZigZag from "./classes/patterns/ZigZag";
import Line from "./classes/patterns/Line";
import configuration from "./configuration";
import PatternInterface from "./interfaces/PatternInterface";

//Initialize the pattern objects:
const lineZeroPattern = new Line(0, configuration.lines[0]);
const lineOnePattern = new Line(1, configuration.lines[1]);
const lineTwoPattern = new Line(2, configuration.lines[2])
const zeroOnePattern = new ZigZag(3, configuration.lines[3]);
const oneTwoPattern = new ZigZag(4, configuration.lines[4]);
const subscriptions:PatternInterface[] = [lineZeroPattern, lineOnePattern, lineTwoPattern, zeroOnePattern, oneTwoPattern];

const slotMachine = new Slot(configuration.reelsCount, configuration.rowsCount, configuration.symbols, configuration.lines, configuration.reels, subscriptions);

//subscribe unsubscribe to particular payline by it's index in lines 2D matrix:
 slotMachine.subscribeToPayline(0);
slotMachine.subscribeToPayline(1);
slotMachine.subscribeToPayline(2);
slotMachine.subscribeToPayline(3);
slotMachine.subscribeToPayline(4);
slotMachine.unsubscribePayline(4);

//simulating and displaying game information during runtime and displaying the total execution time when the simulation completes:
slotMachine.runSimulation(1000);

//displaying the total results - total wins and total accumulated prize:
slotMachine.displayScore();
