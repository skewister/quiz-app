export interface QuizQuestion {
  langue: string;
  categorie: string;
  theme: string;
  difficulte: string;
  question: string;
  reponse_correcte: string;
  autres_choix: string[];
  anecdote: string;
}
