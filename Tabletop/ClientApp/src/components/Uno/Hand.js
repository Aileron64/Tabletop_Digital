import React, { Component } from 'react';
import { ColorSelect } from './ColorSelect';

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
            colorSelect: false,
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

        //this.setState({ colorSelect: true });
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
        let colorSelect;

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

            if (this.state.colorSelect)
                colorSelect = <ColorSelect />;
        }

        return (
            <div>
                <button id="draw-card" onClick={(e) => this.drawCard(e)}>Draw Card</button>
                <br />
                {cardlist}
                {colorSelect}
            </div>
        );
    }
}