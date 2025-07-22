// ai.js

import { getApiKey } from './utils/apiKey.js';
import { showLoading, hideLoading, showError } from './utils/helpers.js';

/**
 * Send a prompt to OpenAI API and return the result
 * @param {string} prompt - The text prompt to send
 * @param {number} maxTokens - (optional) Max length of response
 * @returns {Promise<string>} - AI-generated response
 */
export async function getAIResponse(prompt, maxTokens = 300) {
  const apiKey = getApiKey();
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  showLoading();

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.7
      })
    });

    const data = await res.json();
    hideLoading();

    if (res.ok && data.choices && data.choices[0]) {
      return data.choices[0].message.content.trim();
    } else {
      console.error('AI Error:', data);
      showError("❌ AI Error: " + (data.error?.message || "Unknown error"));
      return '';
    }
  } catch (error) {
    hideLoading();
    console.error('Request Failed:', error);
    showError("❌ Network error occurred. Please try again.");
    return '';
  }
}
