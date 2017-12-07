//  index.js Placce code in here for IOS!!!

// Import a library to help create a component 
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import { Header } from './components/common';
import reducers from './reducers';
// import Router from './Router';
import Main from './components/Main';
import MainReady from './components/MainReady';


const store = createStore(reducers, {}, applyMiddleware(promise, ReduxThunk));

// Create a component
class App extends Component {
	state = { page: '' }

	onPressPage() {
		this.setState({ page: ' ' });
	}

	render() {

		return (
			<Provider store={store}>
				<View>
					<Header headerText="LAGS Medical Assessments" />
					<Main page={this.state.page} onPressPage={this.onPressPage.bind(this)} />
				</View>
			</Provider>
		);
	}
}

export default App;

AppRegistry.registerComponent('LAGSMedicalAssessments', () => App);