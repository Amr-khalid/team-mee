
import { GoogleGenAI, Type } from "@google/genai";
import { Member, Team } from "../types";

export const generateSmartTeams = async (
  members: Member[],
  numTeams: number
): Promise<Team[]> => {
  // Initialize GoogleGenAI inside the function to ensure it uses the latest process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Act as a professional eSports coach and team manager. 
    Balance the following ${members.length} members into ${numTeams} competitive teams.
    
    Balance rules:
    1. Distribute skill levels (1-10) evenly across teams.
    2. Try to balance roles (Tank, Damage, Support, etc.) so each team has utility.
    3. Ensure no team is significantly stronger than others.
    
    Members Data:
    ${JSON.stringify(members, null, 2)}
  `;

  try {
    // Upgraded to gemini-3-pro-preview for complex reasoning tasks like team balancing
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              members: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    level: { type: Type.NUMBER },
                  },
                },
              },
              score: { type: Type.NUMBER }
            },
            required: ["id", "name", "members", "score"]
          }
        }
      }
    });

    // Accessing .text property directly as per latest SDK guidelines
    const result = JSON.parse(response.text || "[]");
    return result;
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback to empty array if AI fails
    return [];
  }
};
