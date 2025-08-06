import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRoadmap = async (req, res) => {
  const { resumeText, interests } = req.body;
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
  Given this resume:
  ${resumeText}

  And these interests: ${interests}

  Generate a 12-week personalized learning roadmap with weekly goals and YouTube/course suggestions.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  res.json({ roadmap: response.text() });
};
