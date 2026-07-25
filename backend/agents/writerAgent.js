const { generateText } = require('ai');
const model = require('../config/model');

/**
 * Generates an educational draft summary based on research data
 * @param {string} topic 
 * @param {string} researchData 
 * @returns {Promise<string>} Written draft
 */
const runWrite = async (topic, researchData) => {
  if (!model) {
    console.log(`[Writer Agent] Running in simulated mode for topic: "${topic}"`);
    return `Detailed Study Guide: ${topic}

### Introduction & Core Overview
${topic} represents a fundamental cornerstone of study. Understanding this topic requires analyzing the relationships between its key parameters and learning how they influence practical implementations. Based on the gathered research data, this subject acts as an essential foundation for both academic study and practical engineering problems.

### Key Technical Principles
Here are the primary principles derived from the research details:
${researchData.split('\n').map(line => `> ${line}`).join('\n')}

### Core Mechanism & Deep Dive
When analyzing ${topic}, we observe a structured pattern of interactions. In mathematical or conceptual terms, the behavior is governed by specific parameters that dictate convergence, stability, and operational efficiency. By adjusting these variables, practitioners can optimize execution rates while lowering overhead. For students, mastering these core mechanisms involves studying the fundamental theorems and observing their behavior under varying boundary conditions.

### Practical Applications & Case Studies
1. **Academic Scenarios**: Used to demonstrate foundational concepts in quizzes, exams, and lecture series, strengthening theoretical retention.
2. **Industry Implementations**: Applied by engineers and specialists to optimize actual processes, build robust simulations, and design efficient architectures.
3. **Advanced Research**: Forms the basis of ongoing scientific inquiries aimed at pushing limits, optimizing performance, and discovering new methodologies.

### Summary & Study Tips
To study ${topic} effectively, focus on learning the basic definitions first. Once the theory is clear, proceed to analyze how changing individual parameters affects the overall system. Finally, practice applying these concepts to solve problems and review citations to connect theoretical models with modern experimental data.`;
  }

  // Real LLM call
  const { text } = await generateText({
    model: model,
    prompt: `Based on the following research data:
"${researchData}"

Write a comprehensive, highly detailed, and student-friendly educational explanation of "${topic}".
Structure the output using the following headings:
- Introduction & Core Overview
- Key Technical Principles
- Core Mechanism & Deep Dive
- Practical Applications & Case Studies
- Summary & Study Tips

Ensure each section is thoroughly explained and detailed.`,
  });
  return text;
};

module.exports = { runWrite };
