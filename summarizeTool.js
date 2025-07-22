import { showLoader, hideLoader } from './utils/helpers.js';

const textInput = document.getElementById("textInput");
const summarizeBtn = document.getElementById("summarizeBtn");
const summaryOutput = document.getElementById("summaryOutput");

summarizeBtn.addEventListener("click", async () => {
  const input = textInput.value.trim();
  if (!input) {
    alert("Please enter some content to summarize.");
    return;
  }

  showLoader(summaryOutput);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes content for students."
          },
          {
            role: "user",
            content: `Summarize the following:\n\n${input}`
          }
        ],
        max_tokens: 250,
        temperature: 0.5
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      summaryOutput.innerText = data.choices[0].message.content.trim();
    } else {
      summaryOutput.innerText = "Sorry, no summary could be generated.";
    }

  } catch (error) {
    summaryOutput.innerText = "Error summarizing the content. Try again.";
    console.error("Summarization error:", error);
  } finally {
    hideLoader(summaryOutput);
  }
});
