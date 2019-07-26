import React, { Component } from 'react';
import { Room } from './Models';
import { Route, BrowserRouter as Router, Link, match } from 'react-router-dom';
import BlackJackGame from './PlayGame';
import { Button, Accordion, Card } from 'react-bootstrap';

class BlackJackRooms extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rooms: new Array<Room>()
    };
  }
  componentDidMount() {
    fetch('/rooms')
      .then(response => {
        return response.json();
      })
      .then(resp => {
        let rooms: [Room] = resp;
        this.setState({ rooms: rooms });
      });
  }
  render() {
    let rooms: any = [];
    let key = 0;
    this.state.rooms.forEach(function(room: Room) {
      let roomLink = '/rooms/' + room.id;
      let keyStr = String(key);
      key++;
      console.log(keyStr);
      rooms.push(
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {room.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={keyStr}>
            <Card.Body>
              <div>
                <span> Minimum Bet Amount = ${room.betSize}</span>
              </div>
              <div>
                <a href={roomLink}>Join</a>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
    return <Accordion defaultActiveKey="1">{rooms}</Accordion>;
  }
}

export default BlackJackRooms;
