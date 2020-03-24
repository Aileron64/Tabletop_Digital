import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

export class NavMenu extends Component
{
    static displayName = NavMenu.name;

    constructor(props)
    {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state =
        {
            collapsed: true
        };
    }

    toggleNavbar()
    {
        this.setState(
        {
            collapsed: !this.state.collapsed
        });
    }

    render()
    {
        return (
            <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

            

            <ul className="navbar-nav flex-grow">
                <NavItem className="nav_item">
                    <NavLink className="text-dark" href="/debug" target="blank">Debug</NavLink>
                    <div id="nav_link_underline"></div>
                </NavItem>
                <NavItem className="nav_item" id="nav_item_last">
                    <NavLink className="text-dark" href="/CreateAccount" target="blank">Create Account</NavLink>
                    <div id="nav_link_underline"></div>
                </NavItem>
            </ul>

            </Collapse>
            </Container>

            </Navbar>
            </header>
        );
    }
}