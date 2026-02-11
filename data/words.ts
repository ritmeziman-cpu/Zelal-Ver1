
import { WordPair } from '../types';

export const INITIAL_WORD_PAIRS: WordPair[] = [
  {
    id: 'wp1',
    dirty_word: 'Lazim',
    pure_word: 'Pêwîst',
    meaning_english: 'Necessary / Must',
    example_mixed: 'Lazim e ez herim.',
    example_pure: 'Pêwîst e ez herim.',
    meaning_sentence_english: 'It is necessary that I go.',
    category: 'Common Expressions',
    difficulty_level: 'beginner',
    usage_notes: 'Lazim is an Arabic loanword widely used. Pêwîst is the authentic Kurdish equivalent.'
  },
  {
    id: 'wp2',
    dirty_word: 'Heval',
    pure_word: 'Dost',
    meaning_english: 'Friend',
    example_mixed: 'Ew hevalê min ê baş e.',
    example_pure: 'Ew dostê min ê baş e.',
    meaning_sentence_english: 'He is my good friend.',
    category: 'Social',
    difficulty_level: 'beginner',
    usage_notes: 'While heval is common, dost carries a deeper sense of purity in certain contexts.'
  },
  {
    id: 'wp3',
    dirty_word: 'Fikre',
    pure_word: 'Raman',
    meaning_english: 'Idea / Thought',
    example_mixed: 'Ev fikreke pir baş e.',
    example_pure: 'Ev ramaneke pir baş e.',
    meaning_sentence_english: 'This is a very good idea.',
    category: 'Abstract Concepts',
    difficulty_level: 'intermediate',
    usage_notes: 'Fikr (Arabic) is often replaced by Raman in literary Kurdish.'
  },
  {
    id: 'wp4',
    dirty_word: 'Muntezir',
    pure_word: 'Hêvîdar',
    meaning_english: 'Waiting / Hopeful',
    example_mixed: 'Ez muntezirê te me.',
    example_pure: 'Ez hêvîdarê te me.',
    meaning_sentence_english: 'I am waiting for you.',
    category: 'Emotions',
    difficulty_level: 'intermediate',
    usage_notes: 'Hêvîdar literally means holder of hope/expectation.'
  },
  {
    id: 'wp5',
    dirty_word: 'Cewab',
    pure_word: 'Bersiv',
    meaning_english: 'Answer',
    example_mixed: 'Cewaba min çi ye?',
    example_pure: 'Bersiva min çi ye?',
    meaning_sentence_english: 'What is my answer?',
    category: 'Social',
    difficulty_level: 'beginner',
    usage_notes: 'Bersiv is the standardized Kurmanci word for response.'
  }
];
