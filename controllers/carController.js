exports.getHomeCatalog = (req, res) => {
  const content = { title: 'Car Inventory' };
  res.render('index', {
    title: 'Car Inventory',
    view: 'home',
    content: content,
  });
};

exports.getCarList = (req, res) => {
  const content = [{ id: 1, name: 'Civic', manufacturer: 'Honda' }];
  res.render('index', {
    title: 'Car List',
    view: 'cars/carList',
    content: content,
  });
};

exports.getCarDetail = (req, res) => {
  const content = {
    id: 1,
    name: 'Civic',
    manufacturer: 'Honda',
    bodyStyle: 'Sedan',
    price: 100000,
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
