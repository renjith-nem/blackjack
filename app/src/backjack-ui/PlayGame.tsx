import React, { Component } from 'react';
import { Deck, Card } from '../blackjack-core/Deck';
import { Status, GameStatus } from '../blackjack-core/Status';
import Blackjack from '../blackjack-core/Blackjack';
import GameStatusContainer from './GameStatus';
import './Game.css';
import {
  Button,
  Card as DisplayCard,
  ButtonGroup,
  ButtonToolbar,
  Row,
  Container,
  Col
} from 'react-bootstrap';

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
    let blackjack = this.state.blackjack;
    blackjack.hit(123);
    this.setState({ blackjack: blackjack });
  };

  stand = () => {
    let blackjack = this.state.blackjack;
    blackjack.stand(123);
    this.setState({ blackjack: blackjack });
  };

  playAgain = () => {
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
    let dealerScore = 'NA';
    if (gameStatus.getGameStatus() === GameStatus.Completed) {
      dealerScore = gameStatus
        .getDealer()
        .getHandValue()
        .toString();
    }
    const playerScore = gameStatus
      .getPlayer()
      .getHandValue()
      .toString();
    return (
      <Container>
        <Row className="boundary">
          <Col>
            <CardsConatiner
              cards={dealerCards}
              displayText={"Dealer's Cards"}
              score={dealerScore}
            />
          </Col>
        </Row>
        <Row className="boundary">
          <Col>
            <CardsConatiner
              cards={playerCards}
              displayText={'Your Cards'}
              score={playerScore}
            />
          </Col>
        </Row>
        <Row className="boundary">
          <Col>
            <PlayerControls
              hitAction={hitAction}
              standAction={standAction}
              playerId={playerId}
              playAgainAction={playAgainAction}
            />
          </Col>
        </Row>
        <Row className="boundary">
          <Col>
            <GameStatusContainer gameStatus={gameStatus} />
          </Col>
        </Row>
      </Container>
    );
  }
}

class PlayerControls extends Component<any, any> {
  render() {
    return (
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button onClick={this.props.hitAction}> Hit </Button>
          <Button onClick={this.props.standAction}> Stand </Button>
        </ButtonGroup>

        <ButtonGroup className="mr-2" aria-label="Second group">
          <Button onClick={this.props.playAgainAction}> Play Again </Button>
          <Button href="/rooms"> Quit </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}

class CardsConatiner extends Component<any, any> {
  render() {
    const cards: Array<Card> = this.props.cards;
    const displayText: string = this.props.displayText;
    const score: string = this.props.score;
    let data: any = [];
    // data.push(<div>{displayText}</div>);
    cards.forEach(function(card) {
      let card_name = card.getSuite() + '_' + card.getCardValue();
      let src = require('../backjack-ui/resources/cards/' + card_name + '.png');
      data.push(
        <span>
          <img src={src} alt={card_name} className="card-boundary" />
        </span>
      );
    });
    return (
      <DisplayCard>
        <DisplayCard.Header>{displayText}</DisplayCard.Header>
        <DisplayCard.Body>
          <blockquote className="blockquote mb-0">
            <p>{data}</p>
            <footer className="blockquote-footer">Hand Value : {score}</footer>
          </blockquote>
        </DisplayCard.Body>
      </DisplayCard>
    );
  }
}

export default BlackJackGame;
