var express = require('express');
var router = express.Router();
var flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.get('/:id/tickets/new', flightsCtrl.newTicket);
router.post('/', flightsCtrl.create);
router.post('/:id/tickets', flightsCtrl.createTicket, flightsCtrl.show);
router.delete('/:id', flightsCtrl.delete);

module.exports = router;
