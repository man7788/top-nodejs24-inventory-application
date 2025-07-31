const db = require('../db/queries');

exports.getCarInstanceDetail = async (req, res) => {
  const result = await db.readCarInstanceDetail(Number(req.params.id));

  res.render('index', {
    title: 'Car Instance Detail',
    view: 'carInstances/carinstanceDetail',
    content: result[0],
  });
};

exports.getCarInstanceDelete = async (req, res) => {
  const result = await db.readDeleteCarInstance(Number(req.params.id));

  res.render('index', {
    title: 'Delete Car Instance',
    view: 'carInstances/carinstanceDelete',
    content: result[0],
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
