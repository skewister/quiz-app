"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import QuizDeux from "@/app/components/QuizDeux";
import { QuizQuestionDeux } from "@/app/types/quizdeux";
import { decodeHtmlEntities } from "@/app/decodeHtmlEntities";

const QuizDeuxPage = () => {
  const [questions, setQuestions] = useState<QuizQuestionDeux[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setQuizCompleted(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      console.log("API Response:", response.data);
      if (response.data.results && response.data.results.length > 0) {
        const formattedQuestions = response.data.results.map(
          (questionData: any) => {
            return {
              question: decodeHtmlEntities(questionData.question),
              correct_answer: decodeHtmlEntities(questionData.correct_answer),
              incorrect_answers: questionData.incorrect_answers.map(
                (answer: string) => decodeHtmlEntities(answer)
              ),
            };
          }
        );
        setQuestions(formattedQuestions);
        setLoading(false);
        setShowNextButton(false);
        console.log("Questions set:", formattedQuestions);
      } else {
        console.error("No results found in API response");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowNextButton(false);
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading && questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Completed</h1>
        <p>
          Your score: {correctAnswersCount} out of {questions.length}
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading question...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const allOptions = shuffleArray([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  return (
    <main className="p-4 relative">
      <div className="absolute top-4 right-4 text-lg font-bold">
        {timeLeft} seconds left
      </div>
      <h1 className="text-2xl font-bold mb-4">QuizDeux Page</h1>
      <QuizDeux
        question={currentQuestion.question}
        options={allOptions}
        correctAnswer={currentQuestion.correct_answer}
        anecdote=""
        onAnswer={handleAnswer}
      />
      {showNextButton && (
        <button onClick={handleNextQuestion} className="btn btn-primary mt-4">
          Next Question
        </button>
      )}
    </main>
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

export default QuizDeuxPage;
