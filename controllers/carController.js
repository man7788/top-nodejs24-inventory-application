const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const nameErr = 'must be between 1 and 255 characters.';
const numErr = 'must be between 1 and 1000000000.';

const validateCar = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Name ${nameErr}`),
  body('manufacturer')
    .trim()
    .isInt({ min: 1, max: 1000000000 })
    .withMessage(`Manufacturer ${numErr}`),
  body('bodystyle')
    .trim()
    .isInt({ min: 1, max: 1000000000 })
    .withMessage(`Body Style ${numErr}`),
  body('price')
    .trim()
    .isInt({ min: 1, max: 1000000000 })
    .withMessage(`Price ${numErr}`),
];

exports.getHomeCatalog = async (req, res) => {
  const result = await db.readHomeCounts();

  res.render('index', {
    title: 'Car Inventory',
    view: 'home',
    content: result[0],
  });
};

exports.getCarList = async (req, res) => {
  const result = await db.readCarList();

  res.render('index', {
    title: 'Car List',
    view: 'cars/carList',
    content: result,
  });
};

exports.getCarDetail = async (req, res) => {
  const result = await db.readCarDetail(Number(req.params.id));
  res.render('index', {
    title: 'Car Detail',
    view: 'cars/carDetail',
    content: { car: result[0], carInstances: result[0].car_instances },
  });
};

exports.getCarCreate = async (req, res) => {
  const result = await db.readCarFormOptions();
  res.render('index', {
    title: `Create Car`,
    view: 'cars/carForm',
    content: result[0],
  });
};

exports.postCarCreate = [
  validateCar,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const result = await db.readCarFormOptions();
      const content = {
        manufacturers: result[0].manufacturers,
        body_styles: result[0].body_styles,
        errors: errors.array(),
      };
      return res.status(400).render('index', {
        title: 'Create Car',
        view: 'cars/carForm',
        content,
      });
    }

    const { name, manufacturer, bodystyle, price } = req.body;
    const created = await db.createCar(name, manufacturer, bodystyle, price);
    res.redirect(`/catalog/cars/${created[0].id}`);
  },
];

exports.getCarUpdate = async (req, res) => {
  const options = await db.readCarFormOptions();
  const car = await db.readCarDetail(Number(req.params.id));

  const content = {
    manufacturers: options[0].manufacturers,
    body_styles: options[0].body_styles,
    car: car[0],
  };

  res.render('index', {
    title: `Update Car`,
    view: 'cars/carForm',
    content: content,
  });
};

exports.postCarUpdate = [
  validateCar,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const options = await db.readCarFormOptions();
      const car = await db.readCarDetail(Number(req.params.id));

      const content = {
        manufacturers: options[0].manufacturers,
        body_styles: options[0].body_styles,
        car: car[0],
        errors: errors.array(),
      };

      return res.status(400).render('index', {
        title: 'Create Car',
        view: 'cars/carForm',
        content: content,
      });
    }

    const { name, manufacturer, bodystyle, price } = req.body;
    const updated = await db.updateCar(
      req.params.id,
      name,
      manufacturer,
      bodystyle,
      price
    );

    res.redirect(`/catalog/cars/${updated[0].id}`);
  },
];

exports.getCarDelete = async (req, res) => {
  const result = await db.readCarDetail(Number(req.params.id));

  res.render('index', {
    title: `Delete Car`,
    view: 'cars/carDelete',
    content: { car: result[0], carInstances: result[0].car_instances },
  });
};

exports.postCarDelete = async (req, res) => {
  await db.deleteCar(Number(req.body.carid));
  res.redirect('/catalog/cars');
};
