"use client";

import { FC } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  options,
  onAnswer,
}) => (
  <div className="card shadow-lg p-4 mb-4">
    <h2 className="text-xl font-semibold mb-2">{question}</h2>
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
          className="btn btn-primary"
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default QuizQuestion;
