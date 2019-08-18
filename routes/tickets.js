var express = require('express');
var router = express.Router();
var ticketsCtrl = require('../controllers/tickets');

router.post('/tickets', ticketsCtrl.create);

module.exports = router;
