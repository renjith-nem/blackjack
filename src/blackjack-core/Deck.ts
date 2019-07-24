import { returnStatement } from "@babel/types";

export enum CardValue {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13
}

export enum HiddenCard {
    Hidden = -1
}

export enum Suite {
    Spades = 1,
    Hearts = 2,
    Diamonds = 3,
    Clubs = 4
}

export class Card {
    private _hidden: Boolean;
    private _suite: Suite;
    private _value: CardValue;

    constructor(suite: Suite, value: CardValue, hidden: Boolean = false) {
        this._suite = suite;
        this._value = value;
        this._hidden = hidden;
    }

    setCardStateHidden(){
        this._hidden = true;
    }

    getSuite() {
        return this._suite;
    }

    getCardValue() {
        return this._value;
    }
}

export class Deck {
    private _cards: Array<Card>
    constructor() {
        this._cards = new Array();
        for (let suite in Suite) {
            let suiteValue = Suite[suite];
            var isValueProperty = parseInt(suite, 10) >= 0
            if (isValueProperty) {
                for (let cardValue in CardValue) {
                    var isValueProperty = parseInt(cardValue, 10) >= 0
                    if (isValueProperty) {
                        this._cards.push(new Card(Number(suite), Number(cardValue)));
                    }
                }
            }
        }
        this.shuffleCards();
    }

    getCards() {
        return this._cards;
    }

    private shuffleCards(){
        // Source : https://osric.com/chris/accidental-developer/2012/07/javascript-array-sort-random-ordering/
        let size = this._cards.length;
        let tempArr = [];
        for (let i = 0; i < size-1; i++) {
            tempArr.push(this._cards.splice(Math.floor(Math.random()*this._cards.length),1)[0]);
        }
        tempArr.push(this._cards[0]);
        this._cards=tempArr;
    }

    drawCard(){
        return this._cards.pop();
    }

    // DANGER: This function is used only for testing purposes and not to be used on actual development.
    setCards(cards:Array<Card>){
        this._cards = new Array<Card>();
        Array.prototype.push.apply(this._cards, cards);
    }
}