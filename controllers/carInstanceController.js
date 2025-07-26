exports.getCarInstanceDetail = (req, res) => {
  content = {
    id: 1,
    name: 'Civic',
    price: 100000,
    manufacturer: 'Honda',
    bodyStyle: 'Sedan',
    productionDate: new Date(),
    soldDate: new Date(),
  };
  res.render('index', {
    title: 'Car Instance Detail',
    view: 'carInstances/carinstanceDetail',
    content: content,
  });
};
