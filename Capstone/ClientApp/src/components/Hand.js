import React, { Component } from 'react';


var cards;

export class Hand extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            connection: this.props.connection,
            cards: [],
            loading: true
        };

        cards = this.props.cards;
    }

    componentDidMount()
    {
        this.state.connection.on('UpdateHand', (hand) =>
        {
            this.setState(
                {
                    cards: hand,
                    loading: false
                });
        });

        this.state.connection.invoke("UpdateHand");
    }

    drawCard()
    {
        this.state.connection.invoke("DrawCard");
    }

    cardClick(i)
    {
        //console.log("cardClick" + i);
        this.state.connection.invoke("PlayCard", i);
    }

    renderCard(props)
    {
        return (
            <button key={props.key} className="hand" onClick={(e) => this.cardClick(props.key, e)}>
                {props.card}
            </button>
        );
    }

    render()
    {
        let cardlist = [];

        if (!this.state.loading)
        {
            for (var i = 0; i < this.state.cards.length; i++)
            {
                var number = this.state.cards[i].number;
                var color = this.state.cards[i].color;

                cardlist.push(this.renderCard(
                    {
                        key: i,
                        card: cards[color][number]
                    }));
            }
        }

        return (
            <div>
                <button id="draw-card" onClick={(e) => this.drawCard(e)}>Draw Card</button>
                <br />
                {cardlist}
            </div>
        );
    }
}