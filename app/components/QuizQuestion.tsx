"use client";

import { FC, useState } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  anecdote: string;
  onAnswer: (answer: string) => void;
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  anecdote,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(answer);
  };

  return (
    <div className="card shadow-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{question}</h2>
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            className={`btn ${
              isAnswered
                ? option === correctAnswer
                  ? "btn-success"
                  : option === selectedAnswer
                  ? "btn-danger"
                  : "btn-secondary"
                : "btn-primary"
            }`}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && <p className="mt-4">{anecdote}</p>}
    </div>
  );
};

export default QuizQuestion;
