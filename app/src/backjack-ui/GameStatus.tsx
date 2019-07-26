import React, { Component } from 'react';
import { Deck, Card } from '../blackjack-core/Deck';
import { Status, GameStatus, WinStatus } from '../blackjack-core/Status';
import Blackjack from '../blackjack-core/Blackjack';
import {
  Button,
  Card as DisplayCard,
  ButtonGroup,
  ButtonToolbar,
  Modal
} from 'react-bootstrap';

const WIN_MESSAGE = 'Congratulations !!! You have won the game and received $';
const LOST_MESSAGE = 'Bad Luck. You lost the game. You lost $';
class GameStatusContainer extends Component<any, any> {
  render() {
    const status: Status = this.props.gameStatus;
    let data: any = [];
    // //   data.push(<div>Status : {GameStatus[status.getGameStatus()]}</div>);
    //     let didPlayerWin:Boolean = false;
    //     let message:
    // //   if (status.getGameStatus() !== GameStatus.InProgress) {
    //     // didPlayerWin = (status.getPlayer().getWinStatus() === WinStatus.Won )?true:false;

    //     // data.push(
    //     //   <div>Dealer Won : {WinStatus[status.getDealer().getWinStatus()]}</div>
    //     // );
    //     // data.push(
    //     //   <div>Player Won : {WinStatus[status.getPlayer().getWinStatus()]}</div>
    //     // );
    //     // data.push(<div>Bet Won/Lost : {status.getAmountWonLost()}</div>);
    // //   }
    return <div>{data}</div>;
    // return (
    //     <div>rty</div>
    //   );
  }
}

class MyVerticallyCenteredModal extends Component<any, any> {
  render() {
    return (
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GameStatusContainer;
