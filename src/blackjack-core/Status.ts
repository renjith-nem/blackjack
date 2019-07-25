import UserType from './UserType';
import { Card } from './Deck';
export class Status {
  private _gameStatus: GameStatus;
  private _dealer: GamePlayer;
  private _player: GamePlayer;
  private _amountWonLost: number;

  constructor(
    gameStatus: GameStatus,
    dealer: GamePlayer,
    player: GamePlayer,
    amountWonLost: number = 0
  ) {
    this._gameStatus = gameStatus;
    this._player = player;
    this._dealer = dealer;
    this._amountWonLost = amountWonLost;
  }

  getGameStatus() {
    return this._gameStatus;
  }

  getPlayer() {
    return this._player;
  }

  getDealer() {
    return this._dealer;
  }

  getAmountWonLost() {
    return this._amountWonLost;
  }
}

export enum GameStatus {
  NotStarted = 1,
  InProgress = 2,
  Tie = 3,
  Completed = 4
}

export enum WinStatus {
  NA = 1,
  Won = 2,
  Lost = 3
}

export class GamePlayer {
  private _userType: UserType;
  private _playerId: number;
  private _winStatus: WinStatus;
  private _handValue: number;
  private _betAmountPlaced: number;
  private _betAmountWon: number;
  private _cardsInHand: Array<Card>;

  constructor(
    userType: UserType,
    betPlaced: number = 0,
    cards: Array<Card>,
    winStatus: WinStatus = WinStatus.NA,
    handValue: number = -1,
    playerId: number = -1,
    betWon: number = 0
  ) {
    this._handValue = handValue;
    this._userType = userType;
    this._cardsInHand = cards;
    this._winStatus = winStatus;
    //-1 is used for Dealer user type
    this._playerId = playerId;
    this._betAmountPlaced = betPlaced;
    this._betAmountWon = betWon;
  }

  getUserType() {
    return this._userType;
  }

  getPlayerId() {
    return this._playerId;
  }

  getWinStatus() {
    return this._winStatus;
  }

  getHandValue() {
    return this._handValue;
  }

  getBetPlaced() {
    return this._betAmountPlaced;
  }

  getBetWon() {
    return this._betAmountWon;
  }

  getCards() {
    return this._cardsInHand;
  }
}
