import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, TextInput } from 'react-native';
import CheckBox from 'react-native-checkbox';


class QuestionTypeDetail extends Component {
	componentWillMount() {
		console.log('QuestionTypeDetail working');
	}

	renderQuetionType() {
		const packageJSON = [];
		switch (this.props.item.question_type) {
			case 'text':
				return (
					<View style={{ padding: 10 }}>
						<View style={{ padding: 10 }}>
							<Text style={{ padding: 10, fontSize: 22 }}>
								{this.props.index + 1}) {this.props.item.question}
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
									const q = this.props.item.question;
									console.log('packageJSON 2', packageJSON);
									console.log(this.state.toApi);
									const newText = {
										question: q,
										answer: text, 
										patient: this.props.patient,
										assessment: this.props.assessment,
										masterObject: this.state.toApi
									};
									console.log('packageJSON 3', packageJSON);
									this.setState({ tempValue: newText,
													compareQuestion: this.props.item.question 
												});
									if (this.state.compareQuestion && this.state.compareQuestion
											!== this.props.item.question) {
										// https:lags-assessments-mobileapp-api.herokuapp.com/
										axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
										console.log('response ', response.data.data);
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
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<CheckBox
									label='Left'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									label='Right'
									onChange={(checked) => {
										console.log('I am checked no', checked);		
									}}
								/>
								<CheckBox
									label='Only L'
									onChange={(checked) => {
										console.log('I am checked no', checked);		
									}}
								/>
								<CheckBox
									label='Only R'
									onChange={(checked) => {
										console.log('I am checked no', checked);		
									}}
								/>
							</View>
					</View>
				);
			case 'mildOrSevere':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Not A Problem'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Mild Problem'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Very Mild Problem'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Moderate Problem'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Severe Problem'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
							</View>
					</View>
				);
			case 'notALittleSomewhatToSeverely':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Not at all'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='A little'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Somewhat'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Moderately'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Severely'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
							</View>
					</View>
				);
			case 'muchBetterToMuchWorse':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Much Better'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Somewhat Better'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='About the same'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Somewhat Worse'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Much Worse'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
							</View>
					</View>
				);
			case 'ExcGoodVGoodFairPoor':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Excellent'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Good'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Very Good'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Fair'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Poor'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
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
								{this.props.index + 1}) {this.props.item.question}
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
									const q = this.props.item.question;
									console.log('packageJSON 2', packageJSON);
									console.log(this.state.toApi);
									const newText = {
										question: q,
										answer: text, 
										patient: this.props.patient,
										assessment: this.props.assessment,
										masterObject: this.state.toApi
									};
									console.log('packageJSON 3', packageJSON);
									this.setState({ tempValue: newText,
													compareQuestion: this.props.item.question 
												});
									if (this.state.compareQuestion && this.state.compareQuestion
											!== this.props.item.question) {
										// https:lags-assessments-mobileapp-api.herokuapp.com/
										axios.post('https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', this.state.tempValue).then((response) => {
										console.log('response ', response.data.data);
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
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Not at all'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Several Days'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='More than half the days'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Nearly Every Day'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
							</View>
					</View>
				);
			case 'noPainWorstPain0-10':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='0'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='1'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='2'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='3'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='4'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='5'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='6'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='7'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='8'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='9'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='10'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
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
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='0'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='1'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='2'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='3'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='4'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='5'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='6'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='7'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='8'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='9'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='10'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
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
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='0'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='1'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='2'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='3'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='4'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='5'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='6'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='7'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='8'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='9'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
									<CheckBox
										style={{ height: 4, width: 4 }}
										name={this.props.item.question}
										label='10'
										onChange={(checked) => {
											console.log('I am checked yes', checked);
										}}
									/>
								</View>
							</View>
					</View>
				);
			case 'animatedPerson':
				return (
					<View style={{ padding: 10 }}>
						<Text>Interactive Person under research...</Text>
					</View>
				);
			case 'neverToVeryOften1-5':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Never'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Seldom'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Sometimes'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Often'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 4, width: 4 }}
									name={this.props.item.question}
									label='Very Often'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
							</View>
					</View>
				);
			case 'a':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Did not apply to me at all'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me to some
										degree, or some of the time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me to a
										considerable degree or a good part of time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me very much
										or most of the time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
							</View>
					</View>
				);
			case 'd':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Did not apply to me at all'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me to some
										degree, or some of the time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me to a
										considerable degree or a good part of time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me very much
										or most of the time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
							</View>
					</View>
				);
			case 's':
				return (
					<View style={{ padding: 10 }}>
						<Text style={{ padding: 10, fontSize: 22 }}>
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Did not apply to me at all'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me to some 
										degree, or some of the time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me to a considerable
										degree or a good part of time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									style={{ height: 3, width: 3, fontSize: 6 }}
									name={this.props.item.question}
									label='Applied to me very much or 
										most of the time'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
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
							{this.props.index + 1}) {this.props.item.question}
						</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<CheckBox
									name={this.props.item.question}
									label='Yes'
									onChange={(checked) => {
										console.log('I am checked yes', checked);
									}}
								/>
								<CheckBox
									name={this.props.item.question}
									label='No'
									onChange={(checked) => {
										console.log('I am checked no', checked);
										// console.log('I am checked no initial state name', this.state.name);
										// if (this.state.checkedNo) {
										// 	this.setState({
										// 		checkedNo: false,
										// 		checkedYes: false,
										// 		name: null
										// 	});
										// } else {
										// 	this.setState({
										// 		checkedNo: true,
										// 		checkedYes: false,
										// 		name: this.props.item.question
										// 	});
										// }
										// console.log('I am checked no @_@', checked);
										// console.log('I am checked no initial state name @_@', this.state.name);
									}}
								/>
							</View>
					</View>
				);
		}
	}

	render() {
		return (
			<View>
				{this.renderQuetionType()}
			</View>
		);
	}
}

export default QuestionTypeDetail;