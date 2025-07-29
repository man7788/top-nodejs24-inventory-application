const pool = require('./pool');

exports.readHomeCounts = async () => {
  const queries = `
  SELECT
  -- Total number of cars
  (SELECT COUNT(*) FROM cars) AS total_cars,

  -- Total number of distinct body styles
  (SELECT COUNT(name) FROM body_styles) AS total_body_styles,

  -- Total number of distinct manufacturers
  (SELECT COUNT(name) FROM manufacturers) AS total_manufacturers,

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

exports.readCarDetail = async (carId) => {
  const queries = `
  SELECT 
    cars.*,  -- All columns from the 'cars' table
    json_agg(
      jsonb_build_object(
        'id', car_instances.id,
        'production_date', car_instances.production_date,
        'sold_date', car_instances.sold_date
      )
    ) AS car_instances  -- Aggregates car_instances as a JSON array
  FROM 
    cars
  LEFT JOIN 
    car_instances 
  ON 
    cars.id = car_instances.car_id
  WHERE 
    cars.id = $1
  GROUP BY 
    cars.id;
  `;
  const values = [carId];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.readCarFormOptions = async (carId) => {
  const queries = `
    SELECT
      json_agg(DISTINCT manufacturer ORDER BY manufacturer) AS manufacturers,
      json_agg(DISTINCT body_style ORDER BY body_style) AS body_styles
    FROM
      cars;
    `;
  const { rows } = await pool.query(queries);
  return rows;
};
