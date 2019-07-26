import React, { Component } from 'react';
import { Room } from './Models';

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
    this.state.rooms.forEach(function(room: Room) {
      rooms.push(
        <div>
          <span>{room.name}</span>
          <span> </span>
          <span>Min Bet Amount : {room.betSize}</span>
          <span> </span>
          <span>
            <a href="/">Join</a>
          </span>
        </div>
      );
    });
    return <div>{rooms}</div>;
  }
}

export default BlackJackRooms;
