const https = require('https');

/**
 * Robust HTTP POST helper using Node's built-in https module
 * Guarantees compatibility across all Node.js versions (no global fetch required)
 */
const postRequest = (url, headers, body) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          text: async () => responseData
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(JSON.stringify(body));
    req.end();
  });
};

/**
 * Generates exactly 5 MCQ questions using a direct OpenRouter API call
 * @param {string} topic
 * @param {string} difficulty
 * @returns {Promise<Array|null>} Array of questions or null if offline/unconfigured
 */
const runQuizGeneration = async (topic, difficulty) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn('Warning: OPENROUTER_API_KEY is not defined. Falling back to simulated questions.');
    return null;
  }

  // Exact prompt template from user requirements
  const prompt = `You are an educational quiz generator.

Generate exactly 5 multiple-choice questions.

Topic: ${topic.trim()}
Difficulty: ${difficulty}

Rules:
- Return ONLY valid JSON.
- Do not use markdown.
- Do not include explanations.
- Do not wrap the response in code blocks.
- Each question must contain:
  - question
  - options (array of exactly 4 strings)
  - correctAnswer
- correctAnswer must exactly match one of the options.

Return JSON in this format:

{
  "questions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "..."
    }
  ]
}`;

  try {
    console.log(`[Quiz Agent] Making direct API call to OpenRouter for topic: "${topic}" (${difficulty})`);
    
    const response = await postRequest(
      'https://openrouter.ai/api/v1/chat/completions',
      { 'Authorization': `Bearer ${apiKey}` },
      {
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      }
    );

    if (!response.ok) {
      throw new Error(`OpenRouter API responded with status ${response.status}`);
    }

    const responseText = await response.text();
    const data = JSON.parse(responseText);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Unexpected API response structure');
    }

    const text = data.choices[0].message.content;
    
    // Robustly extract JSON object/array
    const braceIndex = text.indexOf('{');
    const bracketIndex = text.indexOf('[');
    let startChar = '{';
    let endChar = '}';
    let startIndex = braceIndex;

    if (bracketIndex !== -1 && (braceIndex === -1 || bracketIndex < braceIndex)) {
      startChar = '[';
      endChar = ']';
      startIndex = bracketIndex;
    }

    const endIndex = text.lastIndexOf(endChar);
    if (startIndex !== -1 && endIndex !== -1) {
      const jsonString = text.slice(startIndex, endIndex + 1);
      const parsed = JSON.parse(jsonString);
      
      if (parsed && parsed.questions) {
        return parsed.questions;
      }
      return parsed;
    }

    throw new Error('Could not parse quiz JSON from model response');
  } catch (err) {
    console.error('[Quiz Agent] Direct API call failed:', err.message);
    return null;
  }
};

module.exports = { runQuizGeneration };
