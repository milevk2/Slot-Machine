import ResultInterface from "./ResultInterface";

interface PatternInterface {

    subscribed: boolean;
    paylineIndex: number;
    pattern: number[];
    matchPattern(visibleReels: number[][]): ResultInterface;
}

export default PatternInterface;