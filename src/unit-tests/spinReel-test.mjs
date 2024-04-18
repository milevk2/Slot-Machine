import { expect } from 'chai';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Slot = require('../../dist/classes/slot.js').default;

// initialize object just to have access to the methods. The function parameters will be passed individually with every test:
const testMachine = new Slot(0,0,[],[],[]);

describe('Tests whether the spinReel function returns the expected visible symbols.', () => {
    it('should return correct elements for index 0 and 3 rows', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = 0;
        const rowsCount = 3;
        const result = testMachine.spinReel(index, rowsCount, reel);
        expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should return correct elements for last index and 3 rows', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = reel.length-1;
        const rowsCount = 3;
        const result = testMachine.spinReel(index, rowsCount, reel);
        expect(result).to.deep.equal([5, 1, 2]);
    });

    it('should return correct elements for last index and 4 rows', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = reel.length-1;
        const rowsCount = 4;
        const result = testMachine.spinReel(index, rowsCount, reel);
        expect(result).to.deep.equal([5, 1, 2, 3]);
    });

    it('should return correct elements for index 0 and 4 rows', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = 0;
        const rowsCount = 4;
        const result = testMachine.spinReel(index, rowsCount, reel);
        expect(result).to.deep.equal([1, 2, 3, 4]);
    });
})
