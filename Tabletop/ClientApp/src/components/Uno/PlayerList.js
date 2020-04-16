import React, { Component } from 'react';

var playerID;

export class PlayerList extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            players: [],
            connection: this.props.connection
        };

        playerID = this.props.playerID;
    }

    componentDidMount()
    {
        this.state.connection.on('UpdatePlayerList', (data) =>
        {
            //console.log(data);
            this.setState({ players: data });
        });

        this.state.connection.invoke('UpdatePlayerList');
    };

    render()
    {
        let players = [];

        console.log(playerID);
        console.log(this.state.players);

        for (var i = 0; i < this.state.players.length; i++)
        {
            let name = this.state.players[i].name;

            //if (this.state.players[i].playerId == playerID)
            //    name += " (YOU)";

            players.push(
                <tr key={i}>
                    <td>{name}</td>
                    <td>{this.state.players[i].cardCount}</td>
                </tr>);
        }

        return (
            <table id="player-list">
            
                <thead>
                <tr>
                    <th>Players</th>
                    <th>Cards</th>
                </tr>
                </thead>

                <tbody>
                    {players}
                </tbody>
            
            </table>);
    }
}
