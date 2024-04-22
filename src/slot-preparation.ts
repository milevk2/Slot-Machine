import Slot from "./classes/slot";
import ZigZag from "./classes/patterns/ZigZag";
import Line from "./classes/patterns/Line";
import configuration from "./configuration";
import PatternInterface from "./interfaces/PatternInterface";

//Initialize the pattern objects:
const lineZeroPattern = new Line(0, configuration.lines[0]);
const lineOnePattern = new Line(1, configuration.lines[1]);
const lineTwoPattern = new Line(2, configuration.lines[2]);
const zeroOnePattern = new ZigZag(3, configuration.lines[3]);
const oneTwoPattern = new ZigZag(4, configuration.lines[4]);
const subscriptions:PatternInterface[] = [lineZeroPattern, lineOnePattern, lineTwoPattern, zeroOnePattern, oneTwoPattern];

const slotMachine = new Slot(configuration.reelsCount, configuration.rowsCount, configuration.symbols, configuration.lines, configuration.reels, subscriptions);


//displaying the total results - total wins and total accumulated prize:
//slotMachine.displayScore();

export default slotMachine;
