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

exports.getCarDetail = (req, res) => {
  const content = {
    car: {
      id: 1,
      name: 'Civic',
      manufacturer: 'Honda',
      bodyStyle: 'Sedan',
      price: 100000,
    },
    carInstances: [
      {
        car: {
          id: 100,
          name: 'Civic',
          manufacturer: 'Honda',
          bodyStyle: 'Sedan',
          price: 100000,
          productionDate: new Date(),
          soldDate: new Date(),
        },
      },
    ],
  };
  res.render('index', {
    title: 'Car Detail',
    view: 'cars/carDetail',
    content: content,
  });
};

exports.getCarCreate = (req, res) => {
  content = {
    manufacturers: [
      { id: 1, name: 'Honda' },
      { id: 2, name: 'Toyota' },
    ],
    bodyStyles: [
      { id: 1, type: 'Sedan' },
      { id: 2, type: 'Coupe' },
    ],
  };
  res.render('index', {
    title: `Create Car`,
    view: 'cars/carForm',
    content: content,
  });
};

exports.postCarCreate = [
  validateCar,
  (req, res) => {
    const errors = validationResult(req);

    content = {
      manufacturers: [
        { id: 1, name: 'Honda' },
        { id: 2, name: 'Toyota' },
      ],
      bodyStyles: [
        { id: 1, type: 'Sedan' },
        { id: 2, type: 'Coupe' },
      ],
      errors: errors.array(),
    };

    if (!errors.isEmpty()) {
      return res.status(400).render('index', {
        title: 'Create Car',
        view: 'cars/carForm',
        content: content,
      });
    }

    const { name, manufacturer, bodystyle, price } = req.body;
    res.send({ name, manufacturer, bodystyle, price });
  },
];

exports.getCarUpdate = (req, res) => {
  // Sort queries from database
  const content = {
    manufacturers: [
      { id: 1, name: 'Honda' },
      { id: 2, name: 'Toyota' },
    ],
    bodyStyles: [
      { id: 1, type: 'Sedan' },
      { id: 2, type: 'Coupe' },
    ],
    car: {
      name: 'MR2',
      manufacturer: 2,
      bodyStyle: 2,
      price: 100000,
    },
  };
  res.render('index', {
    title: `Update Car`,
    view: 'cars/carForm',
    content: content,
  });
};

exports.postCarUpdate = [
  validateCar,
  (req, res) => {
    const errors = validationResult(req);

    content = {
      manufacturers: [
        { id: 1, name: 'Honda' },
        { id: 2, name: 'Toyota' },
      ],
      bodyStyles: [
        { id: 1, type: 'Sedan' },
        { id: 2, type: 'Coupe' },
      ],
      car: {
        name: 'MR2',
        manufacturer: 2,
        bodyStyle: 2,
        price: 100000,
      },
      errors: errors.array(),
    };

    if (!errors.isEmpty()) {
      return res.status(400).render('index', {
        title: 'Create Car',
        view: 'cars/carForm',
        content: content,
      });
    }

    const { name, manufacturer, bodystyle, price } = req.body;
    res.send({ name, manufacturer, bodystyle, price });
  },
];

exports.getCarDelete = (req, res) => {
  const content = {
    car: {
      id: 1,
      name: 'Civic',
      manufacturer: 'Honda',
      bodyStyle: 'Sedan',
      price: 100000,
    },
    carInstances: [],
    // carInstances: [
    //   {
    //     id: 1,
    //     productionDate: new Date(),
    //     soldDate: new Date(),
    //   },
    //   {
    //     id: 2,
    //     productionDate: new Date(),
    //     soldDate: null,
    //   },
    // ],
  };
  res.render('index', {
    title: `Delete Car`,
    view: 'cars/carDelete',
    content: content,
  });
};

exports.postCarDelete = (req, res) => {
  res.send(req.body.carid);
};
