//  index.js Placce code in here for IOS!!!

// Import a library to help create a component 
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

// Create a component
class App extends Component {
	state = { page: '' }

	render() {
		const store = createStore(reducers, {}, applyMiddleware(promise, ReduxThunk));

		return (
			<Provider store={store}>
				<View>
					<Header headerText="LAGS Medical Assessments" />
					<Main page={this.state.page} />
				</View>
			</Provider>
		);
	}
}

export default App;
