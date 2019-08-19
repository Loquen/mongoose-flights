var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  create,
  delete: deleteTicket
}

function create(req, res){
  res.redirect('/flights/show');
}

function deleteTicket(req, res, next){
  let ticket = Ticket.findById(req.params.id, function(err){
    let flight = Flight.findById(ticket.flight, function(err){
      Ticket.deleteOne({'_id': req.params.id}, function(err){
        if(err) return res.render('flights');
        res.redirect(`/flights`);
      });
    });
  });

    
}