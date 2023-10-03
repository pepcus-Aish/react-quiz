import React from "react";
import { AnswerObject } from "../App";
import {ButtonWrapper, Wrapper} from "../styles/QuestionCard.styles"

type Props = {
  question: string;
  answers: string[];
  callback: (e:React.MouseEvent<HTMLButtonElement>)=> void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <Wrapper>
    <p className="number">
      Question:{questionNr}/ {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answers) => (
        <ButtonWrapper 
        correct={userAnswer?.correctAnswer ===answers}
        userClicked={userAnswer?.answer=== answers}
        key={answers}>
          <button disabled={userAnswer ? true : false} value={answers} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answers }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
