const modelConfig = require('./model');

// Create a robust models object supporting both spellings
const models = {
  ...modelConfig.models,
  research: modelConfig.models.research || modelConfig.models.reserach
};

module.exports = {
  openRouter: modelConfig.openRouter,
  models
};
