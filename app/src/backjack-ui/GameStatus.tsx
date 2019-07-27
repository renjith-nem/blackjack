import React, { Component } from 'react';
import { Status, GameStatus, WinStatus } from '../blackjack-core/Status';
import { Card as DisplayCard } from 'react-bootstrap';

const WIN_MESSAGE = 'Congratulations !!! You have won the game and received $';
const LOST_MESSAGE = 'Bad Luck. You lost the game. You lost $';
class GameStatusContainer extends Component<any, any> {
  render() {
    const status: Status = this.props.gameStatus;
    let message: String = 'Keep calm and make your best move .. !';
    if (status.getGameStatus() !== GameStatus.InProgress) {
      if (status.getPlayer().getWinStatus() === WinStatus.Won) {
        message = WIN_MESSAGE + status.getAmountWonLost();
      } else {
        message = LOST_MESSAGE + Math.abs(status.getAmountWonLost());
      }
    }
    return (
      <DisplayCard border="info" style={{ width: '25rem' }}>
        <DisplayCard.Header>Game Status</DisplayCard.Header>
        <DisplayCard.Body>
          <DisplayCard.Title>
            {GameStatus[status.getGameStatus()]}
          </DisplayCard.Title>
          <DisplayCard.Text>{message}</DisplayCard.Text>
        </DisplayCard.Body>
      </DisplayCard>
    );
  }
}

export default GameStatusContainer;
