import Slot from "./classes/slot";
import configuration from "./configuration";

const slotMachine = new Slot(configuration.reelsCount, configuration.rowsCount, configuration.symbols, configuration.lines, configuration.reels)

slotMachine.subscribeToPayline(0)
slotMachine.subscribeToPayline(1)
slotMachine.subscribeToPayline(2)
slotMachine.subscribeToPayline(3)
slotMachine.subscribeToPayline(4)
slotMachine.unsubscribePayline(4)

console.log(slotMachine.spin());
