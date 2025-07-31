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

exports.postCarInstanceDelete = async (req, res) => {
  await db.deleteCarInstance(Number(req.body.carinstanceid));

  res.redirect('/catalog/cars');
};
