import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Button,
	FormControlLabel,
	FormControl,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';

import {
	countCorrectAnswers,
	getQuestionsBinary,
	getQuestionsMultipleChoice,
} from '../../actions';
import '../../styles/Questions.css';

import Header from '../../components/header';

const Questions = () => {
	const questionsData = useSelector((store) => store);
	const {
		binaryQuestions,
		correctAnswers,
		multipleChoiceQuestions,
		quizType,
	} = questionsData;
	const dispatch = useDispatch();
	const [currentQuestion, setCurrentQuestion] = useState({});

	const [questionNumber, setQuestionNumber] = useState(1);

	const [isCorrectAnswer, setIsCorrectAnswer] = useState('');

	const [isRadioButtonDisabled, setIsRadioButtonDisabled] = useState(false);

	useEffect(() => {
		quizType === 'binary'
			? dispatch(getQuestionsBinary())
			: dispatch(getQuestionsMultipleChoice());

		dispatch(countCorrectAnswers(0));
	}, []);
	// debugger;
	useEffect(() => {
		if (
			questionNumber > 10 ||
			(quizType === 'binary' && !binaryQuestions) ||
			(quizType === 'multipleChoice' && !multipleChoiceQuestions)
		) {
			return;
		}

		if (
			!currentQuestion ||
			!currentQuestion.id ||
			currentQuestion.id !== questionNumber
		) {
			const question =
				quizType === 'binary'
					? binaryQuestions.find((x) => x.id === questionNumber)
					: multipleChoiceQuestions.find((x) => x.id === questionNumber);

			setCurrentQuestion(question);
		}
	}, [questionNumber, binaryQuestions, multipleChoiceQuestions]);

	const checkAnswer = (clickedRadioButton) => {
		if (
			(clickedRadioButton === 'yes' &&
				currentQuestion.answer === currentQuestion.movie) ||
			(clickedRadioButton === 'no' &&
				currentQuestion.answer !== currentQuestion.movie) ||
			(clickedRadioButton === 'first option' &&
				currentQuestion.answer === currentQuestion.options[0]) ||
			(clickedRadioButton === 'second option' &&
				currentQuestion.answer === currentQuestion.options[1]) ||
			(clickedRadioButton === 'third option' &&
				currentQuestion.answer === currentQuestion.options[2])
		) {
			setIsCorrectAnswer(
				`Correct! The right answer is "${currentQuestion.movie}", ${currentQuestion.year}`
			);

			currentQuestion.selectedAnswer = clickedRadioButton;
			setCurrentQuestion(currentQuestion);
			dispatch(countCorrectAnswers(correctAnswers + 1));
		}

		if (
			(clickedRadioButton === 'yes' &&
				currentQuestion.answer !== currentQuestion.movie) ||
			(clickedRadioButton === 'no' &&
				currentQuestion.answer === currentQuestion.movie) ||
			(clickedRadioButton === 'first option' &&
				currentQuestion.answer !== currentQuestion.options[0]) ||
			(clickedRadioButton === 'second option' &&
				currentQuestion.answer !== currentQuestion.options[1]) ||
			(clickedRadioButton === 'third option' &&
				currentQuestion.answer !== currentQuestion.options[2])
		) {
			setIsCorrectAnswer(
				`Sorry, you are wrong! The right answer is "${currentQuestion.movie}", ${currentQuestion.year}`
			);

			currentQuestion.selectedAnswer = clickedRadioButton;
			setCurrentQuestion(currentQuestion);
		}

		setIsRadioButtonDisabled(true);
	};

	return (
		<Grid className="App">
			<Grid className="App-header">
				<Header />
				{quizType === 'binary' ? (
					<React.Fragment>
						<Typography gutterBottom variant="h3">
							QUESTION {currentQuestion.id} of 10
						</Typography>
						<Typography gutterBottom variant="h5">
							Is the following quote "{currentQuestion.quote}" from the movie "
							{currentQuestion.movie}", {currentQuestion.year}?
						</Typography>
						<FormControl component="fieldset" color="secondary">
							<RadioGroup row aria-label="position" name="position">
								<FormControlLabel
									value="yes"
									control={<Radio color="secondary" />}
									label="Yes"
									onChange={() => checkAnswer('yes')}
									disabled={isRadioButtonDisabled}
									checked={currentQuestion.selectedAnswer === 'yes'}
								/>
								<FormControlLabel
									value="false"
									control={<Radio color="secondary" />}
									label="No"
									onChange={() => checkAnswer('no')}
									disabled={isRadioButtonDisabled}
									checked={currentQuestion.selectedAnswer === 'no'}
								/>
							</RadioGroup>
						</FormControl>
						<Typography className="Answer-text">{isCorrectAnswer}</Typography>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography gutterBottom variant="h1">
							QUESTION {currentQuestion.id} of 10
						</Typography>
						<Typography gutterBottom variant="h6">
							From which movie is the following quote "{currentQuestion.quote}"?
						</Typography>
						<FormControl component="fieldset" color="secondary">
							<RadioGroup row aria-label="position" name="position">
								<FormControlLabel
									value="first option"
									control={<Radio color="secondary" />}
									label={currentQuestion.options && currentQuestion.options[0]}
									onChange={() => checkAnswer('first option')}
									disabled={isRadioButtonDisabled}
									checked={currentQuestion.selectedAnswer === 'first option'}
								/>
								<FormControlLabel
									value="second option"
									control={<Radio color="secondary" />}
									label={currentQuestion.options && currentQuestion.options[1]}
									onChange={() => checkAnswer('second option')}
									disabled={isRadioButtonDisabled}
									checked={currentQuestion.selectedAnswer === 'second option'}
								/>
								<FormControlLabel
									value="third option"
									control={<Radio color="secondary" />}
									label={currentQuestion.options && currentQuestion.options[2]}
									onChange={() => checkAnswer('third option')}
									disabled={isRadioButtonDisabled}
									checked={currentQuestion.selectedAnswer === 'third option'}
								/>
							</RadioGroup>
						</FormControl>
						<Typography className="Answer-text">{isCorrectAnswer}</Typography>
					</React.Fragment>
				)}
				<Link className="Link-styles">
					<Button
						size="large"
						variant="contained"
						onClick={() => {
							setQuestionNumber(questionNumber + 1);
							setIsRadioButtonDisabled(false);
							setIsCorrectAnswer('');
						}}
						disabled={!currentQuestion.selectedAnswer | (questionNumber === 10)}
					>
						NEXT QUESTION
					</Button>
				</Link>
				{questionNumber === 10 && isRadioButtonDisabled ? (
					<Link to={'/statistics'} className="Link-styles">
						<Button
							size="large"
							color="secondary"
							variant="contained"
							className="Result-button-styles"
							// disabled={questionNumber < 10 || !isRadioButtonDisabled}
						>
							See results
						</Button>
					</Link>
				) : null}
			</Grid>
		</Grid>
	);
};

export default Questions;
