import Slot from "./classes/slot";
import configuration from "./configuration";

const slotMachine = new Slot(configuration.reelsCount, configuration.rowsCount, configuration.symbols, configuration.lines, configuration.reels)

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
