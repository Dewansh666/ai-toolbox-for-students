// src/js/mcqTool.js

document.getElementById("generateMcqBtn").addEventListener("click", async () => {
  const inputText = document.getElementById("mcqInput").value.trim();
  const outputBox = document.getElementById("mcqOutput");

  if (!inputText) {
    outputBox.innerHTML = `<p class="error">⚠️ Please enter some text to generate MCQs.</p>`;
    return;
  }

  outputBox.innerHTML = `<p>⏳ Generating MCQs...</p>`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert MCQ question generator for academic content."
          },
          {
            role: "user",
            content: `Generate 5 multiple choice questions (with 4 options and one correct answer marked) based on the following text:\n\n${inputText}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const mcqs = data.choices[0].message.content;
      outputBox.innerHTML = `<pre>${mcqs}</pre>`;
    } else {
      outputBox.innerHTML = `<p class="error">❌ Failed to generate MCQs. Try again.</p>`;
    }
  } catch (error) {
    console.error(error);
    outputBox.innerHTML = `<p class="error">🚫 Error occurred while generating MCQs.</p>`;
  }
});
