import React, { Component } from 'react';

var cards;

export class Hand extends Component
{
    cardClick(i)
    {
        //console.log("cardClick" + i);
        this.state.connection.invoke("PlayCard", i);
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
                
            </div>
        );
    }
}