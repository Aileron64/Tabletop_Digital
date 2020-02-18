import React, { Component } from 'react';
import { Table } from './Table'
import { Hand } from './Hand';
import { ChatBox } from './ChatBox';
import { PlayerList } from './PlayerList';
import { NameEntry } from './NameEntry';

const signalR = require('@aspnet/signalr');

const COLORS =
{
    0: "#000099", // blue
    1: "#990000", // red
    2: "#006600", // green
    3: "#cc9900" // yellow
};

var cards = new Array(4);
cards[0] = [];
cards[1] = [];
cards[2] = [];
cards[3] = [];

export class Game extends Component
{
    static displayName = Table.name;

    constructor(props)
    {
        super(props);
        this.state =
        {
            connection: null,
            playerID: null,
            loading: true
        };
    }

    componentDidMount()
    {
        this.setState({ connection: new signalR.HubConnectionBuilder().withUrl("/gameHub").build() }, () =>
        {
            this.state.connection.start().then(() =>
            {
                console.log('Connection started!');
                this.loadAssets();

                this.setState({ loading: false });

                this.state.connection.on('JoinGame', (playerID) =>
                {
                    this.setState({ playerID });
                });

            })
            .catch(err => console.log('Error while establishing connection :('));
        });
    }

    loadAssets()
    {
        //Preload card 
        for (let i = 0; i < 4; i++)
        {
            for (let n = 0; n < 13; n++)
            {
                cards[i][n] =
                    <div className="card" style={{ backgroundColor: COLORS[i] }}>
                        <span className="card-number">{n}</span>
                    </div>;
            }

            for (let n = 10; n < 13; n++)
            {
                cards[i][n] =
                    <div className="card" style={{ backgroundColor: COLORS[i] }}>                    
                       <span className="card-icon">{n - 10}</span>   
                    </div>;
            }
        }
    }

    render()
    {
        if (this.state.loading)
            return (<div><h1> LOADING </h1></div>);

        if (this.state.playerID == null)
            return (
                <div>
                    <NameEntry connection={this.state.connection} />
                </div>
            );

        return (
            <div>
                <div className="left">
                    <Table connection={this.state.connection} cards={cards} />
                    <Hand connection={this.state.connection} cards={cards}/>
                </div>

                <div className="right">
                    <PlayerList connection={this.state.connection} playerID={this.state.playerID} />
                    <ChatBox connection={this.state.connection} />
                </div>
            </div>
        );
    }
}

