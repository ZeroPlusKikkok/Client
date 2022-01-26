const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ text: 'I am inside API Test' });
});

const testJSON = [
  {
    name: 'Santi',
    username: 'CaptainCode',
  },
  {
    name: 'Vilaiphol',
    username: 'sUPERcODE',
  },
];

router.get('/sendjson', (req, res, next) => {
  res.json(testJSON);
});

module.exports = router;
