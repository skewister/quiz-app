"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import QuizQuestionComponent from "@/app/components/QuizQuestion";
import { QuizQuestion } from "@/app/types/quiz";

const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    async function fetchQuizQuestions() {
      try {
        const response = await axios.get(
          "https://api.openquizzdb.org/?key=Y253984525&choice=4&diff=2&anec=1"
        );
        console.log("API Response:", response.data);
        if (response.data.results) {
          setQuestions(response.data.results);
          console.log("Questions set:", response.data.results);
        } else {
          console.error("No results found in API response");
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    }
    fetchQuizQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    // Ne pas passer à la question suivante ici
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log("Current Question:", currentQuestion);

  if (!currentQuestion || timeLeft <= 0) {
    return <div>No more questions available or time is up</div>;
  }

  const allOptions = [...currentQuestion.autres_choix];

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
      <button
        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        className="btn btn-primary mt-4"
        disabled={currentQuestionIndex >= questions.length - 1}
      >
        Next Question
      </button>
    </main>
  );
};

export default Quiz;
