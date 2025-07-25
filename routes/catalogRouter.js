const { Router } = require('express');
const catalogRouter = Router();

const carController = require('../controllers/carController');

// CAR ROUTES //
catalogRouter.get('/', carController.getHomeCatalog);

catalogRouter.get('/cars', carController.getCarList);

catalogRouter.get('/cars/create', carController.getCarCreate);

catalogRouter.get('/cars/:id', carController.getCarDetail);

catalogRouter.get('/cars/:id/update', carController.getCarUpdate);

module.exports = catalogRouter;
