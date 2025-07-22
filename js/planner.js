// src/js/planner.js

document.getElementById("generatePlanBtn").addEventListener("click", () => {
  const subjectsInput = document.getElementById("subjectsInput").value.trim();
  const days = parseInt(document.getElementById("daysInput").value);
  const hoursPerDay = parseInt(document.getElementById("hoursPerDayInput").value);
  const outputBox = document.getElementById("plannerOutput");

  outputBox.innerHTML = ""; // clear previous output

  if (!subjectsInput || isNaN(days) || isNaN(hoursPerDay) || days <= 0 || hoursPerDay <= 0) {
    outputBox.innerHTML = `<p class="error">❌ Please fill out all fields correctly.</p>`;
    return;
  }

  const subjects = subjectsInput.split(",").map(sub => sub.trim()).filter(Boolean);
  const totalStudyHours = days * hoursPerDay;
  const hoursPerSubject = Math.floor(totalStudyHours / subjects.length);

  let planHtml = `<h3>Your ${days}-Day Study Plan</h3><ul>`;

  for (let i = 1; i <= days; i++) {
    const subject = subjects[i % subjects.length];
    planHtml += `<li><strong>Day ${i}:</strong> Study <span class="highlight">${subject}</span> for ${hoursPerDay} hour(s)</li>`;
  }

  planHtml += `</ul>`;

  outputBox.innerHTML = planHtml;
});
