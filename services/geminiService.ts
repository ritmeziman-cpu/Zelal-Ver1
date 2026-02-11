
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLinguisticExplanation = async (dirty: string, pure: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the linguistic difference between the Arabic loanword "${dirty}" and the pure Kurdish (Kurmanci) word "${pure}". Provide cultural context and why using the pure version is beneficial for the language preservation. Keep it concise for a mobile app user.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `In Kurmanci, replacing "${dirty}" with "${pure}" helps preserve the Indo-European roots of the language and reduces the heavy reliance on Semitic loanwords.`;
  }
};

export const generateNewSentence = async (wordPair: { dirty_word: string, pure_word: string }) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short everyday sentence in Kurdish Kurmanci that uses the word "${wordPair.dirty_word}". Also provide the English translation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentence: { type: Type.STRING },
            translation: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return {
      sentence: `Ez îro pir ${wordPair.dirty_word} im.`,
      translation: `I am very ${wordPair.dirty_word} today.`
    };
  }
};
