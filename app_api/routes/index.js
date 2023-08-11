var express = require('express');
var router = express.Router();
const {expressjwt: jwt} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
  });

const authController = require('../controllers/authentication')
const tripsController = require('../controllers/trips');

router 
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

/* trips list. */
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);  // route post request 

    /*single trip. */
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;