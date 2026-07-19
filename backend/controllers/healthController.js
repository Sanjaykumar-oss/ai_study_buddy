// @desc    Check API Health status
// @route   GET /health
const getHealth = (req, res) => {
  res.status(200).json({ status: 'ok' });
};

module.exports = {
  getHealth
};
