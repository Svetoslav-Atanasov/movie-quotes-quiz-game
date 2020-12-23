import { actionTypes } from './actions';

export const defaultState = { correctAnswers: 0, quizType: 'binary' };
const appReducer = (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.GET_QUESTIONS_BINARY:
			if (action.state === 'finished') {
				const result = action.response;
				if (result) {
					return { ...state, binaryQuestions: result };
				}
			}
			return state;
		case actionTypes.GET_QUESTIONS_MULTIPLE_CHOICE:
			if (action.state === 'finished') {
				const result = action.response;
				if (result) {
					return { ...state, multipleChoiceQuestions: result };
				}
			}
			return state;
		case actionTypes.CHANGE_QUIZ_QUESTIONS_TYPE:
			const result = action.result;
			return { ...state, quizType: result };
		case actionTypes.COUNT_CORRECT_ANSWERS:
			const correctAnswers = action.result;
			return { ...state, correctAnswers: correctAnswers };
		default:
			return state;
	}
};

export default appReducer;
