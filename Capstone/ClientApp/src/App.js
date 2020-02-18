import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home'; 
import { Game } from './components/Game';
import { DebugLog } from './components/DebugLog';

export default class App extends Component
{
    static displayName = App.name;

    render()
    {
        return (
            <Layout>
                <Route exact path='/' component={Game} />
                <Route exact path='/debug' component={DebugLog} />
            </Layout>
        );
    }
}

    //<Route path='/table' component={Table} />
    //<Route path='/Hand' component={Hand} />