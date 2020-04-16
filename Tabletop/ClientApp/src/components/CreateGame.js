import React, { Component } from 'react';
import { Uno } from './Uno/Uno'

export class CreateGame extends Component
{
    static displayName = CreateGame.name;

    constructor(props)
    {
        super(props);
        this.state =
        {
            code: null,
            playerName: ''
        };
    }

    componentDidMount()
    {

    }

    createGame()
    {
        fetch('Main/CreateGame')
            .then(response => response.text())
            .then(code =>
            {
                console.log(code);
                this.setState({ code });
            });
    }

    render()
    {
        if (this.state.code == null)
            return (
                <div>
                    <h1>Create Game</h1>

                    <div id="name-entry">
                        <h3>Enter Name:</h3>
                        <input type="text" value={this.state.playerName}
                            onChange={e => this.setState({ playerName: e.target.value })} />
                        <button onClick={(e) => this.createGame(e)}>Create Game</button>
                    </div>
                </div>
            );
        else
            return (
                <div>
                    <Uno code={this.state.code} playerName={this.state.playerName}/>
                </div>
            );
    }
}
