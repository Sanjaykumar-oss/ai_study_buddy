const { runResearch } = require('../agents/researchAgent');
const { runWrite } = require('../agents/writerAgent');
const { runReview } = require('../agents/reviewerAgent');

/**
 * Executes the entire research pipeline across all agent phases
 * @param {string} topic 
 * @returns {Promise<object>} Pipeline execution results
 */
const runResearchPipeline = async (topic) => {
  console.log(`[Orchestrator] Starting multi-agent pipeline for topic: "${topic}"`);

  // Step 1: Research Agent
  const researchResult = await runResearch(topic);

  // Step 2: Writer Agent
  const writeResult = await runWrite(topic, researchResult);

  // Step 3: Reviewer Agent
  const reviewResult = await runReview(topic, writeResult);

  console.log(`[Orchestrator] Multi-agent pipeline completed successfully for topic: "${topic}"`);
  
  return {
    researchResult,
    writeResult,
    reviewResult
  };
};

module.exports = { runResearchPipeline };
