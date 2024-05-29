"use client";

import { FC, useState, useEffect } from "react";

interface QuizDeuxProps {
  question: string;
  options: string[];
  correctAnswer: string;
  anecdote: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

const QuizDeux: FC<QuizDeuxProps> = ({
  question,
  options,
  correctAnswer,
  anecdote,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    // Réinitialiser l'état lorsqu'une nouvelle question est affichée
    setSelectedAnswer(null);
    setIsAnswered(false);

    // Mélanger les options de réponse une seule fois par question
    setShuffledOptions(shuffleArray([...options]));
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    const isCorrect = answer === correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(answer, isCorrect);
  };

  return (
    <div className="card shadow-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{question}</h2>
      <div className="flex flex-col space-y-2">
        {shuffledOptions.map((option) => (
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

// Fonction pour mélanger un tableau
function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // Tant qu'il reste des éléments à mélanger...
  while (currentIndex !== 0) {
    // Choisir un élément restant...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Et échanger avec l'élément actuel.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default QuizDeux;
