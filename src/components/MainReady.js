import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection, Header, Button, Spinner } from './common';
import { getAssessments, sendAnswers } from '../actions';
import QualityOfLife from './tests/QualityOfLife';
import ScreenerAndOpioidAssessment from './tests/ScreenerAndOpioidAssessment';
import PatientHealthQuestionnaire from './tests/PatientHealthQuestionnaire';
import SleepHealthQuestionnaire from './tests/SleepHealthQuestionnaire';
import BriefPainInventoryQuestionnaire from './tests/BriefPainInventoryQuestionnaire';
import CurrentOpioidMisuseMeasure from './tests/CurrentOpioidMisuseMeasure';
import DassTwentyOne from './tests/DassTwentyOne';
// import AssessmentDetail from './detailedcomponents/AssessmentDetail';

class MainReady extends Component {
	state = {
		assessments: [],
		assessment: '',
		object: [],
		headerTextPlaceholder: 'Choose Assessment',
		email: '',
		notes: [],
		patient_object: [],
		loading: false
	}

	componentWillMount() {
		// console.log('@__@ assessment: ', this.state.assessment);
		// console.log('props ', this.props);
		console.log('this.props main ready ', this.props);
		console.log('this.props ma', this.props);

		this.triggerGetAssessments();
	}

	onButtonPress(title) {
		// console.log('title onButtonPress ', title);

		let toStateAsObject = [];
		this.state.assessments.forEach((item) => {
			if (item.title === title) {
				toStateAsObject = item;
			}
		});
		// console.log('TO SEND TO CHILD ASSESSMENT COMPONENT toStateAsObject ', toStateAsObject);

		this.setState({ assessment: title,
						object: toStateAsObject,
						headerTextPlaceholder: title });
		// console.log('@__@ assessment: ', this.state.assessment);
	}

	triggerGetAssessments() {
		this.setState({ loading: true });

		this.props.getAssessments()
			.then((response) => {
				console.log('response for email', response.payload.data[0].email);
				this.setState({ assessments: response.payload.data[0].content, email: response.payload.data[0].email, patient_object: response.payload.data[0].patient, loading: false });
			});
	}

	renderButton(title) {
		if (this.state.loading) {
			return (
				<Spinner size="small" />
			);
		}

		return (
			<Button onPress={() => this.onButtonPress(title)}>
				{title}
			</Button>

		);
	}

	renderAssessments() {
		// console.log('the assessments should be here : ', this.state.assessments);
		console.log('sendAnswers ', this.props.sendAnswers);

		return (
			this.state.assessments.map(assessment =>
				<Card key={assessment.title}>
					<CardSection>
						{this.renderButton(assessment.title)}
					</CardSection>
				</Card>
			)
		);
	}


	renderContent() {
		const { patient } = this.props;
		const email = this.state.email;
		const patient_object = this.state.patient_object;
		console.log('STATE', this.state);
		console.log('PROPS', this.props);
		console.log('patient here! ', patient);
		console.log('email here! ', email);
		console.log('patient_object here! ', patient_object);
		console.log('sendAnswers ', this.props.sendAnswers);
		switch (this.state.assessment) {
			case 'QOL-DN':
				return (
					<ScrollView>
						<View>
							<QualityOfLife
								assessment={this.state.assessment}
								object={this.state.object}
								patient={patient}
								sendAnswers={this.props.sendAnswers}
								setPage={this.props.setPage}
								patient_object={patient_object}
								email={email}
							/>
						</View>
					</ScrollView>
				);
			case 'SOAPP®-R':
				return (
					<View>
						<ScreenerAndOpioidAssessment
							assessment={this.state.assessment}
							object={this.state.object}
							patient={patient}
							sendAnswers={this.props.sendAnswers}
							setPage={this.props.setPage}
							patient_object={patient_object}
							email={email}
						/>
					</View>
				);
			case 'PHQ-9':
				return (
					<View>
						<PatientHealthQuestionnaire
							assessment={this.state.assessment}
							object={this.state.object}
							patient={patient}
							sendAnswers={this.props.sendAnswers}
							setPage={this.props.setPage}
							patient_object={patient_object}
							email={email}
						/>
					</View>
				);
			case 'SHQ':
				return (
					<View>
						<SleepHealthQuestionnaire
							assessment={this.state.assessment}
							object={this.state.object}
							patient={patient}
							sendAnswers={this.props.sendAnswers}
							setPage={this.props.setPage}
							patient_object={patient_object}
							email={email}
						/>
					</View>
				);
			case 'BPI':
				return (
					<View>
						<BriefPainInventoryQuestionnaire
							assessment={this.state.assessment}
							object={this.state.object}
							patient={patient}
							sendAnswers={this.props.sendAnswers}
							setPage={this.props.setPage}
							patient_object={patient_object}
							email={email}
						/>
					</View>
				);
			case 'COMM™':
				return (
					<View>
						<CurrentOpioidMisuseMeasure
							assessment={this.state.assessment}
							object={this.state.object}
							patient={patient}
							sendAnswers={this.props.sendAnswers}
							setPage={this.props.setPage}
							patient_object={patient_object}
							email={email}
						/>
					</View>
				);
			case 'DASS-21':
				return (
					<View>
						<DassTwentyOne
							assessment={this.state.assessment}
							object={this.state.object}
							patient={patient}
							sendAnswers={this.props.sendAnswers}
							setPage={this.props.setPage}
							patient_object={patient_object}
							email={email}
						/>
					</View>
				);
			default:
				return (
					<View>
						{this.renderAssessments()}
					</View>
				);
		}
	}

	render() {
		return (
			<View>
				<Header headerText={this.state.headerTextPlaceholder} />
				{this.renderContent()}
			</View>
		);
	}
}

const mapStateToProps = state => {
	const { getAssessments, sendAnswers } = state;
	return { getAssessments, sendAnswers };
};

export default connect(mapStateToProps, { getAssessments, sendAnswers })(MainReady);