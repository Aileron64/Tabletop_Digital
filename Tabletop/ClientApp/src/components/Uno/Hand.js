import React, { Component } from 'react';
import './ColorSelect.css';

var cards;
var wildCardIndex;

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
    }

    colorSelect(color)
    {
        this.state.connection.invoke("PlayWildCard", color, wildCardIndex);
        this.setState({ colorSelect: false });
    }

    cardClick(i)
    {
        if (this.state.cards[i].number == 13)
        {
            wildCardIndex = i;
            this.setState({ colorSelect: true });
        }
        else
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
                colorSelect =
                    <div id="color-select">
                        <div className="pop-up">
                        <button id="blue-button" onClick={(e) => this.colorSelect(0, e)}>Blue</button>
                        <button id="red-button" onClick={(e) => this.colorSelect(1, e)}>Red</button>         
                        <button id="green-button" onClick={(e) => this.colorSelect(2, e)}>Green</button>
                        <button id="yellow-button" onClick={(e) => this.colorSelect(3, e)}>Yellow</button>
                        </div>
                    </div>;
        }

        return (
            <div>
                <button id="draw-card" onClick={(e) => this.drawCard(e)}>Draw Card</button>
                <br />
                <div className="displayCards">
                    {cardlist}
                    {colorSelect}
                </div>
            </div>
        );
    }
}