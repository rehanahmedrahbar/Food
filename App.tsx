
import React, { useState, useMemo } from 'react';
import { FoodCategory, FoodItem } from './types';
import { INITIAL_FOODS, CATEGORIES } from './constants';
import { FoodCard } from './components/FoodCard';
import { FoodDetail } from './components/FoodDetail';

const App: React.FC = () => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'All'>('All');

  const filteredFoods = useMemo(() => {
    return INITIAL_FOODS.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchAnything = () => {
    if (!searchQuery.trim()) return;
    
    // Create a pseudo-food item for anything not in the list
    const foundFood = INITIAL_FOODS.find(f => f.name.toLowerCase() === searchQuery.toLowerCase());
    if (foundFood) {
      setSelectedFood(foundFood);
    } else {
      setSelectedFood({
        id: 'dynamic-' + Date.now(),
        name: searchQuery,
        category: FoodCategory.FRUITS, // Placeholder, Gemini will refine
        shortDescription: `An encyclopedia entry for ${searchQuery}.`,
        imageUrl: `https://picsum.photos/seed/${searchQuery.replace(/\s+/g, '')}/800/600`
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setSelectedFood(null)}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
              <span className="text-white font-serif text-xl">G</span>
            </div>
            <h1 className="text-xl md:text-2xl font-serif text-stone-800 tracking-tight">GastroPedia</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-stone-500">
            <button className="hover:text-stone-900 transition-colors">Explorer</button>
            <button className="hover:text-stone-900 transition-colors">Categories</button>
            <button className="hover:text-stone-900 transition-colors">About</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {selectedFood ? (
          <FoodDetail food={selectedFood} onBack={() => setSelectedFood(null)} />
        ) : (
          <>
            {/* Hero Section */}
            <section className="bg-[#fdfcf8] py-16 md:py-24 px-4 overflow-hidden relative">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-stone-100/80 rounded-full blur-3xl"></div>
              
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
                  AI-Powered Encyclopedia
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-stone-800 mb-8 leading-tight">
                  Discover the history & science <br className="hidden md:block"/> 
                  behind <span className="text-amber-600">every bite.</span>
                </h2>
                
                {/* Search Interface */}
                <div className="relative max-w-2xl mx-auto group">
                  <div className="absolute inset-0 bg-amber-600/10 blur-xl group-focus-within:bg-amber-600/20 transition-all rounded-full"></div>
                  <div className="relative flex items-center bg-white rounded-full shadow-xl p-2 pl-6 border border-stone-200">
                    <svg className="w-5 h-5 text-stone-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search 300+ foods or type anything..."
                      value={searchQuery}
                      onChange={handleSearch}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchAnything()}
                      className="flex-grow bg-transparent border-none outline-none text-stone-800 placeholder-stone-400 text-sm md:text-base"
                    />
                    <button 
                      onClick={handleSearchAnything}
                      className="bg-stone-800 text-white px-6 md:px-8 py-3 rounded-full text-sm font-bold hover:bg-stone-900 transition-colors"
                    >
                      EXPLORE
                    </button>
                  </div>
                </div>
                
                <p className="mt-8 text-stone-400 text-sm flex items-center justify-center space-x-4">
                  <span>Trending:</span>
                  <button onClick={() => setSearchQuery('Avocado')} className="hover:text-amber-600 underline underline-offset-4 transition-colors">Avocado</button>
                  <button onClick={() => setSearchQuery('Kombucha')} className="hover:text-amber-600 underline underline-offset-4 transition-colors">Kombucha</button>
                  <button onClick={() => setSearchQuery('Saffron')} className="hover:text-amber-600 underline underline-offset-4 transition-colors">Saffron</button>
                </p>
              </div>
            </section>

            {/* Content Explorer */}
            <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-2xl font-serif text-stone-800">The Food Library</h3>
                  <p className="text-stone-500 text-sm">Browse our curated collection of ingredients</p>
                </div>
                
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === 'All' 
                      ? 'bg-stone-800 text-white shadow-lg shadow-stone-200' 
                      : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        selectedCategory === cat 
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' 
                        : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredFoods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredFoods.map(food => (
                    <FoodCard 
                      key={food.id} 
                      food={food} 
                      onClick={handleFoodClick} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                  <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h4 className="text-xl font-serif text-stone-800 mb-2">Item not in list?</h4>
                    <p className="text-stone-500 text-sm mb-6">
                      Our database is vast, but we might not have it in the library view. 
                      Click below to let our AI generate a custom article for "{searchQuery}".
                    </p>
                    <button 
                      onClick={handleSearchAnything}
                      className="px-8 py-3 bg-amber-600 text-white rounded-full font-bold shadow-lg hover:bg-amber-700 transition-all"
                    >
                      AI GENERATE ARTICLE
                    </button>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif">G</span>
              </div>
              <h1 className="text-2xl font-serif text-white tracking-tight">GastroPedia</h1>
            </div>
            <p className="max-w-xs leading-relaxed">
              Bringing the world of gastronomy to your fingertips. 
              Powered by advanced AI to provide the most comprehensive 
              food encyclopedia ever created.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><button className="hover:text-white transition-colors">Nutrition Guide</button></li>
              <li><button className="hover:text-white transition-colors">Historical Records</button></li>
              <li><button className="hover:text-white transition-colors">Recipe Archive</button></li>
              <li><button className="hover:text-white transition-colors">AI Research</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li><button className="hover:text-white transition-colors">Newsletter</button></li>
              <li><button className="hover:text-white transition-colors">Discord Community</button></li>
              <li><button className="hover:text-white transition-colors">Contact Expert</button></li>
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-stone-800 mt-16 pt-8 text-xs text-center md:text-left flex flex-col md:flex-row justify-between">
          <p>© 2024 GastroPedia AI. All culinary rights reserved.</p>
          <p className="mt-4 md:mt-0">Built with Gemini 3 for the modern gastronome.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
