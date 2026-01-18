
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLogisticsAssistantResponse = async (query: string, parcelData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a logistics expert for '7 Ton Express'. 
      Current Parcel Data Context: ${JSON.stringify(parcelData)}
      User Question: ${query}
      
      Provide brief, professional advice regarding shipping, route optimization, or parcel statuses based on the provided context. Keep it concise.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to my logistics database right now. How can I help you manually?";
  }
};
