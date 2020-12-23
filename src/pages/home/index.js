import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import logo from '../../images//logo.svg';
import '../../styles/Home.css';

import Header from '../../components/header';

const Home = () => {
	return (
		<Grid className="App">
			<Grid className="App-header">
				<Header />
				<Typography gutterBottom variant="h1">
					MOVIE QUOTES QUIZ GAME
				</Typography>
				<img src={logo} className="App-logo" alt="logo" />
				<Link to={'/questions'} className="Link-styles">
					<Button
						size="large"
						color="secondary"
						variant="contained"
						className="Link-styles"
					>
						Start Game
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default Home;
