import { Deck, CardValue, Card, HiddenCard } from './Deck';
import { Status, GameStatus, GamePlayer, WinStatus } from './Status';
import UserType from './UserType';

const ACE_FACE_VALUE = 11;
const MAX_FACE_VALUE = 10;
const BLACKJACK_WIN_NUMBER = 21;
class BlackJack {
  private _betAmount: number;
  private _deck: Deck;

  private _status: GameStatus;

  private _dealer_cards: Array<Card>;
  private _winner: UserType;

  // When you have a feature of multi player the following two will need to move
  // into a seperate class and the Blackjack will have a list/dictionary of all the players playing.
  private _player_cards: Array<Card>;
  private _playerId: number;
  constructor(playerId: number, betAmount: number, deck: Deck) {
    this._betAmount = betAmount;
    this._deck = deck;
    this._status = GameStatus.InProgress;
    //Shuffle the cards
    // this._deck.shuffleCards();
    this._dealer_cards = new Array<Card>();
    this._player_cards = new Array<Card>();
    this._playerId = playerId;
    this._winner = UserType.Dealer;
  }

  getStatus() {
    let dealer = undefined;
    let player = undefined;
    let amountWonLost = 0;
    player = new GamePlayer(
      UserType.Player,
      this._betAmount,
      this.getPlayerCards(this._playerId),
      this._winner === UserType.Player ? WinStatus.Won : WinStatus.Lost,
      this.getHandValue(UserType.Player, this._playerId),
      this._playerId
    );
    if (
      this._status === GameStatus.Completed ||
      this._status === GameStatus.Tie
    ) {
      dealer = new GamePlayer(
        UserType.Dealer,
        this._betAmount,
        this.getDealerCards(),
        this._winner === UserType.Dealer ? WinStatus.Won : WinStatus.Lost,
        this.getHandValue(UserType.Dealer)
      );
      amountWonLost = this.calculateAmountWonOrLost(amountWonLost);
    }
    let gameStatus = new Status(this._status, dealer!, player, amountWonLost);
    return gameStatus;
  }

  getDealerCards() {
    // Assume that the 0th card is the card faced down. So return the 0th card as hidden.
    let cardsToReturn = new Array<Card>();
    for (let card = 0; card < this._dealer_cards.length; card++) {
      if (this._status !== GameStatus.Completed && card === 1) {
        cardsToReturn.push(
          new Card(Number(HiddenCard.Hidden), Number(HiddenCard.Hidden))
        );
      } else {
        cardsToReturn.push(this._dealer_cards[card]);
      }
    }
    return cardsToReturn;
  }

  getPlayerCards(playerId: number) {
    if (playerId !== this._playerId) {
      throw new EvalError('Invalid Player');
    }
    return this._player_cards;
  }

  deal() {
    this.playHit(UserType.Player, this._playerId);
    this.playHit(UserType.Dealer, 0);

    this.playHit(UserType.Player, this._playerId);
    this.playHit(UserType.Dealer, 0);

    let playerHandValue = this.getHandValue(UserType.Player, this._playerId);
    if (playerHandValue === BLACKJACK_WIN_NUMBER) {
      this._status = GameStatus.Completed;
      this._winner = UserType.Player;
      return;
    }
  }

  hit(playerId: number) {
    this.playHit(UserType.Player, playerId);
  }

  stand(playerId: number) {
    this.validateIfCanPlay(UserType.Player, playerId);
    // In a multi player use case, you do not draw for dealer and compute win here,
    // instead you wait for all players to play and then the dealer draws and computes.
    this.drawCardsForDealerBlackjack();
    // Set the game status to completed as the user has made his stand.
    this._status = GameStatus.Completed;
    this.computeBlackjackStatus();
  }

  private playHit(user: UserType, playerId: number) {
    this.validateIfCanPlay(user, playerId);
    if (user === UserType.Player && playerId === this._playerId) {
      Array.prototype.push.apply(this._player_cards, this.getHitCards(1));
    } else if (user === UserType.Dealer) {
      Array.prototype.push.apply(this._dealer_cards, this.getHitCards(1));
    }
    this.validateIfCanPlay(user, playerId);
  }

  private calculateAmountWonOrLost(amountWonLost: number): number {
    if (this._winner === UserType.Player) {
      if (this._player_cards.length === 2) {
        amountWonLost = this._betAmount + this._betAmount * 1.5;
      } else {
        amountWonLost += this._betAmount * 2;
      }
    } else {
      amountWonLost -= this._betAmount;
    }
    return amountWonLost;
  }

