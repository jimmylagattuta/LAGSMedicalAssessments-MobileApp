import React, { Component } from 'react';
import CheckBox from 'react-native-checkbox';
import axios from 'axios';
import { FlatList, Text, TextInput, View, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from '../common';
import QuestionTypeDetail from '../detailedcomponents/QuestionTypeDetail';


class DassTwentyOne extends Component {
	state = { 
		questions: [],
		index: 0,
		id: 0,
		textInState: '',
		packageToPackage: [],
		packageForApi: [],
		text: '',
		loading: false
	};

	componentWillMount() {
		console.log('DassTwentyOne props object: ', this.props.object.questions);
		console.log('STATE', this.state);
		console.log('PROPS', this.props);
	}
	
	onButtonPress() {
		this.setState({ loading: true });
		console.log('newText ', this.state.tempValue);
		const pack = {
			message: 'Finished',
			assessment: this.props.assessment,
			patient: this.props.patient,
			question: this.state.tempValue
		};
		console.log('pack', pack);
		axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', pack)
			.then((response) => {
				console.log('response!', response.data);
				if (response.data.data === 'Finished') {
					console.log('Finished');
					this.props.setPage;
				}
			});
	}

	renderButton() {
		if (this.state.loading) {
			return (
				<Spinner size="small" />
			);
		}

		return (
			<Button
				style={{ paddingTop: 20 }}
				onPress={() => {
					this.onButtonPress();
				}}
			>
				Done
			</Button>
		);	
	}

	renderQuestionType(newList) {
		const packageJSON = [];
		return (
			<ScrollView>
				<Text style={{ margin: 5, fontSize: 14 }}>Please read each statement and circle a number 0, 1, 2 or 3 which indicates how much the statement applied to you over the past week. There are no right or wrong answers. Do not spend too much time on any statement.</Text>
				<Text style={{ margin: 5, fontSize: 12 }}>The reting scale is as follows.</Text>
				<Text style={{ margin: 5, fontSize: 10 }}>0 = Did not apply to me at all</Text>
				<Text style={{ margin: 5, fontSize: 10 }}>1 = Applied to me to some degree, or some of the time</Text>
				<Text style={{ margin: 5, fontSize: 10 }}>2 = Applied to me a considerable degree or a good part of time</Text>
				<Text style={{ margin: 5, fontSize: 10 }}>3 = Applied to me very much or most of the time</Text>

				<FlatList
					data={newList.content}
					keyExtractor={(x, i) => i}
					// renderItem={({ item, index }) => 
					// console.log('index and item.question ', index, item.question)}
					renderItem={({ item }) => {
						switch (item.question_type) {
							// WORKING CONDTION: case: 'text'
							case 'text':
								return (	
									<View style={{ padding: 10 }}>
										<View style={{ padding: 10 }}>
											<Text style={{ padding: 10, fontSize: 22 }}>
												{item.id + 1}) {item.question}
											</Text>
											<TextInput
												style={{ height: 20 }}
												placeholder="your response"
												onChangeText={(text) => {
													console.log('props', this.props);
													console.log('B) patient name: ', this.props.patient);
													console.log('packageJSON 0', packageJSON);
													this.setState({ text });
													console.log('packageJSON 1', packageJSON);
													console.log('text: ', text);
													const q = item.question;
													console.log('packageJSON 2', packageJSON);
													console.log(this.state.toApi);
													const newText = {
														question: q,
														answer: text, 
														patient: this.props.patient,
														assessment: this.props.assessment,
														patientObject: this.props.patient_object,
														questionObject: item,
														f_a_id: this.state.f_a_id
													};
													console.log('packageJSON 3', packageJSON);
													this.setState({ tempValue: newText,
																	compareQuestion: item.question 
																});
													if (this.state.compareQuestion && this.state.compareQuestion
															!== item.question) {
														// https:lags-assessments-mobileapp-api.herokuapp.com/
														axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
														console.log('response ', response.data.data);
														this.setState({ f_a_id: response.data.finishedAssessmentId });
														});
													} 
													console.log('packageJSON 4', packageJSON);
													console.log('tempValue ', this.state.tempValue);
													packageJSON.push(newText);
													console.log('packageJSON 5', packageJSON);

														// this.sendTheContent(packageJSON).bind(this);
														// this.props.sendAnswers(packageJSON)
														// 	.then((response) => {
														// 		console.log('response in component ', response);
														// 	});
												}} 
											/>
										</View>
									</View>
								);
							case 'LROLOR':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
												<CheckBox
													label='Left'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Left', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													label='Right'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Right', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													label='Only L'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Only L', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													label='Only R'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Only R', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);
							case 'mildOrSevere':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Not A Problem'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Not A Problem', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Mild Problem'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Mild Problem', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Very Mild Problem'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Very Mild Problem', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Moderate Problem'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Moderate Problem', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Severe Problem'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Severe Problem', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);
							case 'notALittleSomewhatToSeverely':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Not at all'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Not at all', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='A little'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'A little', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Somewhat'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Somewhat', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Moderately'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Moderately', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Severely'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Severely', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);
							case 'muchBetterToMuchWorse':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Much Better'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Much Better', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Somewhat Better'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Somewhat Better', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='About the same'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'About the same', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Somewhat Worse'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Somewhat Worse', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Much Worse'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Much Worse', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);
							case 'ExcGoodVGoodFairPoor':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Excellent'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Excellent', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Good'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Good', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Very Good'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Very Good', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Fair'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Fair', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Poor'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Poor', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);
							case 'checkboxgroup':
								return (
									<View style={{ padding: 10 }}>
										<View style={{ padding: 10 }}>
											<Text style={{ padding: 10, fontSize: 22 }}>
												{item.id + 1}) {item.question}
											</Text>
											<TextInput
												style={{ height: 20 }}
												placeholder="your response"
												onChangeText={(text) => {
													console.log('props', this.props);
													console.log('B) patient name: ', this.props.patient);
													console.log('packageJSON 0', packageJSON);
													this.setState({ text });
													console.log('packageJSON 1', packageJSON);
													console.log('text: ', text);
													const q = item.question;
													console.log('packageJSON 2', packageJSON);
													console.log(this.state.toApi);
													const newText = {
														question: q,
														answer: text, 
														patient: this.props.patient,
														assessment: this.props.assessment,
														questionObject: item,
														f_a_id: this.state.f_a_id
													};
													console.log('packageJSON 3', packageJSON);
													this.setState({ tempValue: newText,
																	compareQuestion: item.question 
																});
													if (this.state.compareQuestion && this.state.compareQuestion
															!== item.question) {
														// https:lags-assessments-mobileapp-api.herokuapp.com/
														axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
														console.log('response ', response.data.data);
														this.setState({ f_a_id: response.data.finishedAssessmentId });
														});
													} 
													console.log('packageJSON 4', packageJSON);
													console.log('tempValue ', this.state.tempValue);
													packageJSON.push(newText);
													console.log('packageJSON 5', packageJSON);

														// this.sendTheContent(packageJSON).bind(this);
														// this.props.sendAnswers(packageJSON)
														// 	.then((response) => {
														// 		console.log('response in component ', response);
														// 	});
												}} 
											/>
										</View>
									</View>
								);
							case 'NSMN':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Not at all'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Not at all', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Several Days'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Several Days', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='More than half the days'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'More then half the days', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Nearly Every Day'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Nearly Every Day', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);
							case 'noPainWorstPain0-10':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='0'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Nearly Every Day', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='1'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '1', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='2'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '2', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='3'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '3', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='4'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '4', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='5'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '5', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
												</View>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='6'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '6', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='7'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '7', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='8'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '8', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='9'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '9', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='10'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '10', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
												</View>
											</View>
									</View>
								);					
							case 'noReliefCompleteRelief0-100%':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='0%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '0%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='10%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '10%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='20%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '20%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='30%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '30%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
												</View>
												
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='40%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '40%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='50%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '50%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='60%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '60%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='70%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '70%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
												</View>

												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='80%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '80%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='90%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '90%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='100%'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '100%', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
												</View>
											</View>
									</View>
								);
							case 'doesNotInterfereCompletelyInteferes':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='0'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '0', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='1'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '1', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='2'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '2', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id:this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='3'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '3', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='4'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '4', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='5'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '5', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
												</View>
												<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='6'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '6', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='7'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '7', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='8'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '8', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='9'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '9', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
													<CheckBox
														style={{ height: 4, width: 4 }}
														name={item.question}
														label='10'
														onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: '10', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
													/>
												</View>
											</View>
									</View>
								);
							case 'animatedPerson':
								return (
									<View style={{ padding: 10 }}>
										<Text>5) Interactive person under research..</Text>
									</View>
								);	
							case 'neverToVeryOften1-5':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Never'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Never', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response PP_PP', response);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Seldom'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Seldom', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Sometimes'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Sometimes', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Often'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Often', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 4, width: 4 }}
													name={item.question}
													label='Very Often'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Very Often', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);
							case 'a':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Not at all'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Did not apply to me at all a', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response PP_PP', response);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Some of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me to some degree, or some of the time a', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response PP_PP', response);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Good part of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me to a considerable degree or a good part of the time a', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response PP_PP', response);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Most of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me very much or most of the time a', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response PP_PP', response);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);							
							case 'd':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Not at all'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Did not apply to me at all d', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Some of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me to some degree, or some of the time d', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Good part of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me a considerable degree or a good part of the time d', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Most of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me very much or most of the time d', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.props.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);							
							case 's':
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Not at all'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Did not apply to me at all s', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Some of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me to some degree, or some of the time s', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Good part of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me to a considerable degree or a good part of time s', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													style={{ height: 2, width: 2, fontSize: 2, flexWrap: 'wrap' }}
													name={item.question}
													label='Most of the time'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'Applied to me very much or most of the time s', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
											</View>
									</View>
								);

							// 'yesNo' default
							default:
								return (
									<View style={{ padding: 10 }}>
										<Text style={{ padding: 10, fontSize: 22 }}>
											{item.id + 1}) {item.question}
										</Text>
											<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
												<CheckBox
													name={item.question}
													label='Yes'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'yes', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															console.log('newText', newText);
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															} 
														}
													}}
												/>
												<CheckBox
													name={item.question}
													label='No'
													onChange={(checked) => {
														if (checked) {
															console.log('checked', checked);
															const q = item.question;
															const newText = {
																question: q,
																answer: 'no', 
																patient: this.props.patient,
																assessment: this.props.assessment,
																patientObject: this.props.patient_object,
																questionObject: item,
																f_a_id: this.state.f_a_id
															};
															console.log('newText', newText);
															this.setState({
																tempValue: newText,
																compareQuestion: item.question 
															});
															if (this.state.compareQuestion && this.state.compareQuestion
																	!== item.question) {
																// https:lags-assessments-mobileapp-api.herokuapp.com/
																axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
																console.log('response ', response.data.data);
																this.setState({ f_a_id: response.data.finishedAssessmentId });
																});
															}
														}
													}}
												/>
											</View>
									</View>
								);
						}
					}}
				/>
				{this.renderButton()}
			</ScrollView>
		);
	}

	render() {
		// console.log('newList', this.newList);
		// console.log('Temp Assessment componentWillMount with props object: ', this.props.object);
		const list = [];
		this.props.object.questions.forEach((question) => {
			list.push(question);
		});
		// console.log('list ', list);
		const newList = {
			content: list
		};
		console.log('newList', newList);
		// console.log('new_list.content', newList.content);
		const packageJSON = [];


		return (
			<View style={{ paddingBottom: 400 }}>
				{this.renderQuestionType(newList)}
			</View>
		);
	}
}

export default DassTwentyOne;