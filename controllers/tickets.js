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
  Ticket.findById(req.params.id, function(err, ticket){
    Flight.findById(ticket.flight, function(err, flight){
      Ticket.deleteOne({'_id': req.params.id}, function(err){
        if(err) return res.render('flights');
        console.log(typeof flight.id , typeof flight._id);
        res.redirect(`/flights/${flight._id}`);
      });
    });
  });

    
}