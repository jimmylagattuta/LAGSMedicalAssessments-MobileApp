import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import MainReady from './MainReady';
import { getAssessments, sendAnswers } from '../actions/types';
import { Button, Card, CardSection, Input, Spinner } from './common';

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			patientName: '',
			dateOfBirth: '',
			page: '',
			loading: false,
			email: '',
			date: ''
		};
		
		this.handler = this.handler.bind(this);
	}

	componentWillMount() {
		console.log('state.page here ', this.state.page);
		console.log('this.props main ', this.props);

		// this.props.getAssessments()
			// .then(response => response.json()).then(json => console.log(json));
		// .then(response => {
		// 		console.log('response is here: ', response.data.message);
		// 		if (response.data.message === 'Params, no content') {
		// 			this.setState({ page: '' });
		// 		} else if (response.data.message !== 'Params, no content') {
		// 			this.setState({ page: 'PatientReady' });
		// 		}
		// });
	}


	onButtonPress() {
		const { patientName, dateOfBirth, date, email } = this.state;

		this.setState({ loading: true });

		const items = {
			Name: patientName,
			dateOB: dateOfBirth,
			date: date,
			email: email

		};

		// "https:lags-assessments-mobileapp-api.herokuapp.com/
		axios.post('https://lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/reciever', items)
			.then(() => {
				console.log('Before this.patientReady');
				this.patientReady();
			})
			.catch((response) => console.log('error, ', response));
	}

	patientReady() {
		console.log('state.page here before', this.state.page);
		this.setState({ loading: false,
						page: 'PatientReady' });
		console.log('state.page here after', this.state.page);
	}

	handler() {
		this.setState({
			page: '',
			patientName: '',
			dateOfBirth: null,
			email: '',
			date: null
		});
	}

	renderContent() {
		switch (this.state.page) {
			case 'PatientReady':
				return (
					<MainReady
						patient={this.state.patientName}
						sendAnswers={this.props.sendAnswers}
						setPage={this.handler}
					/>
				);
			default:
				return ( 
					<Card>
						<CardSection>
							<Input
								placeholder="Jane West"
								label="Patient Name"
								value={this.state.patientName}
								onChangeText={text => this.setState({ patientName: text })}
							/>
						</CardSection>

						<CardSection>
							<Input
								placeholder="01/02/1983"
								label="DOB"
								value={this.state.dateOfBirth}
								onChangeText={text => this.setState({ dateOfBirth: text })}
							/>
						</CardSection>

						<CardSection>
							<Input
								placeholder="dd/mm/yyyy"
								label="Date"
								value={this.state.date}
								onChangeText={text => this.setState({ date: text })}
							/>
						</CardSection>

						<CardSection>
							<Text>Temporary Mailer</Text>
						</CardSection>

						<CardSection>
							<Input
								placeholder="your@email.com"
								label="Email"
								value={this.state.email}
								onChangeText={text => this.setState({ email: text })}
							/>
						</CardSection>

						<CardSection>
							{this.renderButton()}
						</CardSection>

					</Card>
				);
		}
	}

	renderButton() {
		if (this.state.loading) {
			return (
				<Spinner size="small" />
			);
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Submit
			</Button>
		);
	}

	render() {
		console.log('patient_name: ', this.state.patientName);

		return (
			<ScrollView>
				{this.renderContent()}
			</ScrollView>
		);
	}
}

const mapStateToProps = state => {
	const { getAssessments, sendAnswers } = state;

	return { getAssessments, sendAnswers };
};

export default connect(mapStateToProps, { getAssessments, sendAnswers })(Main);