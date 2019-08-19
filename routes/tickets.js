var express = require('express');
var router = express.Router();
var ticketsCtrl = require('../controllers/tickets');

router.post('/tickets', ticketsCtrl.create);
router.delete('/tickets/:id', ticketsCtrl.delete);

module.exports = router;
