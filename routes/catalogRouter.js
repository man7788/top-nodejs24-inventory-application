const { Router } = require('express');
const catalogRouter = Router();

const carController = require('../controllers/carController');
const carInstanceController = require('../controllers/carInstanceController');

// CAR ROUTES //
catalogRouter.get('/', carController.getHomeCatalog);

catalogRouter.get('/cars', carController.getCarList);

catalogRouter.get('/cars/create', carController.getCarCreate);
catalogRouter.post('/cars/create', carController.postCarCreate);

catalogRouter.get('/cars/:id', carController.getCarDetail);

catalogRouter.get('/cars/:id/update', carController.getCarUpdate);
catalogRouter.post('/cars/:id/update', carController.postCarUpdate);

catalogRouter.get('/cars/:id/delete', carController.getCarDelete);

// CAR INSTANCES ROUTES //
catalogRouter.get(
  '/carinstances/:id',
  carInstanceController.getCarInstanceDetail
);
catalogRouter.get(
  '/carinstances/:id/delete',
  carInstanceController.getCarInstanceDelete
);
catalogRouter.post(
  '/carinstances/:id/delete',
  carInstanceController.postCarInstanceDelete
);

module.exports = catalogRouter;
