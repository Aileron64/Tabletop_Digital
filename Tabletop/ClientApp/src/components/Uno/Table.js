import React, { Component } from 'react';

var cards;

const COLORS =
{
    0: "blue", // blue
    1: "red", // red
    2: "green", // green
    3: "yellow" // yellow
};

export class Table extends Component
{
    static displayName = Table.name;

    constructor(props)
    {
        super(props);
        this.state =
        {
            connection: this.props.connection,
            topCard: null,
            statusText: "",
            subText: "",
            loading: true
        };

        cards = this.props.cards;
    }

    componentDidMount()
    {
        this.state.connection.on('UpdateTable', (table) =>
        {
            this.setState(
                {
                    topCard: table.topCard,
                    loading: false
                });
        });

        this.state.connection.on('TableStatus', (t) => { this.setState({ statusText: t }); });
        this.state.connection.on('TableSubStatus', (t) => { this.setState({ subText: t }); });
        this.state.connection.invoke('UpdateTable');
    }

    render()
    {  
        if (this.state.loading)
            return false;

        let topCard;

        if (this.state.topCard.number != 13)
            topCard = cards[this.state.topCard.color][this.state.topCard.number];
        else
        {
            topCard =
                <div className="card" id={COLORS[this.state.topCard.color]}>
                    <span className="card-number">W</span>
                </div>;
        }

        return (
            <div>   
                <div id="table-status">
                    <h3>{this.state.statusText}</h3>
                    <p>{this.state.subText}</p>
                </div>
                {topCard}
            </div>
        ); 
    }
}