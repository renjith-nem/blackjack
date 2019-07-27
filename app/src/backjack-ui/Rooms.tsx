import React, { Component } from 'react';
import { Room } from './Models';
import { Card, CardDeck, Row, Container } from 'react-bootstrap';

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
    let data = [];
    let rooms: any = [];
    this.state.rooms.forEach(function(room: Room) {
      let roomLink = '/rooms/' + room.id;
      rooms.push(
        <Card>
          <Card.Body>
            <Card.Title>{room.name}</Card.Title>
            <Card.Text>
              The minimum bet amount to place when you join this room is $
              {room.betSize}.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Link href={roomLink}>Start Playing</Card.Link>
          </Card.Footer>
        </Card>
      );
    });
    data.push(<Row className="justify-content-md-center">Available Rooms</Row>);
    data.push(
      <Row>
        <CardDeck>{rooms}</CardDeck>
      </Row>
    );
    return <Container>{data}</Container>;
  }
}

export default BlackJackRooms;
