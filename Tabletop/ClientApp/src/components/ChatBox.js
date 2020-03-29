import React, { Component } from 'react';

export class ChatBox extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            input: '',
            chatBox: [],
            connection: this.props.connection
        };
    }

    componentDidMount()
    {
        this.state.connection.on('UpdateChat', (data) =>
        {
            //console.log(data);
            this.setState({ chatBox: data });
        }); 

        this.state.connection.invoke('UpdateChat');
    };

    sendMessage = () =>
    {
        this.state.connection
            .invoke('Chat', this.state.input)
            .catch(err => console.error(err));

        this.setState({ input: '' });
    };

    render()
    {
        let chatlog = [];

        for (let i = this.state.chatBox.length - 1; i >= 0; i--)
        {
            if (this.state.chatBox[i].value.trim() !== "") {
                chatlog.push(
                    <div key={i} className="chatMessage">
                        <h3>{this.state.chatBox[i].author}</h3>
                        <p>{this.state.chatBox[i].value}</p>
                    </div>);
            }
        }

        return (
            <form id="chat-box" action="javascript:void(0)">
                <br />
                <div className="ayaya">
                    <div className="chatBox">
                        {chatlog}
                    </div>
                </div>
                <br /><br />
                <input id="chatInput"
                    type="text"
                    value={this.state.input}
                    onChange={e => this.setState({ input: e.target.value })}
                />
                <br /><br />
                <button className="chatSubmit" type="submit" onClick={this.sendMessage}><img id="send" src={require('../pictures/send.png')} /></button>
            </form>
        );
    }
}
