import React, { Component } from 'react';

export class NameEntry extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            input: '',
            connection: this.props.connection
        };
    }

    enterName = () =>
    {
        this.state.connection.invoke('EnterName', this.state.input)
            .catch(err => console.error(err));
    };

    render()
    {
        return (
            <div id="name-entry">
                <h3>Enter Name:</h3>
                <input type="text" value={this.state.input} onChange={e => this.setState({ input: e.target.value })} />
                <button onClick={this.enterName}>Enter</button>
            </div>
        );
    }
}
