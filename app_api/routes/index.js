var express = require('express');
var router = express.Router();
const tripsController = require('../controllers/trips');

/* GET trips list. */
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);  // route post request 

    /* GET single trip. */
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode);

module.exports = router;