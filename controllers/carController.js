exports.getHomeCatalog = (req, res) => {
  const content = { title: 'Car Inventory' };
  res.render('index', {
    title: 'Car Inventory',
    header: 'Car Inventory',
    view: 'home',
    content: content,
  });
};

exports.getCarList = (req, res) => {
  const content = [{ id: 1, name: 'Civic', manufacturer: 'Honda' }];
  res.render('index', {
    title: 'Car List',
    header: 'Car List',
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
    header: `Car: ${content.name}`,
    view: 'cars/carDetail',
    content: content,
  });
};

exports.getCarCreate = (req, res) => {
  res.render('index', {
    title: `Create Car`,
    header: `Create Car`,
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
    header: `Update Car`,
    view: 'cars/carForm',
    content: content,
  });
};
