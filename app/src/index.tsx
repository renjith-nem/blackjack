import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BlackJackGame from './backjack-ui/PlayGame';
import BlackJackRooms from './backjack-ui/Rooms';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BlackJackRooms />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
