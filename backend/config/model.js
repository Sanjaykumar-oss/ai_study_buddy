const { createOpenRouter } = require('@openrouter/ai-sdk-provider');

let model = null;

if (process.env.OPENROUTER_API_KEY) {
  try {
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });
    model = openrouter('google/gemini-2.5-flash');
    console.log('OpenRouter AI provider configured with model google/gemini-2.5-flash');
  } catch (err) {
    console.error('Failed to configure OpenRouter provider:', err.message);
  }
} else {
  console.warn('Warning: OPENROUTER_API_KEY is not defined. AI pipeline will run in simulated fallback mode.');
}

module.exports = model;
