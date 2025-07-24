exports.getHomeCatalog = (req, res) => {
  const content = { title: 'Car Inventory' };
  res.render('index', {
    title: 'Car Inventory',
    view: 'home',
    content: content,
  });
};
