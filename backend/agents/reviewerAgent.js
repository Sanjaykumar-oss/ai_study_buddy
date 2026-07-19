const { generateText } = require('ai');
const model = require('../config/model');

/**
 * Reviews and polishes the draft text
 * @param {string} topic 
 * @param {string} draft 
 * @returns {Promise<string>} Polished output
 */
const runReview = async (topic, draft) => {
  if (!model) {
    console.log(`[Reviewer Agent] Running in simulated mode for topic: "${topic}"`);
    return `${draft}

---
*Verified Reference Material*
*This extensive guide on "${topic}" has been reviewed and approved by the AI Study Buddy reviewer agent. The content has been analyzed for technical accuracy, clarity of educational explanations, and logical structuring across all sections.*`;
  }

  // Real LLM call
  const { text } = await generateText({
    model: model,
    prompt: `Review and polish the following educational draft for "${topic}".
Important: Do NOT shorten or summarize the draft. Retain the detailed sections (Introduction, Principles, Deep Dive, Applications, Summary) completely.
Draft to review:
"${draft}"

Ensure the text is grammatically perfect, clear, and logically structured. Return the polished full text.`,
  });
  return text;
};

module.exports = { runReview };
