import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Container } from 'reactstrap';
import { JoinGame } from './JoinGame';
import { CreateGame } from './CreateGame';
import { Uno } from './Uno/Uno';


export class Home extends Component
{
    static displayName = Home.name;

    constructor(props)
    {
        super(props);
        this.state =
        {
            gameState: null,
            gameCode: null
        };
    }

    componentDidMount()
    {     
        fetch('main/CheckGames',
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(code =>
            {
                if (code == "0")
                    this.setState({ gameState: 'Home' });
                else
                    this.setState({ gameState: 'Game', gameCode: code });
            });
    }

    joinGame()
    {
        this.setState({ gameState: 'JoinGame' });
    }

    createGame()
    {
        this.setState({ gameState: 'CreateGame' });
    }

    render()
    {
        var pageContent;

        switch (this.state.gameState)
        {
            default:
                pageContent =
                    <div id="home">
                        <h1>Home</h1>
                        <a className="home-button" onClick={(e) => this.createGame(e)}>Create Game</a>
                        <a className="home-button" onClick={(e) => this.joinGame(e)}>Join Game</a>
                    </div>;
                break;

            case 'JoinGame':
                pageContent = <div><JoinGame /></div>;
                break;

            case 'CreateGame':
                pageContent = <div><CreateGame /></div>;
                break;

            case 'Game':
                pageContent = <div><Uno code={this.state.gameCode} playerName={this.state.gameCode} /></div>;
                break;
        }

        return (
            <div>
                {pageContent}
            </div>
        );
    }
}
