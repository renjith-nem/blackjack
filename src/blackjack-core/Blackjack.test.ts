import { Deck, Suite, CardValue, HiddenCard, Card } from "./Deck";
import { Status, GameStatus, GamePlayer, WinStatus } from './Status'
import Blackjack from './Blackjack'
import UserType from "./UserType";

const PLAYER_ID = 333;

function getCustomizedDeck1ForTesting() {
    let predefinedCards = new Array<Card>();
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Five));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Jack));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Nine));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Three));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Ace));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Six));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Eight));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Four));

    let deck = new Deck();
    deck.setCards(predefinedCards);
    return deck;
}


function getCustomizedDeck2ForTesting() {
    let predefinedCards = new Array<Card>();
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Five));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Jack));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Nine));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Three));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Ace));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Six));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Eight));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Four));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Two));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.King));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Jack));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Six));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Five));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Eight));

    let deck = new Deck();
    deck.setCards(predefinedCards);
    return deck;
}

function getCustomizedDeck3ForTesting() {
    let predefinedCards = new Array<Card>();
    predefinedCards.push(new Card(Suite.Spades, CardValue.Ace));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Six));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Eight));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Four));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Two));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.King));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Five));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Jack));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Nine));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));
    predefinedCards.push(new Card(Suite.Clubs, CardValue.Three));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Jack));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Six));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Five));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Eight));

    let deck = new Deck();
    deck.setCards(predefinedCards);
    return deck;
}


test('Blackjack experiments', () => {
    let arr: Array<number> = new Array<number>();
    let tempArr: Array<number> = new Array<number>();
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

test('Test Blackjack Player Win Simulation1 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getDealer().getHandValue()).toEqual(22);
    expect(status.getPlayer().getHandValue()).toEqual(20);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Test Blackjack Player Win Simulation2 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(20);
    expect(status.getDealer().getHandValue()).toEqual(22);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Test Blackjack Dealer Win Simulation2 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(20);
    expect(status.getDealer().getHandValue()).toEqual(22);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Test Blackjack Dealer Win Simulation3 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(30);
    expect(status.getDealer().getHandValue()).toEqual(12);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Test Blackjack Dealer Win Simulation1 with Deck2', () => {
    let deck = getCustomizedDeck2ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(26);
    expect(status.getDealer().getHandValue()).toEqual(13);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Test Blackjack Dealer Win Simulation1 with Deck2', () => {
    let deck = getCustomizedDeck2ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(16);
    expect(status.getDealer().getHandValue()).toEqual(23);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Test Blackjack Player Win Simulation1 with Deck3', () => {
    let deck = getCustomizedDeck3ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(19);
    expect(status.getDealer().getHandValue()).toEqual(23);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Test Blackjack Player Win Simulation2 with Deck2', () => {
    let deck = getCustomizedDeck3ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(20);
    expect(status.getDealer().getHandValue()).toEqual(22);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Test Blackjack Dealer Win Simulation2 with Deck2', () => {
    let deck = getCustomizedDeck3ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);


    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayer().getHandValue()).toEqual(29);
    expect(status.getDealer().getHandValue()).toEqual(13);
    expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
    expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});