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

exports.getCarInstanceDelete = (req, res) => {
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
    title: 'Delete Car Instance',
    view: 'carInstances/carinstanceDelete',
    content: content,
  });
};

exports.postCarInstanceDelete = (req, res) => {
  content = {
    id: 1,
    name: 'Civic',
    price: 100000,
    manufacturer: 'Honda',
    bodyStyle: 'Sedan',
    productionDate: new Date(),
    soldDate: new Date(),
  };
  res.send(req.body.carinstanceid);
};
