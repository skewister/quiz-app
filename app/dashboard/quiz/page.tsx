"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import QuizQuestionComponent from "@/app/components/QuizQuestion";
import { QuizQuestion } from "@/app/types/quiz";

const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    async function fetchQuizQuestions() {
      try {
        const response = await axios.get(
          "https://api.openquizzdb.org/?key=Y253984525&choice=4&diff=2&anec=1"
        );
        if (response.data.quizz) {
          setQuestions(response.data.quizz);
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    }
    fetchQuizQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>No more questions available</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Page</h1>
      <QuizQuestionComponent
        question={currentQuestion.question}
        options={currentQuestion.propositions}
        onAnswer={handleAnswer}
      />
    </main>
  );
};

export default Quiz;
