var express = require('express');
var router = express.Router();
const jwt = require('express.jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
  });

const authController = require('../controllers/authentication')
const tripsController = require('../controllers/trips');

router 
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

/* GET trips list. */
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);  // route post request 

    /* GET single trip. */
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;