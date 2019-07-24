import {Deck, Suite, CardValue, Card, HiddenCard} from './Deck';
import {Status, GameStatus, GamePlayer, WinStatus} from './Status'
import UserType from './UserType'

const ACE_FACE_VALUE = 11;
const MAX_FACE_VALUE = 10;
const BLACKJACK_WIN_NUMBER = 21;
class BlackJack{
    
    private _betAmount: number;
    private _deck :Deck;

    private _status:GameStatus
    
    private _dealer_cards: Array<Card>
    private _winner:UserType;

    // When you have a feature of multi player the following two will need to move
    // into a seperate class and the Blackjack will have a list/dictionary of all the players playing.
    private _player_cards: Array<Card>
    private _playerId: number;
    constructor(playerId:number, betAmount:number, deck:Deck){
        this._betAmount = betAmount;
        this._deck = deck;
        this._status = GameStatus.InProgress;
        //Shuffle the cards
        // this._deck.shuffleCards();
        this._dealer_cards = new Array<Card>();
        this._player_cards = new Array<Card>();
        this._playerId = playerId;
        this._winner = UserType.Dealer;
    }

    getStatus(){
        let players = new Array<GamePlayer>();
        let dealer = undefined;
        let player = undefined;
        if(this._status === GameStatus.InProgress){
            dealer = new GamePlayer(UserType.Dealer, this._betAmount, this.getDealerCards(),
                        WinStatus.NA, 
                        this.getHandValue(UserType.Dealer));
            player = new GamePlayer(UserType.Player, this._betAmount, this.getPlayerCards(this._playerId),
                                    WinStatus.NA, 
                            this.getHandValue(UserType.Player, this._playerId), this._playerId);
        } else{
            dealer = new GamePlayer(UserType.Dealer, this._betAmount, this.getDealerCards(),
                        (this._winner === UserType.Dealer)?WinStatus.Won:WinStatus.Lost, 
                        this.getHandValue(UserType.Dealer));
            player = new GamePlayer(UserType.Player, this._betAmount, this.getPlayerCards(this._playerId),
                        (this._winner === UserType.Player)?WinStatus.Won:WinStatus.Lost,  
                            this.getHandValue(UserType.Player, this._playerId), this._playerId);
        }
        players.push(dealer, player);
        let gameStatus = new Status(this._status, players);
        return gameStatus;
    }

    getDealerCards(){
        // Assume that the 0th card is the card faced down. So return the 0th card as hidden.
        let cardsToReturn = new Array<Card>();
        for(let card = 0; card<this._dealer_cards.length; card++){
            if(this._status != GameStatus.Completed && card === 0){
                cardsToReturn.push(new Card(Number(HiddenCard.Hidden), Number(HiddenCard.Hidden)));
            } else{
                cardsToReturn.push(this._dealer_cards[card]);
            }
        }
        return cardsToReturn;
    }

    getPlayerCards(playerId:number){
        if(playerId != this._playerId){
            throw new EvalError('Invalid Player');
        }
        return this._player_cards;
    }

    deal(playerId:number){
        this.hit(UserType.Dealer, 0, 2);
        this.hit(UserType.Player, playerId, 2);
    }

    playHit(playerId:number){
        try{
            this.hit(UserType.Player, playerId, 1);
        }
        catch(e){
            this.stand(playerId);
        }
        return this.getStatus();
    }
    private hit(user:UserType, playerId:number, hitCount:number = 1){
        this.validateIfCanPlay(user, playerId);
        if(user === UserType.Player && playerId === this._playerId){
            Array.prototype.push.apply(this._player_cards, this.getHitCards(hitCount));
        } else if(user == UserType.Dealer){
            Array.prototype.push.apply(this._dealer_cards, this.getHitCards(hitCount));
        }
        this.validateIfCanPlay(user, playerId);
    }

    stand(playerId:number){
        // In a multi player use case, you do not draw for dealer and compute win here,
        // instead you wait for all players to play and then the dealer draws and computes.
        this.drawCardsForDealerBlackjack();
        this.computeBlackjackStatus();
    }

