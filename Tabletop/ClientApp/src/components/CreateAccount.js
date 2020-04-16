import React, { Component } from 'react';
import firebase from './Firebase.js';
import './Account.css';

export class CreateAccount extends Component {
	constructor(props) {
		super(props);
		this.state =
		{
			username: '',
			password: '',
			email: '',
			errorMessage: '',
			hidden: true
		}

		this.toggleShow = this.toggleShow.bind(this);
		this.checkAccount = this.checkAccount.bind(this);
	}

	toggleShow(e) {
		this.setState({ hidden: !this.state.hidden });
		e.preventDefault();
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
		else if (id === 'email') {
			this.setState(
				{
					email: e.target.value
				});
		}
	}

	submit = e => {
		e.preventDefault();

		var rUsername = /^[A-Za-z0-9]{1,}$/;
		var rPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		var rEmail = /^[a-zA-Z0-9]{2,}\@[A-Za-z]{1,}\.[A-Za-z]{1,}$/;

		if (this.state.username === null ||
			this.state.username === '' ||
			this.state.password === null ||
			this.state.password === '' ||
			this.state.email === null ||
			this.state.email === '') {
			this.setState({
				errorMessage: 'Please fill in all the fields'
			});
		}
		else if (!rUsername.test(this.state.username)) {
			this.setState({ errorMessage: 'Username must not be empty and cannot contain special letters.' });
		}
		else if (!rPassword.test(this.state.password)) {
			this.setState({ errorMessage: 'Password must contain 8 characters, at least one letter, one number, and one special character.' });
		}
		else if (!rEmail.test(this.state.email)) {
			this.setState({ errorMessage: 'Email must be properly formatted.' });
		}
		else {
			if (!this.checkAccount()) {
				this.addAccount();
				this.setState({
					errorMessage: ''
				});
			}
			else {
				this.setState({
					errorMessage: this.state.username + ' already exists. Please select another one!'
				});
			}
			console.log(this.checkAccount());
		};
	}

	checkAccount() {
		let cTrue = 0;

		const account = firebase.database().ref('account');
		account.on('value', (snapshot) => {
			let acc = snapshot.val();
			for (let a in acc) {
				if (acc[a].username === this.state.username) {
					cTrue++;
				}
			}
		});
		console.log(cTrue);

		if (cTrue > 0)
			return true;
		else
			return false;
	};

	addAccount() {
		const account = firebase.database().ref("account");
		const a = {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email
		};
		account.push(a);
		//this.setState({
		//	username: '',
		//	password: '',
		//	email: '',
		//	errorMessage: ''
		//});
	};

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
							<img src={require('../pictures/password.png')} id="smile" alt="password" />
						</abbr>
					</button>
					<br />

					<label className="accLabel">Email: </label>
					<input type="text" className="accInputE" placeholder="example@example.ca"
						id="email" onChange={(e) => this.setValue(e)} />
					<br />

					<p className="errMessage">{this.state.errorMessage}</p>
					<input className="accSubmit" type="Submit" value="Submit" />
					<input className="accReset" type="Reset" value="Reset" />
				</form>
			</div>);
	}
}