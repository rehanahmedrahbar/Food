
import { FoodCategory, FoodItem } from './types';

export const CATEGORIES = Object.values(FoodCategory);

export const INITIAL_FOODS: FoodItem[] = [
  { id: '1', name: 'Apple', category: FoodCategory.FRUITS, shortDescription: 'Crunchy, sweet, and widely cultivated fruit.', imageUrl: 'https://picsum.photos/seed/apple/400/300' },
  { id: '2', name: 'Broccoli', category: FoodCategory.VEGETABLES, shortDescription: 'Edible green plant in the cabbage family.', imageUrl: 'https://picsum.photos/seed/broccoli/400/300' },
  { id: '3', name: 'Salmon', category: FoodCategory.PROTEINS, shortDescription: 'Rich source of omega-3 fatty acids.', imageUrl: 'https://picsum.photos/seed/salmon/400/300' },
  { id: '4', name: 'Quinoa', category: FoodCategory.GRAINS, shortDescription: 'Nutrient-dense ancient grain from the Andes.', imageUrl: 'https://picsum.photos/seed/quinoa/400/300' },
  { id: '5', name: 'Greek Yogurt', category: FoodCategory.DAIRY, shortDescription: 'Strained yogurt with thick consistency.', imageUrl: 'https://picsum.photos/seed/yogurt/400/300' },
  { id: '6', name: 'Turmeric', category: FoodCategory.SPICES, shortDescription: 'Golden spice known for anti-inflammatory properties.', imageUrl: 'https://picsum.photos/seed/turmeric/400/300' },
  { id: '7', name: 'Dark Chocolate', category: FoodCategory.SWEETS, shortDescription: 'Cacao-rich treat with antioxidants.', imageUrl: 'https://picsum.photos/seed/chocolate/400/300' },
  { id: '8', name: 'Avocado', category: FoodCategory.FATS, shortDescription: 'Creamy fruit packed with healthy monounsaturated fats.', imageUrl: 'https://picsum.photos/seed/avocado/400/300' },
  { id: '9', name: 'Blueberry', category: FoodCategory.FRUITS, shortDescription: 'Small blue-purple berries known as a superfood.', imageUrl: 'https://picsum.photos/seed/blueberry/400/300' },
  { id: '10', name: 'Spinach', category: FoodCategory.VEGETABLES, shortDescription: 'Leafy green rich in iron and vitamins.', imageUrl: 'https://picsum.photos/seed/spinach/400/300' },
  { id: '11', name: 'Almond', category: FoodCategory.PROTEINS, shortDescription: 'Nutrient-rich tree nut popular for snacking.', imageUrl: 'https://picsum.photos/seed/almond/400/300' },
  { id: '12', name: 'Oats', category: FoodCategory.GRAINS, shortDescription: 'Whole grain cereal commonly eaten as porridge.', imageUrl: 'https://picsum.photos/seed/oats/400/300' },
  { id: '13', name: 'Cheddar Cheese', category: FoodCategory.DAIRY, shortDescription: 'Sharp-tasting natural hard cheese.', imageUrl: 'https://picsum.photos/seed/cheese/400/300' },
  { id: '14', name: 'Cinnamon', category: FoodCategory.SPICES, shortDescription: 'Aromatic spice obtained from tree bark.', imageUrl: 'https://picsum.photos/seed/cinnamon/400/300' },
  { id: '15', name: 'Honey', category: FoodCategory.SWEETS, shortDescription: 'Natural sweet substance made by bees.', imageUrl: 'https://picsum.photos/seed/honey/400/300' },
  { id: '16', name: 'Olive Oil', category: FoodCategory.FATS, shortDescription: 'Liquid fat obtained from olives.', imageUrl: 'https://picsum.photos/seed/oliveoil/400/300' },
];

// We can dynamically add hundreds more items or allow Gemini to "generate" them when searched.
// This list serves as the curated browsing collection.