    private validateIfCanPlay(user:UserType, playerId:number){
        if(this.getHandValue(user, playerId) > BLACKJACK_WIN_NUMBER){
            throw new EvalError('Cannot hit again. You have exceeded the Win Number.');
        }
    }
    private computeBlackjackStatus(){
        let dealerHandValue = this.getHandValue(UserType.Dealer);
        let playerHandValue = this.getHandValue(UserType.Player);
        if(dealerHandValue == BLACKJACK_WIN_NUMBER && playerHandValue == BLACKJACK_WIN_NUMBER){
            this._status = GameStatus.Tie;
            return;
        }
        
        if(BLACKJACK_WIN_NUMBER > playerHandValue && playerHandValue > dealerHandValue){
            this._winner = UserType.Player
        }

        this._status = GameStatus.Completed;
    }
    private getHandValue(user:UserType, playerId:number=-1){
        if(user === UserType.Dealer && this._status == GameStatus.Completed){
            return this.findHandValue(this._dealer_cards);
        } else if(user === UserType.Player && this._playerId === playerId){
            return this.findHandValue(this._player_cards);
        }
        return 0;
    }

    private drawCardsForDealerBlackjack(){
        try{
            while(this.findHandValue(this._dealer_cards) <17){
                this.hit(UserType.Dealer, -1);
            }
        }
        catch(e){
            console.log('Error: ', e);
        }
    }
    private findHandValue(cards:Array<Card>){
        let handValue:number = 0;
        let aceValue:number = 0;
        cards.forEach(function(card){
            if(card.getCardValue() === CardValue.Ace){
                aceValue ++;
            }else{
                let cardValue = (Number(card.getCardValue()) > MAX_FACE_VALUE)?MAX_FACE_VALUE:Number(card.getCardValue());
                handValue += cardValue;
            }
        });
        
        if(aceValue > 0){
            handValue = this.findMaxHandValueWithAce(handValue, aceValue);
        }
        return handValue
    }

    private findMaxHandValueWithAce(handValue:number, noOfAces:number){
        // Ace value with max value as 1
        let minAceHandValue = handValue + (noOfAces * Number(CardValue.Ace));

        // Ace with max value of 11
        let maxAceHandValue = handValue + (noOfAces * ACE_FACE_VALUE);

        // Ace with alternate min value
        let alt = (noOfAces > 1)?noOfAces/2:noOfAces;
        let minAltAceHandValue = handValue + (alt * Number(CardValue.Ace)) 
                                    + ((noOfAces - alt) * ACE_FACE_VALUE); 
        // Ace with alternate max value
        let maxAltAceHandValue = handValue + (alt * ACE_FACE_VALUE) 
                                    + ((noOfAces - alt) * Number(CardValue.Ace));
        let maxHandValue = minAceHandValue;
        let diff = BLACKJACK_WIN_NUMBER - minAceHandValue;

        if((BLACKJACK_WIN_NUMBER - maxAceHandValue) > 0 &&  (BLACKJACK_WIN_NUMBER - maxAceHandValue) < diff){
            maxHandValue = maxAceHandValue;
            diff = BLACKJACK_WIN_NUMBER - maxAceHandValue; 
        } 
        
        if((BLACKJACK_WIN_NUMBER - minAltAceHandValue) > 0 &&  (BLACKJACK_WIN_NUMBER - minAltAceHandValue) < diff){
            maxHandValue = minAltAceHandValue;
            diff = BLACKJACK_WIN_NUMBER - minAltAceHandValue; 
        }

        if((BLACKJACK_WIN_NUMBER - maxAltAceHandValue) > 0 &&  (BLACKJACK_WIN_NUMBER - maxAltAceHandValue) < diff){
            maxHandValue = maxAltAceHandValue;
            diff = BLACKJACK_WIN_NUMBER - maxAltAceHandValue; 
        }
        return maxHandValue;
    }

    private getHitCards(hitCount:number){
        let cards = new Array<Card>();
        for(let hit=0; hit<hitCount; hit++){
            cards.push(this._deck.drawCard()!);
        }
        return cards;
    }
}

export default BlackJack