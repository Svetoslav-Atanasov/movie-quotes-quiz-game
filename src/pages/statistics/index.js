import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Grid, Typography } from '@material-ui/core';

import '../../styles/Settings.css';

import Header from '../../components/header';

const Statistics = () => {
	const correctAnswers = useSelector((store) => store.correctAnswers);

	return (
		<Grid className="App">
			<Grid className="App-header">
				<Header />

				<Typography gutterBottom variant="h3">
					You result:
				</Typography>
				<Typography gutterBottom variant="h6">
					You answered {correctAnswers} out of 10 correctly.
				</Typography>
				<Link to={'/questions'} className="Link-styles">
					<Button size="large" color="secondary" variant="contained">
						Restart
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default Statistics;
