import { combineReducers } from 'redux';
import AssessmentsReducer from './AssessmentsReducer';
import AnswersReducer from './AnswersReducer';

export default combineReducers({
	getAssessments: AssessmentsReducer,
	sendAnswers: AnswersReducer
});
