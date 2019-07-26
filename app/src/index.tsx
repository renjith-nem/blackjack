import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BlackJackGame from './backjack-ui/PlayGame';
import BlackJackRooms from './backjack-ui/Rooms';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BlackJackRooms} />
        <Route exact path="/rooms" component={BlackJackRooms} />
        <Route exact path="/rooms/:id" component={BlackJackGame} />
      </Switch>
    </BrowserRouter>
  </div>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
