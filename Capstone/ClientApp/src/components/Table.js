import React, { Component } from 'react';

var cards;

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

        return (
            <div>   
                <div id="table-status">
                    <h3>{this.state.statusText}</h3>
                    <p>{this.state.subText}</p>
                </div>
                {cards[this.state.topCard.color][this.state.topCard.number]}
            </div>
        ); 
    }
}