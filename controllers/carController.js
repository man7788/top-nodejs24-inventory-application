exports.getHomeCatalog = (req, res) => {
  const content = { title: 'Car Inventory' };
  res.render('index', {
    title: 'Car Inventory',
    view: 'home',
    content: content,
  });
};

exports.getCarList = (req, res) => {
  const content = [{ name: 'Civic', manufacturer: 'Honda', url: 'cars/1' }];
  res.render('index', {
    title: 'Car List',
    view: 'cars/carList',
    content: content,
  });
};

exports.getCarDetail = (req, res) => {
  const content = {
    name: 'Civic',
    manufacturer: 'Honda',
    bodyStyle: 'Sedan',
    price: 100000,
  };
  res.render('index', {
    title: `Car: ${content.name}`,
    view: 'cars/carDetail',
    content: content,
  });
};
