
import React, { useEffect, useState } from 'react';
import { FoodArticle, FoodItem } from '../types';
import { getFoodArticle } from '../services/geminiService';

interface FoodDetailProps {
  food: FoodItem;
  onBack: () => void;
}

export const FoodDetail: React.FC<FoodDetailProps> = ({ food, onBack }) => {
  const [article, setArticle] = useState<FoodArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFoodArticle(food.name);
        setArticle(data);
      } catch (err) {
        setError("Unable to gather more information about this food at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [food.name]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
        <p className="text-stone-500 font-medium animate-pulse">Gathering culinary insights for {food.name}...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={onBack} className="text-amber-600 font-bold hover:underline">Return to Library</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4 md:px-0">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-stone-500 hover:text-stone-800 transition-colors group pt-4"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Explorer
      </button>

      <div className="relative h-64 md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
        <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
          <span className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-2">{food.category}</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">{article.name}</h1>
          {article.scientificName && (
            <p className="text-white/70 italic text-lg font-light tracking-wide">{article.scientificName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Summary Section */}
          <section>
            <h2 className="text-2xl font-serif text-stone-800 mb-4 border-b pb-2">Origin & Background</h2>
            <p className="text-stone-600 leading-relaxed text-lg">{article.origin}</p>
          </section>

          {/* History Section */}
          <section className="bg-amber-50/50 p-8 rounded-2xl border border-amber-100">
            <h2 className="text-2xl font-serif text-amber-900 mb-4">Historical Context</h2>
            <p className="text-stone-700 leading-relaxed italic">{article.history}</p>
          </section>

          {/* Culinary Uses */}
          <section>
            <h2 className="text-2xl font-serif text-stone-800 mb-6">Culinary Applications</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {article.culinaryUses.map((use, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs mr-3 flex-shrink-0 mt-1">{idx+1}</span>
                  <span className="text-stone-600">{use}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Health Benefits */}
          <section>
            <h2 className="text-2xl font-serif text-stone-800 mb-6">Health & Wellness</h2>
            <div className="space-y-4">
              {article.healthBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 mr-4"></div>
                  <p className="text-stone-600">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fun Facts */}
          <section>
            <h2 className="text-2xl font-serif text-stone-800 mb-6">Did You Know?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.funFacts.map((fact, idx) => (
                <div key={idx} className="bg-stone-800 p-6 rounded-2xl text-white shadow-lg">
                  <p className="text-stone-300 text-sm mb-2 font-bold uppercase tracking-tighter">FACT #{idx+1}</p>
                  <p className="text-stone-100">{fact}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-8">
            <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Nutritional Profile
              <span className="ml-auto text-[10px] text-stone-400 font-normal">per 100g</span>
            </h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b pb-2">
                <span className="text-stone-500 text-sm">Calories</span>
                <span className="font-bold text-stone-800">{article.nutritionalValue.calories}</span>
              </div>
              <div className="flex justify-between items-end border-b pb-2">
                <span className="text-stone-500 text-sm">Protein</span>
                <span className="font-bold text-stone-800">{article.nutritionalValue.protein}</span>
              </div>
              <div className="flex justify-between items-end border-b pb-2">
                <span className="text-stone-500 text-sm">Carbs</span>
                <span className="font-bold text-stone-800">{article.nutritionalValue.carbs}</span>
              </div>
              <div className="flex justify-between items-end border-b pb-2">
                <span className="text-stone-500 text-sm">Fats</span>
                <span className="font-bold text-stone-800">{article.nutritionalValue.fats}</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Key Vitamins</h4>
              <div className="flex flex-wrap gap-2">
                {article.nutritionalValue.vitamins.map((vit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">
                    {vit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
