
export interface WordPair {
  id: string;
  dirty_word: string;
  pure_word: string;
  meaning_english: string;
  example_mixed: string;
  example_pure: string;
  meaning_sentence_english: string;
  category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  usage_notes: string;
}

export interface UserProgress {
  points: number;
  level: number;
  streak: number;
  mastered_ids: string[];
  accuracy: number;
}

export enum GamePhase {
  IDENTIFY = 'IDENTIFY',
  REPLACE = 'REPLACE',
  REINFORCE = 'REINFORCE',
  COMPLETE = 'COMPLETE'
}

export type AppView = 'home' | 'learn' | 'profile' | 'discover';
