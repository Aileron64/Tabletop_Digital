import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home'; 
import { JoinGame } from './components/JoinGame';
import { CreateGame } from './components/CreateGame';
import { DebugLog } from './components/DebugLog';
import { CreateAccount } from './components/CreateAccount';
import { Login } from './components/Login';

export default class App extends Component
{
    static displayName = App.name;

    render()
    {
        return (
            <Layout>
                <Route
                    exact
                    path='/'
                    component={Home}
                />
                <Route exact path='/game' component={JoinGame} />
                <Route exact path='/createGame' component={CreateGame} />
                <Route path='/debug' component={DebugLog} />
                <Route exact path='/createAccount' component={CreateAccount} />
                <Route
                    exact
                    path='/login'
                    component={Login}
                    />
            </Layout>
        );
    }
}

    //<Route path='/table' component={Table} />
    //<Route path='/Hand' component={Hand} />