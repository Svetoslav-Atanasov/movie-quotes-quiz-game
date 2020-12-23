import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './store';
import './styles/index.css';
import Home from './pages/home';
import Questions from './pages/questions';
import Settings from './pages/settings';
import Statistics from './pages/statistics';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route exact path="/questions" component={Questions} />
				<Route exact path="/settings" component={Settings} />
				<Route exact path="/statistics" component={Statistics} />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
