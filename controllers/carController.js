exports.getHomeCatalog = (req, res) => {
  res.render('index', { title: 'Car Inventory', home: 'home' });
};
