import axios from 'axios';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const requestMiddleware = () => (next) => async (action) => {
	if (action.request) {
		next(action);
		const response = await axios.get(action.request);
		action.response = response.data;
		action.state = 'finished';
	}
	next(action);
};

// Enable devTools if in dev mode.
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
	? window.__REDUX_DEVTOOLS_EXTENSION__({
			serialize: true,
			actionSanitizer: (action) => {
				// Adding Symbol functionality to the dev tools.
				if (typeof action.type === 'symbol') {
					const actionCopy = Object.assign({}, action, {
						type: action.type.toString(),
					});

					return actionCopy;
				}

				return action;
			},
	  })
	: (f) => f;

const store = createStore(
	rootReducer,
	compose(applyMiddleware(thunk, requestMiddleware), devTools)
);

export default store;
