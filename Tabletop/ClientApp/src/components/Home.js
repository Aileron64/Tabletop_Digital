import React, { Component } from 'react';

export class Home extends Component
{
    static displayName = Home.name;

    render()
	{
        return(
            <div id="home">
                <h1>Home</h1>
                <a className="home-button" href="/createGame">Create Game</a>
                <a className="home-button" href="/game">Join Game</a>
            </div>
        );
    }
}
