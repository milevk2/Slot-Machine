class Pattern {
    
    subscribed: boolean;
    paylineIndex: number;
    pattern:number[];

    constructor(paylineIndex: number, pattern:number[]) {

        this.subscribed = false;
        this.paylineIndex = paylineIndex;
        this.pattern = pattern;
    }
}

export default Pattern;