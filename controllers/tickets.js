var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  create
}

function create(req, res){
  res.redirect('/flights/show');
}