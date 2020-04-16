import React, { Component } from 'react';

export class DebugLog extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            log: [],
            loading: true
        };
    }

    componentDidMount()
    {
        this.update();
    }

    //postTest()
    //{
    //    var PL = {
    //        a: 1,
    //        b: 2
    //    };

    //    var data = new FormData();
    //    data.append("PoLos", JSON.stringify(PL));

    //    console.log(data);

    //    fetch('main/test',
    //        {
    //            method: "POST",
    //            body: "TEST_BODY"
    //        }).
    //        then(response => response.text())
    //        .then(data =>
    //        {
    //            console.log(data);
    //        });
    //}

    update()
    {
        //this.postTest();

        //fetch('main/AddAccount?username=Alex');

        fetch('debug/GetLog')
            .then(response => response.json())
            .then(log =>
            {
                this.setState(
                    {
                        log: log,
                        loading: false
                    });
            });
    }

    render()
    {
        let log = [];

        if (!this.state.loading)
        {
            for (let i = this.state.log.length - 1; i >= 0; i--)
            {
                let date = this.state.log[i].substring(0, 15);
                let message = this.state.log[i].substring(16);

                log.push(
                    <div key={i}>
                        <p><b>{date}</b><span className="debug-message">{message}</span></p>
                    </div>);
            }
        }

        return (
            <div id="debug-log">
                <button id="draw-card" onClick={(e) => this.update(e)}>Update</button>
                {log}
            </div>);
    }
}