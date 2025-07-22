// src/js/utils/helpers.js
import { OPENAI_API_KEY } from './apiKey.js';

export async function generateEssay(topic, length) {
  const prompt = `Write a detailed ${length.toLowerCase()} essay on the topic: "${topic}".`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: length === 'Short' ? 300 : length === 'Medium' ? 700 : 1000,
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    return `<p>${data.choices[0].text.trim().replace(/\n/g, '<br>')}</p>`;
  } else {
    throw new Error('No response from AI');
  }
}