  private validateIfCanPlay(user: UserType, playerId: number) {
    if (
      user !== UserType.Dealer &&
      (this._status === GameStatus.Completed ||
        this.getHandValue(user, playerId) > BLACKJACK_WIN_NUMBER)
    ) {
      this._status = GameStatus.Completed;
      throw new EvalError('Game has been completed. You cannot play anymore.');
    }
  }
  private computeBlackjackStatus() {
    let dealerHandValue = this.getHandValue(UserType.Dealer);
    let playerHandValue = this.getHandValue(UserType.Player, this._playerId);
    if (
      dealerHandValue === BLACKJACK_WIN_NUMBER &&
      playerHandValue === BLACKJACK_WIN_NUMBER
    ) {
      this._status = GameStatus.Tie;
      return;
    }

    if (dealerHandValue === BLACKJACK_WIN_NUMBER) {
      this._status = GameStatus.Completed;
      this._winner = UserType.Dealer;
      return;
    }

    if (playerHandValue === BLACKJACK_WIN_NUMBER) {
      this._status = GameStatus.Completed;
      this._winner = UserType.Player;
      return;
    }

    if (dealerHandValue === playerHandValue) {
      this._status = GameStatus.Tie;
      return;
    } else if (
      dealerHandValue > BLACKJACK_WIN_NUMBER &&
      playerHandValue < BLACKJACK_WIN_NUMBER
    ) {
      this._winner = UserType.Player;
    } else if (
      playerHandValue > BLACKJACK_WIN_NUMBER &&
      dealerHandValue < BLACKJACK_WIN_NUMBER
    ) {
      this._winner = UserType.Dealer;
    } else if (playerHandValue > dealerHandValue) {
      this._winner = UserType.Player;
    }
    this._status = GameStatus.Completed;
  }
  private getHandValue(user: UserType, playerId: number = -1) {
    if (user === UserType.Dealer && this._status === GameStatus.Completed) {
      return this.findHandValue(this._dealer_cards);
    } else if (user === UserType.Player && this._playerId === playerId) {
      return this.findHandValue(this._player_cards);
    }
    return 0;
  }

  private drawCardsForDealerBlackjack() {
    if (this._status === GameStatus.Completed) {
      return;
    }
    try {
      while (this.findHandValue(this._dealer_cards) < 17) {
        this.playHit(UserType.Dealer, -1);
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  }
  private findHandValue(cards: Array<Card>) {
    let handValue: number = 0;
    let aceValue: number = 0;
    cards.forEach(function(card) {
      if (card.getCardValue() === CardValue.Ace) {
        aceValue++;
      } else {
        let cardValue =
          Number(card.getCardValue()) > MAX_FACE_VALUE
            ? MAX_FACE_VALUE
            : Number(card.getCardValue());
        handValue += cardValue;
      }
    });

    if (aceValue > 0) {
      handValue = this.findMaxHandValueWithAce(handValue, aceValue);
    }
    return handValue;
  }

  private findMaxHandValueWithAce(handValue: number, noOfAces: number) {
    // Ace value with max value as 1
    let minAceHandValue = handValue + noOfAces * Number(CardValue.Ace);

    // Ace with max value of 11
    let maxAceHandValue = handValue + noOfAces * ACE_FACE_VALUE;

    // Ace with alternate min value
    let alt = noOfAces > 1 ? noOfAces / 2 : noOfAces;
    let minAltAceHandValue =
      handValue +
      alt * Number(CardValue.Ace) +
      (noOfAces - alt) * ACE_FACE_VALUE;
    // Ace with alternate max value
    let maxAltAceHandValue =
      handValue +
      alt * ACE_FACE_VALUE +
      (noOfAces - alt) * Number(CardValue.Ace);
    let maxHandValue = minAceHandValue;
    let diff = BLACKJACK_WIN_NUMBER - minAceHandValue;
    if (diff === 0) {
      return maxHandValue;
    }

    if (
      BLACKJACK_WIN_NUMBER - maxAceHandValue >= 0 &&
      BLACKJACK_WIN_NUMBER - maxAceHandValue < diff
    ) {
      maxHandValue = maxAceHandValue;
      diff = BLACKJACK_WIN_NUMBER - maxAceHandValue;
    }
    if (diff === 0) {
      return maxHandValue;
    }
    if (
      BLACKJACK_WIN_NUMBER - minAltAceHandValue >= 0 &&
      BLACKJACK_WIN_NUMBER - minAltAceHandValue < diff
    ) {
      maxHandValue = minAltAceHandValue;
      diff = BLACKJACK_WIN_NUMBER - minAltAceHandValue;
    }
    if (diff === 0) {
      return maxHandValue;
    }
    if (
      BLACKJACK_WIN_NUMBER - maxAltAceHandValue >= 0 &&
      BLACKJACK_WIN_NUMBER - maxAltAceHandValue < diff
    ) {
      maxHandValue = maxAltAceHandValue;
      diff = BLACKJACK_WIN_NUMBER - maxAltAceHandValue;
    }
    return maxHandValue;
  }

  private getHitCards(hitCount: number) {
    let cards = new Array<Card>();
    cards.push(this._deck.drawCard()!);
    return cards;
  }
}

export default BlackJack;
