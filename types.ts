
export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  shortDescription: string;
  imageUrl: string;
}

export enum FoodCategory {
  FRUITS = 'Fruits',
  VEGETABLES = 'Vegetables',
  PROTEINS = 'Proteins',
  GRAINS = 'Grains',
  DAIRY = 'Dairy',
  SPICES = 'Spices',
  SWEETS = 'Sweets',
  FATS = 'Fats & Oils'
}

export interface FoodArticle {
  name: string;
  scientificName?: string;
  origin: string;
  nutritionalValue: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
    vitamins: string[];
  };
  culinaryUses: string[];
  healthBenefits: string[];
  history: string;
  funFacts: string[];
}
