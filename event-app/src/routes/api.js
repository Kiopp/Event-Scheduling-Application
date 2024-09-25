const express = require('express');
const router = express.Router();

router.get('/api/data', (req, res) => {
  // Return some sample data
  const data = { message: 'Hello from local API!' };
  res.json(data);
});

module.exports = router;