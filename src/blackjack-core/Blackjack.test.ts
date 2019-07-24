import {Deck, Suite, CardValue, HiddenCard, Card} from "./Deck";
import {Status, GameStatus, GamePlayer, WinStatus} from './Status'
import Blackjack from './Blackjack'
import UserType from "./UserType";

const PLAYER_ID = 333;

function getCustomizedDeck1ForTesting(){
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

test('Test Blackjack Dealer Win Simulation1 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);

    
    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(17);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayers()[0].getHandValue()).toEqual(22);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);
    expect(status.getPlayers()[1].getWinStatus()).toEqual(WinStatus.Lost);
    expect(status.getPlayers()[0].getWinStatus()).toEqual(WinStatus.Won);
});

test('Test Blackjack Dealer Win Simulation2 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);

    
    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(17);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(11);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);
    expect(status.getPlayers()[0].getHandValue()).toEqual(22);
    expect(status.getPlayers()[1].getWinStatus()).toEqual(WinStatus.Lost);
    expect(status.getPlayers()[0].getWinStatus()).toEqual(WinStatus.Won);
});

test('Test Blackjack Dealer Win Simulation2 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);

    
    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(17);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(11);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);

    blackjack.stand(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);
    expect(status.getPlayers()[0].getHandValue()).toEqual(22);
    expect(status.getPlayers()[1].getWinStatus()).toEqual(WinStatus.Lost);
    expect(status.getPlayers()[0].getWinStatus()).toEqual(WinStatus.Won);
});

test('Test Blackjack Dealer Win Simulation3 with Deck1', () => {
    let deck = getCustomizedDeck1ForTesting();
    let blackjack = new Blackjack(PLAYER_ID, 10, deck);
    blackjack.deal(PLAYER_ID);
    expect(blackjack.getDealerCards().length).toEqual(2);
    expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);

    
    let status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(17);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(11);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.InProgress);
    expect(status.getPlayers()[1].getHandValue()).toEqual(20);

    blackjack.playHit(PLAYER_ID);
    status = blackjack.getStatus();
    expect(status.getGameStatus()).toEqual(GameStatus.Completed);
    expect(status.getPlayers()[1].getHandValue()).toEqual(30);
    expect(status.getPlayers()[0].getHandValue()).toEqual(17);
    expect(status.getPlayers()[1].getWinStatus()).toEqual(WinStatus.Lost);
    expect(status.getPlayers()[0].getWinStatus()).toEqual(WinStatus.Won);
});