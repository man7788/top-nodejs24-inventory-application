const { Router } = require('express');
const catalogRouter = Router();

const carController = require('../controllers/carController');

// CAR ROUTES //
catalogRouter.get('/', carController.getHomeCatalog);

catalogRouter.get('/cars', carController.getCarList);

module.exports = catalogRouter;
