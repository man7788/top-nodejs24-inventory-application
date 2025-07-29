const pool = require('./pool');

exports.readHomeCounts = async () => {
  const queries = `
  SELECT
  -- Total number of cars
  (SELECT COUNT(*) FROM cars) AS total_cars,

  -- Total number of distinct body styles
  (SELECT COUNT(DISTINCT body_style) FROM cars) AS total_body_styles,

  -- Total number of distinct manufacturers
  (SELECT COUNT(DISTINCT manufacturer) FROM cars) AS total_manufacturers,

  -- Total number of car instances
  (SELECT COUNT(*) FROM car_instances) AS total_car_instances,

  -- Total number of cars without a sold date
  (SELECT COUNT(*) FROM car_instances WHERE sold_date IS NULL) AS total_available_cars;
  `;
  const { rows } = await pool.query(queries);
  return rows;
};
exports.readCarList = async () => {
  const queries = `SELECT * FROM cars;`;
  const { rows } = await pool.query(queries);
  return rows;
};
