import { useDispatch, useSelector } from 'react-redux';

import {
	FormControlLabel,
	FormControl,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';

import { changeQuizQuestionsType } from '../../actions';

import '../../styles/Settings.css';

import Header from '../../components/header';

const Settings = () => {
	const quizType = useSelector((store) => store.quizType);

	const dispatch = useDispatch();

	return (
		<Grid className="App">
			<Grid className="App-header">
				<Header />
				<Typography gutterBottom variant="h1">
					SETTINGS
				</Typography>
				<Typography gutterBottom variant="h6">
					Which quiz type would you like to take:
				</Typography>
				<FormControl component="fieldset" color="secondary">
					<RadioGroup
						row
						aria-label="position"
						name="position"
						defaultValue={quizType}
					>
						<FormControlLabel
							value="binary"
							control={<Radio color="secondary" />}
							label="Binary (Yes/No)"
							onChange={() => dispatch(changeQuizQuestionsType('binary'))}
						/>
						<FormControlLabel
							value="multipleChoice"
							control={<Radio color="secondary" />}
							label="Multiple choice (choose between 3 possible answers)"
							onChange={() =>
								dispatch(changeQuizQuestionsType('multipleChoice'))
							}
						/>
					</RadioGroup>
				</FormControl>
			</Grid>
		</Grid>
	);
};

export default Settings;
