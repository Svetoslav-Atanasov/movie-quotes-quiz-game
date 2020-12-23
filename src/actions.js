export const actionTypes = {
	GET_QUESTIONS_BINARY: Symbol('GET_QUESTIONS_BINARY'),
	GET_QUESTIONS_MULTIPLE_CHOICE: Symbol('GET_QUESTIONS_MULTIPLE_CHOICE'),
	CHANGE_QUIZ_QUESTIONS_TYPE: Symbol('CHANGE_QUIZ_QUESTIONS_TYPE'),
	COUNT_CORRECT_ANSWERS: Symbol('COUNT_CORRECT_ANSWERS'),
};

export function getQuestionsBinary() {
	return {
		type: actionTypes.GET_QUESTIONS_BINARY,
		request: `http://localhost:3001/binaryQuotes`,
		requestType: 'GET',
	};
}

export function getQuestionsMultipleChoice() {
	return {
		type: actionTypes.GET_QUESTIONS_MULTIPLE_CHOICE,
		request: `http://localhost:3001/multipleChoiceQuotes`,
		requestType: 'GET',
	};
}

export function changeQuizQuestionsType(type) {
	return {
		type: actionTypes.CHANGE_QUIZ_QUESTIONS_TYPE,
		result: type,
	};
}

export function countCorrectAnswers(currentCorectValues) {
	return {
		type: actionTypes.COUNT_CORRECT_ANSWERS,
		result: currentCorectValues,
	};
}
