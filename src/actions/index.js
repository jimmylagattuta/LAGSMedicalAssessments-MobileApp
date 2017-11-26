import axios from 'axios';
import { GET_ASSESSMENTS, SEND_ANSWER } from './types';

// "https:lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/get_assessments"
export const getAssessments = () => {
	const request = axios.get('https://lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/get_assessments');
		console.log('request', request);
	return {
		type: GET_ASSESSMENTS,
		payload: request
	};
};

// "https:lags-assessments-mobileapp-api.herokuapp.com/
export const sendAnswer = (bundle) => {
	const request = axios.post('https://lags-assessments-mobileapp-api.herokuapp.com/api/v1/lagz_forms/assessments/answers', bundle);
	console.log('request ', request);
	return {
		type: SEND_ANSWER,
		payload: request
	};
};
