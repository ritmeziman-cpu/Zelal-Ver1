
import React, { useState } from 'react';
import Layout from './components/Layout';
import GameEngine from './components/GameEngine';
import { AppView, UserProgress } from './types';
import { Flame, Trophy, Play, Star, BookOpen, Clock, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [user, setUser] = useState<UserProgress>({
    points: 320,
    level: 2,
    streak: 4,
    mastered_ids: [],
    accuracy: 88
  });

  const handleGameComplete = (points: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + points,
      streak: prev.streak + 1
    }));
    setIsPlaying(false);
    setView('home');
  };

  if (isPlaying) {
    return (
      <div className="max-w-md mx-auto h-screen bg-white">
        <GameEngine 
          onComplete={handleGameComplete} 
          onCancel={() => setIsPlaying(false)} 
        />
      </div>
    );
  }

  return (
    <Layout activeView={view} onViewChange={setView}>
      {view === 'home' && (
        <div className="px-6 pt-12 animate-in fade-in slide-in-from-top-2 duration-500">
          <header className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h2 className="text-gray-400 text-sm">Good morning,</h2>
              <h1 className="text-2xl font-bold text-gray-900">Birusk! 👋</h1>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img src="https://picsum.photos/seed/kurd/200" alt="Avatar" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FFB038] text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full uppercase">
                Genius
              </div>
            </div>
          </header>

          {/* Streak Card */}
          <section className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Thu, 11 Feb</span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-500 rounded-full font-bold">
                <Flame size={16} fill="currentColor" />
                <span>{user.streak}</span>
              </div>
            </div>
            <div className="flex justify-between">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i < user.streak ? 'bg-[#7C6AF7] text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Flame size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Action Tabs */}
          <div className="flex gap-4 mb-8">
            <button className="flex-1 py-3 px-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-2 font-semibold text-[#7C6AF7]">
              <BookOpen size={20} />
              Practice
            </button>
            <button className="flex-1 py-3 px-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-2 font-semibold text-gray-400">
              <Trophy size={20} />
              Leaderboard
            </button>
          </div>

          {/* Current Lesson */}
          <section className="space-y-4 mb-8">
            <div className="relative rounded-[40px] overflow-hidden group cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img 
                src="https://picsum.photos/seed/kurdistan/800/600" 
                className="w-full h-64 object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                alt="Lesson"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold mb-2">Common Expressions</h3>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span>8 Levels</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>12 min</span>
                  </div>
                </div>
                <div className="mt-4 bg-white/20 backdrop-blur-md rounded-full h-1.5 w-full overflow-hidden">
                  <div className="bg-white h-full w-[40%]" />
                </div>
              </div>
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#7C6AF7] shadow-xl group-hover:scale-110 transition-transform">
                <Play fill="currentColor" size={28} />
              </button>
            </div>
          </section>

          {/* Categories */}
          <section className="pb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Categories</h3>
              <button className="text-[#7C6AF7] text-sm font-bold">See All</button>
            </div>
            <div className="space-y-4">
              <CategoryItem title="Social Interactions" icon={<Trophy className="text-blue-500" />} progress={2} total={10} />
              <CategoryItem title="Emotions & Moods" icon={<Star className="text-orange-500" />} progress={5} total={12} />
              <CategoryItem title="Educational Terms" icon={<BookOpen className="text-purple-500" />} progress={0} total={8} />
            </div>
          </section>
        </div>
      )}

      {view === 'discover' && (
        <div className="p-8 text-center pt-24">
          <h2 className="text-2xl font-bold mb-4">Discover Pure Kurmanci</h2>
          <p className="text-gray-500">New linguistic content coming soon...</p>
        </div>
      )}

      {view === 'learn' && (
        <div className="p-8 text-center pt-24">
          <h2 className="text-2xl font-bold mb-4">Your Learning History</h2>
          <p className="text-gray-500">Track your daily progress here.</p>
        </div>
      )}

      {view === 'profile' && (
        <div className="p-8 text-center pt-24">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#7C6AF7] overflow-hidden">
             <img src="https://picsum.photos/seed/kurd/200" alt="Avatar" />
          </div>
          <h2 className="text-2xl font-bold">Birusk Botan</h2>
          <p className="text-gray-500 mb-8">Kurmanci Language Defender</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-[#7C6AF7]">{user.points}</div>
              <div className="text-xs text-gray-400 uppercase">XP Points</div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-[#7C6AF7]">{user.accuracy}%</div>
              <div className="text-xs text-gray-400 uppercase">Accuracy</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

interface CategoryItemProps {
  title: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, icon, progress, total }) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-[#7C6AF7]/30 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-400">Level {progress} • {total} lessons</p>
      </div>
    </div>
    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#7C6AF7] group-hover:text-white transition-colors">
      <ChevronRight size={18} />
    </div>
  </div>
);

export default App;
