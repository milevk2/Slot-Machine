// Create unit tests to check whether logic works with index 0, 1, 10, reel.length-1, reel.length-2, reel.length-3 and pass index as a parameter instead of randomizing it;

function spinReel(reel, rowsCount, index) {
    let firstRowElement = 0;
    let secondRowElement = 0;
    let thirdRowElement = 0;

    if (index <= reel.length - rowsCount) {
        firstRowElement = reel[index];
        secondRowElement = reel[index + 1];
        thirdRowElement = reel[index + 2];
    } else if (reel[index + 1] === undefined) {
        firstRowElement = reel[index];
        secondRowElement = reel[0];
        thirdRowElement = reel[1];
    } else if (reel[index + 2] === undefined) {
        firstRowElement = reel[index];
        secondRowElement = reel[index + 1];
        thirdRowElement = reel[0];
    }

    return [firstRowElement, secondRowElement, thirdRowElement];
}

export default spinReel