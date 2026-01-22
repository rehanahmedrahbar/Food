
import { GoogleGenAI, Type } from "@google/genai";
import { FoodArticle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFoodArticle = async (foodName: string): Promise<FoodArticle> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a detailed, informative encyclopedia article about the food item: "${foodName}". Focus on its origin, nutritional profile, culinary uses, health benefits, historical context, and interesting fun facts.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          scientificName: { type: Type.STRING },
          origin: { type: Type.STRING },
          nutritionalValue: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.STRING },
              protein: { type: Type.STRING },
              carbs: { type: Type.STRING },
              fats: { type: Type.STRING },
              vitamins: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["calories", "protein", "carbs", "fats", "vitamins"]
          },
          culinaryUses: { type: Type.ARRAY, items: { type: Type.STRING } },
          healthBenefits: { type: Type.ARRAY, items: { type: Type.STRING } },
          history: { type: Type.STRING },
          funFacts: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["name", "origin", "nutritionalValue", "culinaryUses", "healthBenefits", "history", "funFacts"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse food article:", error);
    throw new Error("Could not generate valid food data.");
  }
};
