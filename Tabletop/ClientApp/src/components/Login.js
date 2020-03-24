import React, { Component } from 'react';
import './Account.css';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state =
		{
			username: '',
			password: '',
			hidden: true,
			logged: false
		}

		this.toggleShow = this.toggleShow.bind(this);
	}

	setValue(e) {
		let id = e.target.id;

		if (id === 'username') {
			this.setState(
				{
					username: e.target.value
				});
		}
		else if (id === 'password') {
			this.setState(
				{
					password: e.target.value
				});
		}
	}

	toggleShow(e) {
		this.setState({ hidden: !this.state.hidden });
		e.preventDefault();
	}

	submit = e => {
		e.preventDefault();

		if (this.state.username === null ||
			this.state.username === '' ||
			this.state.password === null ||
			this.state.password === '' ||
			this.state.email === null ||
			this.state.email === '') {
			this.setState({ errorMessage: 'Please fill in all the fields' });
		}
		this.login();
	}

	login() {
		console.log(this.state.username);
		console.log(this.state.email);
		console.log(this.state.password);

		fetch("main/AddAccount?username=" + this.state.username
			+ "&password=" + this.state.password
			+ "&email=" + this.state.email);
	}

	render() {
		return (
			<div className="accBody">
				<h4 className="accTitle">Account Creation</h4>
				<form className="formBody" method="POST" onSubmit={this.submit.bind(this)}>

					<label className="accLabel">Username: </label>
					<input type="text" className="accInputU" placeholder="Enter a Username"
						id="username" ref="username" onChange={(e) => this.setValue(e)} />
					<br />

					<label className="accLabel">Password: </label>
					<input type={this.state.hidden ? "password" : "text"} className="accInputP"
						placeholder="Enter a Password" id="password" onChange={(e) => this.setValue(e)} />
					<button
						onMouseEnter={(e) => this.toggleShow(e)}
						onMouseLeave={(e) => this.toggleShow(e)}
						id="toggleVisibility"
					>
						<abbr title="Toggle Visibility">
							<img src={require('../pictures/password.png')} id="smile" />
						</abbr>
					</button>
					<br />

					<p className="errMessage">{this.state.errorMessage}</p>
					<input className="accSubmit" type="Submit" value="Submit" />
					<input className="accReset" type="Reset" value="Reset" />

				</form>
			</div>);
	}
}