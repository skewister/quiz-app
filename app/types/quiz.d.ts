export interface QuizQuestion {
  id: number;
  question: string;
  propositions: string[];
  réponse: string;
  anecdote?: string;
  category?: string;
  difficulty?: string;
}
