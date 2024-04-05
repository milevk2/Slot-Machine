import { expect } from 'chai';
import spinReel from './functions/spinReel.mjs';

describe('spinReel', () => {
    it('should return correct elements for index 0', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = 0;
        const rowsCount = 3;
        const result = spinReel(reel, rowsCount, index);
        expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should return correct elements for index 1', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = 1;
        const rowsCount = 3;
        const result = spinReel(reel, rowsCount, index);
        expect(result).to.deep.equal([2, 3, 4]);
    });

    it('should return correct elements for index 10', () => {
        const reel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        const index = 10;
        const rowsCount = 3;
        const result = spinReel(reel, rowsCount, index);
        expect(result).to.deep.equal([11, 1, 2]);
    });

    it('should return correct elements for index reel.length-1', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = reel.length - 1;
        const rowsCount = 3;
        const result = spinReel(reel, rowsCount, index);
        expect(result).to.deep.equal([5, 1, 2]);
    });

    it('should return correct elements for index reel.length-2', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = reel.length - 2;
        const rowsCount = 3;
        const result = spinReel(reel, rowsCount, index);
        expect(result).to.deep.equal([4, 5, 1]);
    });

    it('should return correct elements for index reel.length-3', () => {
        const reel = [1, 2, 3, 4, 5];
        const index = reel.length - 3;
        const rowsCount = 3;
        const result = spinReel(reel, rowsCount, index);
        expect(result).to.deep.equal([3, 4, 5]);
    });
});