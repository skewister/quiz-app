"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import QuizQuestionComponent from "@/app/components/QuizQuestion";
import { QuizQuestion } from "@/app/types/quiz";

const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNextQuestion();
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

  const fetchNextQuestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.openquizzdb.org/?key=Y253984525&choice=4&fac=2&anec=1"
      );
      console.log("API Response:", response.data);
      if (response.data.results && response.data.results.length > 0) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          response.data.results[0],
        ]);
        setLoading(false);
        setShowNextButton(false);
        console.log("Questions set:", response.data.results);
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
    if (currentQuestionIndex < 6) {
      // Total 7 questions
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      fetchNextQuestion();
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
  if (!currentQuestion) {
    return <div>Loading question...</div>;
  }

  const allOptions = currentQuestion.autres_choix
    ? [...currentQuestion.autres_choix]
    : [];

  return (
    <main className="p-4 relative">
      <div className="absolute top-4 right-4 text-lg font-bold">
        {timeLeft} seconds left
      </div>
      <h1 className="text-2xl font-bold mb-4">Quiz Page</h1>
      <QuizQuestionComponent
        question={currentQuestion.question}
        options={allOptions}
        correctAnswer={currentQuestion.reponse_correcte}
        anecdote={currentQuestion.anecdote}
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

export default Quiz;
