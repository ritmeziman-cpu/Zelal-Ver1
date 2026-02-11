
import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, XCircle, Info, ArrowRight, Play, Award } from 'lucide-react';
import { WordPair, GamePhase } from '../types';
import { INITIAL_WORD_PAIRS } from '../data/words';
import { getLinguisticExplanation } from '../services/geminiService';

interface GameEngineProps {
  onComplete: (points: number) => void;
  onCancel: () => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<GamePhase>(GamePhase.IDENTIFY);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [score, setScore] = useState(0);

  const currentWord = INITIAL_WORD_PAIRS[currentIndex];
  const wordsInSentence = currentWord.example_mixed.split(' ');

  useEffect(() => {
    if (phase === GamePhase.REPLACE) {
      // Generate distractors
      const distractors = INITIAL_WORD_PAIRS
        .filter(wp => wp.id !== currentWord.id)
        .map(wp => wp.pure_word)
        .slice(0, 3);
      const allOptions = [...distractors, currentWord.pure_word].sort(() => Math.random() - 0.5);
      setOptions(allOptions);
    }
    
    if (phase === GamePhase.REINFORCE) {
      fetchExplanation();
    }
  }, [phase, currentIndex]);

  const fetchExplanation = async () => {
    const text = await getLinguisticExplanation(currentWord.dirty_word, currentWord.pure_word);
    setExplanation(text || currentWord.usage_notes);
  };

  const handleIdentify = (word: string) => {
    const cleanWord = word.replace(/[.,!?;]/g, "");
    if (cleanWord.toLowerCase() === currentWord.dirty_word.toLowerCase()) {
      setFeedback('correct');
      setScore(s => s + 5);
      setTimeout(() => {
        setFeedback(null);
        setPhase(GamePhase.REPLACE);
      }, 800);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const handleReplace = (option: string) => {
    if (option === currentWord.pure_word) {
      setFeedback('correct');
      setScore(s => s + 10);
      setPhase(GamePhase.REINFORCE);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < INITIAL_WORD_PAIRS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setPhase(GamePhase.IDENTIFY);
      setFeedback(null);
      setExplanation('');
    } else {
      setPhase(GamePhase.COMPLETE);
    }
  };

  if (phase === GamePhase.COMPLETE) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#F8F9FF]">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping bg-[#7C6AF7] rounded-full opacity-20"></div>
          <div className="relative z-10 p-6 bg-[#7C6AF7] rounded-full text-white">
            <Award size={64} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Great job!</h2>
        <p className="text-gray-500 mb-8">You have completed this lesson and purified {INITIAL_WORD_PAIRS.length} sentences.</p>
        
        <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Points Earned</span>
            <span className="text-[#7C6AF7] font-bold text-xl">+{score} XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Words Mastered</span>
            <span className="text-gray-900 font-bold">{INITIAL_WORD_PAIRS.length}</span>
          </div>
        </div>

        <button 
          onClick={() => onComplete(score)}
          className="w-full py-4 bg-[#7C6AF7] text-white rounded-2xl font-semibold shadow-lg shadow-purple-200 active:scale-95 transition-transform"
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F9FF] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden mr-4">
          <div 
            className="bg-[#7C6AF7] h-full transition-all duration-500" 
            style={{ width: `${((currentIndex) / INITIAL_WORD_PAIRS.length) * 100}%` }}
          />
        </div>
        <button onClick={onCancel} className="text-gray-400">
          <XCircle size={24} />
        </button>
      </div>

      <div className="flex-1">
        {phase === GamePhase.IDENTIFY && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Identify the Loanword</h3>
              <p className="text-gray-500">Find the Arabic word in this sentence</p>
            </div>
            
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm min-h-[160px] flex items-center justify-center flex-wrap gap-2">
              {wordsInSentence.map((word, i) => (
                <button
                  key={i}
                  onClick={() => handleIdentify(word)}
                  className={`text-xl px-3 py-1 rounded-lg transition-all ${
                    feedback === 'correct' && word.replace(/[.,!?;]/g, "").toLowerCase() === currentWord.dirty_word.toLowerCase() 
                      ? 'bg-green-100 text-green-700 font-bold' 
                      : 'hover:bg-purple-50 text-gray-700'
                  } ${feedback === 'incorrect' && 'shake-animation'}`}
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 flex gap-4 items-start">
              <Info className="text-[#7C6AF7] mt-1 shrink-0" size={20} />
              <p className="text-sm text-gray-600 italic">"{currentWord.meaning_sentence_english}"</p>
            </div>
          </div>
        )}

        {phase === GamePhase.REPLACE && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
             <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Purify Sentence</h3>
              <p className="text-gray-500">Choose the authentic Kurmanci equivalent for <span className="text-[#7C6AF7] font-bold">{currentWord.dirty_word}</span></p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleReplace(option)}
                  className={`p-6 text-left rounded-2xl border-2 transition-all flex justify-between items-center font-medium ${
                    feedback === 'correct' && option === currentWord.pure_word 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-white bg-white text-gray-700 hover:border-purple-200'
                  }`}
                >
                  {option}
                  {feedback === 'correct' && option === currentWord.pure_word && <CheckCircle2 className="text-green-500" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === GamePhase.REINFORCE && (
          <div className="space-y-8 animate-in fade-in zoom-in-95">
             <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Purification Complete!</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex items-center gap-3 opacity-50">
                   <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-400">
                    <XCircle size={20} />
                   </div>
                   <p className="line-through text-gray-600">{currentWord.example_mixed}</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle2 size={20} />
                   </div>
                   <p className="font-bold text-gray-900">{currentWord.example_pure}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Info size={18} className="text-[#7C6AF7]" />
                  Why use this word?
                </h4>
                <div className="text-sm text-gray-600 leading-relaxed min-h-[100px]">
                  {explanation ? explanation : 'Loading linguistic insight...'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-8">
        {phase === GamePhase.REINFORCE && (
          <button 
            onClick={nextQuestion}
            className="w-full py-4 bg-[#7C6AF7] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Continue <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default GameEngine;
