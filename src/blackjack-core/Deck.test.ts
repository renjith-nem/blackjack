import { Deck, Suite, CardValue, Card } from "./Deck";

// Cannot test the shuffle logic as it can have probablilty instances when
// The shuffle will yield what we are expecting in the asserts.
test('Test Deck Initialization', () => {
    let deck = new Deck();
    expect(deck.getCards().length).toEqual(52);
});

test('Test Deck Draw cards', () => {
    let deck = new Deck();
    expect(deck.getCards().length).toEqual(52);

    let expectedLastCard = deck.getCards()[51];
    expect(expectedLastCard).toBeDefined();

    let cardDrawn = deck.drawCard();
    expect(cardDrawn).toBeDefined();
    expect(deck.getCards().length).toEqual(51);
    expect(expectedLastCard.getCardValue()).toEqual(cardDrawn!.getCardValue());

    expectedLastCard = deck.getCards()[50];
    expect(expectedLastCard).toBeDefined();

    cardDrawn = deck.drawCard();
    expect(cardDrawn).toBeDefined();
    expect(deck.getCards().length).toEqual(50);
    expect(expectedLastCard.getCardValue()).toEqual(cardDrawn!.getCardValue());
});

test('Test Set cards for test cases', () => {
    let predefinedCards = new Array<Card>();
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Five));
    predefinedCards.push(new Card(Suite.Hearts, CardValue.Jack));
    predefinedCards.push(new Card(Suite.Spades, CardValue.Nine));
    predefinedCards.push(new Card(Suite.Diamonds, CardValue.Ace));

    let deck = new Deck();
    deck.setCards(predefinedCards);
    expect(deck.getCards().length).toEqual(4);
    let cardDrawn = deck.drawCard();
    expect(cardDrawn).toBeDefined();
    expect(deck.getCards().length).toEqual(3);
    expect(CardValue.Ace).toEqual(cardDrawn!.getCardValue());
    expect(Suite.Diamonds).toEqual(cardDrawn!.getSuite());

    cardDrawn = deck.drawCard();
    expect(cardDrawn).toBeDefined();
    expect(deck.getCards().length).toEqual(2);
    expect(CardValue.Nine).toEqual(cardDrawn!.getCardValue());
    expect(Suite.Spades).toEqual(cardDrawn!.getSuite());
});