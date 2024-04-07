
## **Slot Machine Casino Game.**

[Task description](https://framerusercontent.com/assets/7d94Z6q1HkF5ng3bHViNGRAcM3k.pdf)
[Thought Process](https://softwareuniversity-my.sharepoint.com/:w:/g/personal/milevk2_students_softuni_bg/EW7_xdCnXCRPlNuYV_nrOXsB8TsWIh90-HZ0yDdR3bnV1g?e=vZiFRJ)

- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Slot Class Documentation](#slot-class-documentation)
- [Constructor](#constructor)
- [Public Methods](#public-methods)
- [Private Methods](#private-methods)
- [Example](#example)
- [Unit Tests](#unit-tests)

**Key features:**
- Initiates a slot machine object with class "Slot" which accepts the current slot machine configuration from `configuration.ts` file.
- The user is able to subscribe / unsubscribe to certain paylines before spinning.
- After each spin the algorithm matches the visible reels against the payline pattern the user has subscribed to and logs whether there are matches, for which symbols, how many matches and what is the prize for the given payline match.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Open the terminal in `Slot Machine\dist\` directory.
4. Type `npx tsc`
5. run index.js from the `dist` folder with command `node index.js` in the terminal.
6. After changing `index.ts`, repeat steps 3 - 5.

# Slot Class Documentation

The `Slot` class represents a slot machine object with customizable parameters such as the number of reels, rows, symbols, and paylines.

## Constructor

### Parameters

- `reelsCount`: The number of reels in the slot machine.
- `rowsCount`: The number of visible rows in the slot machine (display).
- `symbols`: An interface defining the symbols and their respective prizes for the N'th match against the payline patterns.
- `lines`: A 2D matrix representing the payline patterns of the slot machine.
    - for instance [0,0,0,0,0] represents a line pattern and [0,1,0,1,0] represents a zig-zag pattern.
- `reels`: A 2D matrix representing the initial configuration of reels - each reel is an array with N symbols. 

### Public Methods

1. `spin()` - Spins the slot machine and returns the visible symbols on each reel. It iterates through reels and calls the private method 
`spinReel(reel: number[], rowsCount: number)` for each one. The result from spinReel() is being saved in an array, which is pushed to the 2D matrix **visibleReels: number[][]**

```typescript
  const visible: number[] = this.spinReel(reel, this.#rowsCount);
  visibleReels.push(visible);
 ```
**RETURNS visibleReels:number[][]: An array of arrays representing the visible symbols on each reel after spinning.**

2. `subscribeToPayline(paylineIndex: number)` - Subscribes to a specific payline by its index. Throws an error if user choose an index that do not exist (The error to be handled in a future endpoint).

For instance if we have the below lines configuration:

```typescript
 lines: [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [0, 1, 0, 1, 0],
        [1, 2, 1, 2, 1],
    ],
```
and the user subscribes to pattern **3**, this means they subscribed to pattern **[0, 1, 0, 1, 0]**

**Example:**
```typescript
slotMachine.subscribeToPayline(3);
```

3. `unsubscribePayline(paylineIndex: number)` - Unsubscribes from a specific payline by its index. Throws an error if user unsubscribes from payline that he hasn't subscribed to.

**Example:**
```typescript
slotMachine.unsubscribePayline(3);
```

### Private Methods
1. `spinReel(reel: number[], rowsCount: number)` - Spins a single reel and returns the visible symbols of that reel.

It chooses an index with Math.random() and then checks how far is the chosen index from the array's last index. 

If index <= reel.length - rowsCount, then the method assigns:
- **reel[ index ] as firstRowElement;**
- **reel[ index + 1 ] as secondRowElement;**
- **reel[ index + 2 ] as thirdRowElement;**

If reel[index + 1] == undefined, then the method assigns:
- **reel[ index ] as firstRowElement;**
- **reel[0] as secondRowElement;**
- **reel[1] as thirdRowElement;**


If reel[index + 2] == undefined,  then the method assigns:
- **reel[ index ] as firstRowElement;**
- **reel[index + 1] as secondRowElement;**
- **reel[0] as thirdRowElement;**

***N.B!** - this logic will only work if we have a slot machine with 3 visible rows. For more flexible approach a new and better implementation is needed!

**RETURNS : number[]: An array of numbers  representing the visible symbols on the current reel after spinning.**


2. `calculatePaylines(visibleReels: number[][])` - Calculates the matches and winnings for each subscribed payline. It calls private methods

`matchZigZagPattern(...)` and `matchLinePattern(...)` ;

depending on which paylines the user has subscribed to. For instance if user subscribes to payline 1 and has 3 matches from symbol 4, the function will log the below:

If we assume that the visible reels after the spin are: [ [ 4, **<4>**, 8 ], [ 1, **<4>**, 4 ], [ 5, **<4>**, 4 ], [ 5, 5, 7 ], [ 3, 3, 9 ] ] and the subscribed payline is 1 -  [1, 1, 1, 1, 1] (matching pattern on the second row of the visible reels) , then we have 3 matches with matching symbol `4`. 
We use the **matchingSymbol** and **matches** from the **result: ResultInterface** so we can retrieve the symbol and it's respective prize accordingly (matches used as index ) from the symbols.

```typescript
 symbols {4: [0, 0, 40, 80, 200]} 
```

The final result that the method logs is:
**''From payline 1 you have 3 matches for symbol 4 and you win 40$''**

3. `matchZigZagPattern(visibleReels: number[][], paylineArr: number[]): ResultInterface`  - Matches the symbols in a zig-zag pattern and calculates winnings. 

Returns an object with information of the matchingSymbol and how many consecutive matches there are.

For example, zig-zag patterns are represented like:
[0, 1, 0, 1, 0]
[1, 2, 1, 2, 1]

**RETURNS ResultInterface:  { matches, matchingSymbol }**

4. `matchLinePattern(visibleReels: number[][], paylineArr: number[]): ResultInterface` - Matches the symbols in a straight line pattern and calculates winnings.

Returns an object with information of the matchingSymbol and how many consecutive matches there are.

For example, line patterns are represented like:
[0, 0, 0, 0, 0]
[1, 1, 1, 1, 1]

**RETURNS ResultInterface:  { matches, matchingSymbol }**

### How to use:

```typescript
const slotMachine = new Slot(5, 3, symbolsInterface, linesMatrix, reelsMatrix);

slotMachine.subscribeToPayline(1)
slotMachine.subscribeToPayline(2)
slotMachine.subscribeToPayline(3)
slotMachine.unsubscribePayline(2)
slotMachine.spin();

```
# Unit Tests

Unit tests are in `src/unit-tests` directory. There will be a separate unit-test file for each function.
Currently there are only tests for `spinReel` logic. The function logic has been separated from the class `Slot` in order to test it in a separate file `functions\spinReel-test.mjs`. 

## Run Tests:

1. Go to `src\unit-tests.mjs` and open the terminal;
2. In the terminal write command  `mocha {filename}`;

**N.B! I have to refactor the spinReel method, so it adheres to OOP principles, as currently it determines the chosen index internaly with Math.random(). In order to achieve better testibility, the `index` should be passed as a dependency parameter.**
