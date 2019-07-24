import {Deck, Suite, CardValue, HiddenCard, Card} from "./Deck";
import Blackjack from './Blackjack'
import UserType from "./UserType";

const PLAYER_ID = 333;

function getCustomizedDeckForTesting(){
    let predefinedCards = new Array<Card>();
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Five));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Jack));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Nine));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));

    let deck = new Deck();
    deck.setCards(predefinedCards);
    return deck;
}
test('Blackjack experiments' , () => {
    let arr:Array<number> = new Array<number>();
    let tempArr:Array<number> = new Array<number>();
    tempArr.push(1);
    tempArr.push(2);
    Array.prototype.push.apply(arr, tempArr);
    expect(arr.length).toEqual(2);
    tempArr = new Array<number>();
    tempArr.push(3);
    Array.prototype.push.apply(arr, tempArr);
    expect(arr.length).toEqual(3);
});

test('Test Blackjack Initialisation', () => {
    let deck = new Deck();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    expect(blackjack.getDealerCards().length).toEqual(0);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(0);
});

test('Test Blackjack Deal with Dealer card hidden', () => {
    let deck = new Deck();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);
    expect(blackjack.getDealerCards()[0].getCardValue()).toEqual(HiddenCard.Hidden);
    expect(blackjack.getDealerCards()[0].getSuite()).toEqual(HiddenCard.Hidden);
    expect(blackjack.getDealerCards()[1].getCardValue()).not.toEqual(HiddenCard.Hidden);
    expect(blackjack.getDealerCards()[1].getSuite()).not.toEqual(HiddenCard.Hidden);
});

test('Test Blackjack Player hit turn', () => {
    let deck = new Deck();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);
    
    blackjack.playHit(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(3);
});