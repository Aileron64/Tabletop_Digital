import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state =
        {
            collapsed: true,
            darkMode: false
        };
        this.handleDarkMode = this.handleDarkMode.bind(this);
    }

    toggleNavbar() {
        this.setState(
            {
                collapsed: !this.state.collapsed
            });
    }

    handleDarkMode() {
        this.setState({
            darkMode: !this.state.darkMode
        });
    }

    render() {
        var body = document.body;

        //this.state.darkMode ? body {
        //    background: black;
        //    color: white;
        //} : body {
        //    background: white;
        //    color: black;
        //}
        if (this.state.darkMode === true) {
            body.className = 'darkMode';
        }
        else {
            body.className = 'whiteMode';
        }

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand href="/" id={this.state.darkMode ? 'darkMode' : 'whiteMode'}>Home</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>



                            <ul className="navbar-nav flex-grow">
                                <NavItem className="nav_item">
                                    <NavLink className={this.state.darkMode ? 'text-white' : 'text-dark'} href="/debug" target="blank">Debug</NavLink>
                                    <div className={this.state.darkMode ? 'nav_link_underline_dark' : 'nav_link_underline_white'}></div>
                                </NavItem>
                                <NavItem className="nav_item" id="nav_item_last">
                                    <NavLink className={this.state.darkMode ? 'text-white' : 'text-dark'} href="/CreateAccount" target="blank">Create Account</NavLink>
                                    <div className={this.state.darkMode ? 'nav_link_underline_dark' : 'nav_link_underline_white'}></div>
                                </NavItem>
                                <NavItem className="nav_item" id="nav_item_last">
                                    <NavLink className={this.state.darkMode ? 'text-white' : 'text-dark'} href="/Login" target="blank">Login</NavLink>
                                    <div className={this.state.darkMode ? 'nav_link_underline_dark' : 'nav_link_underline_white'}></div>
                                </NavItem>
                            </ul>

                        </Collapse>
                    </Container>
                    <button className={this.state.darkMode ? 'darkModeButton' : 'whiteModeButton'} onClick={this.handleDarkMode} >{this.state.darkMode ? 'Dark Mode' : 'White Mode'}</button>
                </Navbar>

            </header>
        );
    }
}