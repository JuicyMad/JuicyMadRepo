const router = require('express').Router();

/* Main route */
router.get('/', (req, res, next) => res.send('Hello world'))

module.exports = router;