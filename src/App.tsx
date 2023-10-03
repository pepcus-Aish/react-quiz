import React, { useState } from "react";
import { fetchQuizeQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";

//types
import { QuestionState, Difficulty } from "./API";
// styles

import { GlobalStyle, Wrapper } from "./styles/App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 20;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  console.log(question);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizeQuestions(
      TOTAL_QUESTIONS,
      Difficulty.MEDIUM
    );

    setQuestion(newQuestion);
    setScore(0);
    setNumber(0);
    setUserAnswer([]);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User answer
      const answer = e.currentTarget.value;
      //check for correct value for ans
      const correct = question[number].correct_answer === answer;
      // add score for correct ans
      if (correct) {
        setScore((prev) => prev + 1);
      }
      // save ans
      const answerObject = {
        question: question[number].question,
        answer,
        correct,
        correctAnswer: question[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
   // move on to next question untill last
   const nextQuestion = number + 1;
   if(nextQuestion === TOTAL_QUESTIONS){
    setGameOver(true);
   }else{
    setNumber(nextQuestion)
   }

  };
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>QUIZ APP</h1>
      {gameOver || userAnswer.length == TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score:{score} </p> : null}
      {loading ? <p>Loading Questions ...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={question[number].question}
          answers={question[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </Wrapper>
    
    </>
  );
};

export default App;
