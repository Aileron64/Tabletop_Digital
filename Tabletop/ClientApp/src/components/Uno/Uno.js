import React, { Component } from 'react';
import { Table } from './Table'
import { Hand } from './Hand';
import { ChatBox } from './../ChatBox';
import { PlayerList } from './PlayerList';

const signalR = require('@aspnet/signalr');

const COLORS =
{
    0: "blue", // blue
    1: "red", // red
    2: "green", // green
    3: "yellow" // yellow
};

var cards = new Array(4);
cards[0] = [];
cards[1] = [];
cards[2] = [];
cards[3] = [];

export class Uno extends Component
{
    static displayName = Uno.name;

    constructor(props)
    {
        super(props);
        this.state =
        {
            connection: null,
            clientID: null,
            playerID: null,
            playerName: this.props.playerName,
            code: this.props.code,
            loading: true
        };
    }

    componentDidMount()
    {
        fetch('Main/ClientId')
            .then(response => response.text())
            .then(clientID =>
            {
                this.setState({ clientID });

                this.setState({ connection: new signalR.HubConnectionBuilder().withUrl("/unoHub").build() }, () =>
                {
                    this.state.connection.start().then(() =>
                    {
                        this.state.connection.invoke('JoinGame', this.state.code, this.state.playerName, clientID)
                            .catch(err => console.error(err));

                        console.log('Connection started!');
                        this.loadAssets();

                        this.setState({ loading: false });

                    })
                        .catch(err => console.log('Error while establishing connection :('));
                });
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
                    <div className="card" id={COLORS[i]}>
                        <span className="card-number">{n}</span>
                    </div>;
            }

            for (let n = 10; n < 13; n++)
            {
                cards[i][n] =
                    <div className="card" id={COLORS[i]}>
                        <span className="card-icon">{n - 10}</span>
                    </div>;
            }
        }
    }

    leaveGame()
    {
        this.state.connection.invoke('LeaveGame');
        window.location.replace('/');
    }

    render()
    {
        if (this.state.loading)
            return (<div><h1> LOADING </h1></div>);

        console.log(this.state.code);

        return (
            <div>
                <div className="left">
                    <Table connection={this.state.connection} cards={cards} />
                    <Hand connection={this.state.connection} cards={cards} />
                </div>

                <div className="right">
                    <h2>Room Code: {this.state.code}</h2>
                    <PlayerList connection={this.state.connection} playerID={this.state.playerID} />
                    <br /><br />
                    <button id="leave-game" onClick={(e) => this.leaveGame(e)}>Leave Game</button>                
                    <ChatBox connection={this.state.connection} />
                </div>
            </div>
        );
    }
}

