/* eslint-disable no-undef */
const PRNG = require('../utils/PRNG');

describe('PRNG', () => {
    describe('constructor', () => {
        test('creates an instance of PRNG', () => {
            const prng = new PRNG(123);
            expect(prng).toBeInstanceOf(PRNG);
        });
    });

    describe('next', () => {
        test('returns a number within the specified range', () => {
            const prng = new PRNG(123);
            const min = 1;
            const max = 10;
            const result = prng.next(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        test('returns the same number for the same seed', () => {
            const seed = 123;
            const prng1 = new PRNG(seed);
            const prng2 = new PRNG(seed);
            const min = 1;
            const max = 10;
            const result1 = prng1.next(min, max);
            const result2 = prng2.next(min, max);
            expect(result1).toEqual(result2);
        });

        test('returns different numbers for different seeds', () => {
            const prng1 = new PRNG(123);
            const prng2 = new PRNG(456);
            const min = 1;
            const max = 10;
            const result1 = prng1.next(min, max);
            const result2 = prng2.next(min, max);
            expect(result1).not.toEqual(result2);
        });
    });
});
