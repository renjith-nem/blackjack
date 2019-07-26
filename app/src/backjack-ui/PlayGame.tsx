import React, { Component, FormEvent, ChangeEvent } from 'react';
import {
  Deck,
  Suite,
  CardValue,
  HiddenCard,
  Card
} from '../blackjack-core/Deck';
import {
  Status,
  GameStatus,
  GamePlayer,
  WinStatus
} from '../blackjack-core/Status';
import Blackjack from '../blackjack-core/Blackjack';

class BlackJackGame extends Component<any, any> {
  render() {
    return (
      <ErrorBoundary>
        <BlackJackGameContainer />
      </ErrorBoundary>
    );
  }
}
class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

class BlackJackGameContainer extends Component<any, any> {
  constructor(props: any) {
    super(props);
    let deck = new Deck();
    let blackjack = new Blackjack(123, 10, deck);
    blackjack.deal();
    this.state = {
      blackjack: blackjack,
      hasError: false
    };
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    return (
      <GameContainer
        playerCards={this.state.blackjack.getPlayerCards(123)}
        dealerCards={this.state.blackjack.getDealerCards()}
        gameStatus={this.state.blackjack.getStatus()}
        hitAction={this.hit}
        standAction={this.stand}
        playAgainAction={this.playAgain}
        playerId={123}
      />
    );
  }

  hit = () => {
    console.log('hto');
    let blackjack = this.state.blackjack;
    blackjack.hit(123);
    this.setState({ blackjack: blackjack });
  };

  stand = () => {
    console.log('stand');
    let blackjack = this.state.blackjack;
    blackjack.stand(123);
    this.setState({ blackjack: blackjack });
  };

  playAgain = () => {
    console.log('play again');
    let blackjack = this.state.blackjack;
    let deck = new Deck();
    blackjack = new Blackjack(123, 10, deck);
    blackjack.deal();
    this.setState({ blackjack: blackjack });
  };
}

class GameContainer extends Component<any, any> {
  render() {
    const dealerCards: Array<Card> = this.props.dealerCards;
    const playerCards: Array<Card> = this.props.playerCards;
    const gameStatus: Status = this.props.gameStatus;
    const hitAction = this.props.hitAction;
    const standAction = this.props.standAction;
    const playerId = this.props.playerId;
    const playAgainAction = this.props.playAgainAction;
    return (
      <div>
        <CardsConatiner cards={dealerCards} displayText={"Dealer's Cards"} />
        <div>---------</div>
        <CardsConatiner cards={playerCards} displayText={'Your Cards'} />
        <div>---------</div>
        <PlayerControls
          hitAction={hitAction}
          standAction={standAction}
          playerId={playerId}
          playAgainAction={playAgainAction}
        />
        <GameStatusContainer gameStatus={gameStatus} />
      </div>
    );
  }
}

class GameStatusContainer extends Component<any, any> {
  render() {
    const status: Status = this.props.gameStatus;
    let data = [];
    data.push(<div>Status : {GameStatus[status.getGameStatus()]}</div>);
    if (status.getGameStatus() !== GameStatus.InProgress) {
      data.push(
        <div>Dealer Won : {WinStatus[status.getDealer().getWinStatus()]}</div>
      );
      data.push(
        <div>Player Won : {WinStatus[status.getPlayer().getWinStatus()]}</div>
      );
      data.push(<div>Bet Won/Lost : {status.getAmountWonLost()}</div>);
    }
    return <div>{data}</div>;
  }
}

class PlayerControls extends Component<any, any> {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.hitAction}>
          Hit !!
        </button>
        <button type="button" onClick={this.props.standAction}>
          Stand !!
        </button>
        <button type="button" onClick={this.props.playAgainAction}>
          Play Again !!
        </button>
      </div>
    );
  }
}

class CardsConatiner extends Component<any, any> {
  render() {
    const cards: Array<Card> = this.props.cards;
    const displayText: string = this.props.displayText;
    let data: any = [];
    data.push(<div>{displayText}</div>);
    cards.forEach(function(card) {
      let card_name = card.getSuite() + '_' + card.getCardValue();
      let src = require('../backjack-ui/resources/cards/' + card_name + '.png');
      data.push(
        <span>
          <img src={src} alt={card_name} />
        </span>
      );
      data.push(<span> </span>);
    });
    return <div>{data}</div>;
  }
}

export default BlackJackGame;
