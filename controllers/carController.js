exports.getHomeCatalog = (req, res) => {
  const content = { title: 'Car Inventory' };
  res.render('index', {
    title: 'Car Inventory',
    view: 'home',
    content: content,
  });
};

exports.getCarList = (req, res) => {
  const content = [{ name: 'Civic', manufacturer: 'Honda' }];
  res.render('index', {
    title: 'Car List',
    view: 'cars/carList',
    content: content,
  });
};
