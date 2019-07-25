import { Deck, Suite, CardValue, HiddenCard, Card } from './Deck';
import { Status, GameStatus, GamePlayer, WinStatus } from './Status';
import Blackjack from './Blackjack';
import UserType from './UserType';

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

function getCustomizedDeck4ForTesting() {
  let predefinedCards = new Array<Card>();
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.Three));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));
  predefinedCards.push(new Card(Suite.Hearts, CardValue.Ace));
  predefinedCards.push(new Card(Suite.Spades, CardValue.Five));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.King));

  let deck = new Deck();
  deck.setCards(predefinedCards);
  return deck;
}

function getCustomizedDeck5ForTesting() {
  let predefinedCards = new Array<Card>();
  predefinedCards.push(new Card(Suite.Spades, CardValue.Ace));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.Six));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.Eight));
  predefinedCards.push(new Card(Suite.Hearts, CardValue.Four));
  predefinedCards.push(new Card(Suite.Hearts, CardValue.Two));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.King));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.Five));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.Three));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.King));
  predefinedCards.push(new Card(Suite.Hearts, CardValue.Ace));

  let deck = new Deck();
  deck.setCards(predefinedCards);
  return deck;
}

function getCustomizedDeck6ForTesting() {
  let predefinedCards = new Array<Card>();
  predefinedCards.push(new Card(Suite.Spades, CardValue.Ace));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.Eight));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.Six));
  predefinedCards.push(new Card(Suite.Hearts, CardValue.Four));
  predefinedCards.push(new Card(Suite.Hearts, CardValue.Two));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.King));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.Five));
  predefinedCards.push(new Card(Suite.Clubs, CardValue.Three));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));
  predefinedCards.push(new Card(Suite.Diamonds, CardValue.King));
  predefinedCards.push(new Card(Suite.Hearts, CardValue.Ace));

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

test('Test Initialisation', () => {
  let deck = new Deck();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  expect(blackjack.getDealerCards().length).toEqual(0);
  expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(0);
});

test('Test Deal with Dealer card hidden', () => {
  let deck = new Deck();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();
  expect(blackjack.getDealerCards().length).toEqual(2);
  expect(blackjack.getPlayerCards(PLAYER_ID).length).toEqual(2);
  expect(blackjack.getDealerCards()[1].getCardValue()).toEqual(
    HiddenCard.Hidden
  );
  expect(blackjack.getDealerCards()[1].getSuite()).toEqual(HiddenCard.Hidden);
  expect(blackjack.getDealerCards()[0].getCardValue()).not.toEqual(
    HiddenCard.Hidden
  );
  expect(blackjack.getDealerCards()[0].getSuite()).not.toEqual(
    HiddenCard.Hidden
  );
});

test('Simulation1 with Deck1 : Player Win', () => {
  let deck = getCustomizedDeck1ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.stand(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getDealer().getHandValue()).toEqual(19);
  expect(status.getPlayer().getHandValue()).toEqual(13);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Simulation2 with Deck1 : Dealer Win', () => {
  let deck = getCustomizedDeck1ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  expect(() => {
    blackjack.hit(PLAYER_ID);
  }).toThrow();

  expect(() => {
    blackjack.stand(PLAYER_ID);
  }).toThrow();

  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(23);
  expect(status.getDealer().getHandValue()).toEqual(19);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Simulation3 with Deck1 : Dealer Win', () => {
  let deck = getCustomizedDeck1ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.stand(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(14);
  expect(status.getDealer().getHandValue()).toEqual(19);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Simulation4 with Deck1 : Dealer Win', () => {
  let deck = getCustomizedDeck1ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  blackjack.stand(PLAYER_ID);

  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(13);
  expect(status.getDealer().getHandValue()).toEqual(19);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Simulation1 with Deck2 : Dealer Win', () => {
  let deck = getCustomizedDeck2ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  blackjack.hit(PLAYER_ID);
  expect(() => {
    blackjack.hit(PLAYER_ID);
  }).toThrow();

  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(28);
  expect(status.getDealer().getHandValue()).toEqual(15);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Simulation2 with Deck2 : Dealer Win', () => {
  let deck = getCustomizedDeck2ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.stand(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(14);
  expect(status.getDealer().getHandValue()).toEqual(17);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Simulation3 with Deck2 : Player Win', () => {
  let deck = getCustomizedDeck2ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  blackjack.hit(PLAYER_ID);
  blackjack.stand(PLAYER_ID);

  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(20);
  expect(status.getDealer().getHandValue()).toEqual(23);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Simulation1 with Deck3 : Player Win', () => {
  let deck = getCustomizedDeck3ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.stand(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(17);
  expect(status.getDealer().getHandValue()).toEqual(25);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Simulation2 with Deck3 : Player Win', () => {
  let deck = getCustomizedDeck3ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.stand(PLAYER_ID);
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(18);
  expect(status.getDealer().getHandValue()).toEqual(24);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
});

test('Simulation3 with Deck3 : Dealer Win', () => {
  let deck = getCustomizedDeck3ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.InProgress);

  blackjack.hit(PLAYER_ID);
  blackjack.hit(PLAYER_ID);
  expect(() => {
    blackjack.hit(PLAYER_ID);
  }).toThrow();
  status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(27);
  expect(status.getDealer().getHandValue()).toEqual(15);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
});

test('Simulation1 with Deck4 : Blackjack Player Win', () => {
  let deck = getCustomizedDeck4ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();
  expect(() => {
    blackjack.hit(PLAYER_ID);
  }).toThrow();

  expect(() => {
    blackjack.stand(PLAYER_ID);
  }).toThrow();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(21);
  expect(status.getDealer().getHandValue()).toEqual(16);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getAmountWonLost()).toEqual(25);
});

test('Simulation1 with Deck5 : Dealer Win', () => {
  let deck = getCustomizedDeck5ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  blackjack.hit(PLAYER_ID);
  blackjack.hit(PLAYER_ID);
  blackjack.hit(PLAYER_ID);
  expect(() => {
    blackjack.hit(PLAYER_ID);
  }).toThrow();

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(23);
  expect(status.getDealer().getHandValue()).toEqual(13);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Won);
  expect(status.getAmountWonLost()).toEqual(-10);
});

test('Simulation2 with Deck5 : Player Win', () => {
  let deck = getCustomizedDeck5ForTesting();
  let blackjack = new Blackjack(PLAYER_ID, 10, deck);
  blackjack.deal();

  blackjack.hit(PLAYER_ID);
  blackjack.hit(PLAYER_ID);
  blackjack.hit(PLAYER_ID);
  blackjack.stand(PLAYER_ID);

  let status = blackjack.getStatus();
  expect(status.getGameStatus()).toEqual(GameStatus.Completed);
  expect(status.getPlayer().getHandValue()).toEqual(19);
  expect(status.getDealer().getHandValue()).toEqual(17);
  expect(status.getPlayer().getWinStatus()).toEqual(WinStatus.Won);
  expect(status.getDealer().getWinStatus()).toEqual(WinStatus.Lost);
  expect(status.getAmountWonLost()).toEqual(20);
});
