// src/js/essayTool.js
import { validateInput } from './utils/validation.js';
import { generateEssay } from './utils/helpers.js';

const form = document.getElementById('essay-form');
const output = document.getElementById('essay-output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const topic = document.getElementById('essay-topic').value.trim();
  const length = document.getElementById('essay-length').value;

  // Validate input
  if (!validateInput(topic)) {
    output.textContent = '❌ Please enter a valid essay topic.';
    return;
  }

  // Show loading text
  output.innerHTML = '⏳ Generating essay... Please wait.';

  try {
    const essay = await generateEssay(topic, length);
    output.innerHTML = essay;
  } catch (error) {
    console.error('Error generating essay:', error);
    output.textContent = '⚠️ Failed to generate essay. Please try again.';
  }
});
