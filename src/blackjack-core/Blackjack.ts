import {Deck, Suite, CardValue, Card, HiddenCard} from './Deck';
import UserType from './UserType'

class BlackJack{
    
    private _betAmount: number;
    private _deck :Deck;
    
    private _dealer_cards: Array<Card>

    // When you have a feature of multi player the following two will need to move
    // into a seperate class and the Blackjack will have a list/dictionary of all the players playing.
    private _player_cards: Array<Card>
    private _playerId: number;
    constructor(playerId:number, betAmount:number){
        this._betAmount = betAmount;
        this._deck = new Deck();
        //Shuffle the cards
        this._deck.shuffleCards();
        this._dealer_cards = new Array<Card>();
        this._player_cards = new Array<Card>();
        this._playerId = playerId;
    }

    getDealerCards(){
        // Assume that the 0th card is the card faced down. So return the 0th card as hidden.
        let cardsToReturn = new Array<Card>();
        for(let card = 0; card<this._dealer_cards.length; card++){
            if(card === 0){
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

    hit(user:UserType, playerId:number, hitCount:number = 1){
        if(user === UserType.Player && playerId === this._playerId){
            Array.prototype.push.apply(this._player_cards, this.getHitCards(hitCount));
            return this.getPlayerCards(playerId);
        } else if(user == UserType.Dealer){
            Array.prototype.push.apply(this._dealer_cards, this.getHitCards(hitCount));
            return this.getDealerCards();
        }
        throw new EvalError('Invalid Player');
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