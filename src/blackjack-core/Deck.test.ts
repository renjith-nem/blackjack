import {Deck, Suite, CardValue} from "./Deck";

test('Test Deck Initialization', () => {
    let deck = new Deck();
    expect(deck.getCards().length).toEqual(52);
    expect(deck.getCards()[0].getSuite()).toEqual(Suite.Spades);
    expect(deck.getCards()[0].getCardValue()).toEqual(CardValue.Ace);
    expect(deck.getCards()[1].getSuite()).toEqual(Suite.Spades);
    expect(deck.getCards()[1].getCardValue()).toEqual(CardValue.Two);
    expect(deck.getCards()[2].getSuite()).toEqual(Suite.Spades);
    expect(deck.getCards()[2].getCardValue()).toEqual(CardValue.Three);
    expect(deck.getCards()[49].getSuite()).toEqual(Suite.Clubs);
    expect(deck.getCards()[49].getCardValue()).toEqual(CardValue.Jack);
    expect(deck.getCards()[50].getSuite()).toEqual(Suite.Clubs);
    expect(deck.getCards()[50].getCardValue()).toEqual(CardValue.Queen);
    expect(deck.getCards()[51].getSuite()).toEqual(Suite.Clubs);
    expect(deck.getCards()[51].getCardValue()).toEqual(CardValue.King);
});

// Cannot test the shuffle logic as it can have probablilty instances when
// The shuffle will yield what we are expecting in the asserts.
test('Test Deck Shuffle', () => {
    let deck = new Deck();
    deck.shuffleCards();
    expect(deck.getCards().length).toEqual(52);
});

test('Test Deck Draw cards', () => {
    let deck = new Deck();
    deck.shuffleCards();
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