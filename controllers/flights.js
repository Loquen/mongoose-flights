var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  newTicket,
  createTicket,
  delete: deleteFlight
}

function index(req, res){
  // Grab all flights
  let flights = Flight.find({});
  console.log(flights);
  flights.sort({departs: 'asc'}).exec(function(err, flights){
    res.render('flights/index', {title: 'All Flights', flights}); 
  });
}

function newFlight(req, res){
  res.render('flights/new', {
    title: 'New Flight'
  });
}

function create(req, res){
  // First create new document in Flight DB
  if(!req.body.departs){
    var aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    req.body.departs = aYearFromNow;
  }
  var flight = new Flight(req.body);
  flight.save(function(err){
    if(err) return res.render('flights/new');
    console.log(flight);
    res.redirect('/flights');
  });
}

function show(req, res){
  console.log(req.query.id);
  console.log(req.params.id);
  Flight.findById(req.params.id, function(err, flight){
    flight.destinations.sort({arrival: 'asc'});
    Ticket.find({ flight: flight._id}, function(err, tickets){
      res.render(`flights/show`, {
        title: `Flight ${flight.flightNo}`,
        flight, 
        tickets
      });
    });
  }); 
}

function newTicket(req, res){
  Flight.findById(req.params.id, function(err, flight){
    res.render(`tickets/new`, {
      flight,
      title: 'New Ticket'
    });
  });
}

function createTicket(req, res, next){
  req.body.flight = req.params.id;
  console.log(req.body);
  var ticket = new Ticket(req.body);
  ticket.save(function(err){
    if(err) return res.render('flights');
    console.log(ticket);
    return next();
  });
}

function deleteFlight(req, res){
  Flight.deleteOne({'_id': req.params.id}, function(err){
    if(err) {
      return res.render('flights');
    }
    res.redirect(`/flights`);
  });
}
