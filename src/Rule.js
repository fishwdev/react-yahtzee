class Rule {
    constructor(params) {
        Object.assign(this, params)
    }

    sum(dice) {
        // sum of all dice
        return dice.reduce((prev, curr) => prev + curr);
    }

    freq(dice) {
        // frequencies of dice-values
        const freqs = new Map();
        for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
        return Array.from(freqs.values());
    }

    count(dice, val) {
        // # times val appears in dice
        return dice.filter(d => d === val).length;
    }
}

class TotalOneNumber extends Rule {
    evalRoll = dice => {
        return this.val * this.count(dice, this.val);
    };
}

class SumDistro extends Rule {
    evalRoll = dice => {
        // do any of the counts meet of exceed this distro?
        return this.freq(dice).some(c => c >= this.count) ? this.sum(dice) : 0;
    };
}

class FullHouse extends Rule{
    evalRoll = dice => {
        const freqs = this.freq(dice);
        return (freqs.includes(2) && freqs.includes(3)) ? this.score : 0;
    }
}

class SmallStraight extends Rule{
    evalRoll = dice => {
        const d = new Set(dice);
        if (d.has(2) && d.has(3) && d.has(4) && (d.has(1) || d.has(5))) {
            return this.score;
        }
        if (d.has(3) && d.has(4) && d.has(5) && (d.has(2) || d.has(6))) {
            return this.score;
        }
        return 0;
    }
}

class LargeStraight extends Rule {
    evalRoll = dice => {
        const d = new Set(dice);

        // large straight must be 5 different dice 6 only one can be a 1 or a 6
        return (d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0);
    };
}

class Yahtzee extends Rule {
    evalRoll = dice => {
        // all dice must be the same
        return this.freq(dice)[0] === 5 ? this.score : 0;
    };
}

// ones, twos, etc.., score as sum of that value
const ones = new TotalOneNumber({val: 1, desc: '1 point per 1'});
const twos = new TotalOneNumber({val: 2, desc: '2 points per 2'});
const threes = new TotalOneNumber({val: 3, desc: '3 points per 3'});
const fours = new TotalOneNumber({val: 4, desc: '4 points per 4'});
const fives = new TotalOneNumber({val: 5, desc: '5 points per 5'});
const sixes = new TotalOneNumber({val: 6, desc: '6 points per 6'});

// three/four of kind score as sum of all dice
const threeOfKind = new SumDistro({count: 3, desc: 'Sum all dices if 3 are the same'});
const fourOfKind = new SumDistro({count: 4, desc: 'Sum all dices if 4 are the same'});

// full house scores as flat 25
const fullHouse = new FullHouse({score: 25, desc: '25 points for a full house, 2 and 3 combinations'});

// small/large straights score as 30/40
const smallStraight = new SmallStraight({score: 30, desc: '30 points for small straight, 4 consecutive numbers'});
const largeStraight = new LargeStraight({score: 40, desc: '40 points for large straight, 5 consecutive numbers'});

// yahtzee scores as 50
const yahtzee = new Yahtzee({score: 50, desc: '50 points for Yahtzee, all dice are the same'});

// for chance, can view as some of all dice, requiring at least 0 of a kind
const chance = new SumDistro({count: 0, desc: 'Sum of all dice'})

export {
    ones,
    twos,
    threes,
    fours,
    fives,
    sixes,
    threeOfKind,
    fourOfKind,
    fullHouse,
    smallStraight,
    largeStraight,
    yahtzee,
    chance
}