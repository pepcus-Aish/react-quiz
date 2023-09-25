import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
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
  <div>
    <p className="number">
      Question:{questionNr}/ {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answers) => (
        <div key={answers}>
          <button disabled={userAnswer} value={answers} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answers }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
