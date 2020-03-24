import React, { Component } from 'react';
import { Game } from './Game'

export class JoinGame extends Component
{
    static displayName = JoinGame.name;

    constructor(props)
    {
        super(props);
        this.state =
        {
            code: '',
            playerName: '',
            game: false,
            error: '',
        };
    }

    joinGame()
    {
        fetch('Main/JoinGame?roomCode=' + this.state.code)
            .then(response => response.text())
            .then(exists =>
            {
                console.log(exists);

                if (exists)
                {
                    this.setState({ game: true });
                }
                else
                {
                    this.setState({ error: "Error: Game Not Found" });
                }
            });
    }

    render()
    {
        if (!this.state.game)
            return (
                <div>
                    <h1>Join Game</h1>
                    <p>{this.state.error}</p>

                    <div id="name-entry">
                        <h3>Enter Name:</h3>
                        <input type="text" value={this.state.playerName}
                            onChange={e => this.setState({ playerName: e.target.value })} />

                        <h3>Room Code:</h3>
                        <input type="text" value={this.state.code}
                            onChange={e => this.setState({ code: e.target.value })} />

                        <button onClick={(e) => this.joinGame(e)}>Join Game</button>
                    </div>
                </div>
            );
        else
            return (
                <div>
                    <Game code={this.state.code} playerName={this.state.playerName} />
                </div>
            );
    }
}
