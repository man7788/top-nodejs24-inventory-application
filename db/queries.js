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
  const queries = `
  SELECT 
    cars.id AS id, 
    cars.name AS name, 
    manufacturers.name AS manufacturer 
  FROM 
    cars
  INNER JOIN 
    body_styles
  ON 
    cars.body_style_id = body_styles.id
  INNER JOIN 
    manufacturers 
  ON 
    cars.manufacturer_id = manufacturers.id;
  `;
  const { rows } = await pool.query(queries);
  return rows;
};

exports.readCarDetail = async (carId) => {
  const queries = `
  SELECT 
    cars.id AS id,
    cars.name AS name,
    manufacturers.name AS manufacturer,
    body_styles.name AS body_style,
    cars.price AS price,
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
    manufacturers
  ON 
    cars.manufacturer_id = manufacturers.id
  LEFT JOIN 
    body_styles
  ON 
    cars.body_style_id = body_styles.id  
  LEFT JOIN 
    car_instances 
  ON 
    cars.id = car_instances.car_id
  WHERE 
    cars.id = $1
  GROUP BY 
    cars.id,
    manufacturers.name,
    body_styles.name;
  `;
  const values = [carId];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.readCarFormOptions = async () => {
  const queries = `
    SELECT
      (
        SELECT json_agg(jsonb_build_object('id', id, 'name', name) ORDER BY name)
        FROM (
          SELECT DISTINCT manufacturers.id, manufacturers.name
          FROM cars
          LEFT JOIN manufacturers ON cars.manufacturer_id = manufacturers.id
        ) AS m
      ) AS manufacturers,

      (
        SELECT json_agg(jsonb_build_object('id', id, 'name', name) ORDER BY name)
        FROM (
          SELECT DISTINCT body_styles.id, body_styles.name
          FROM cars
          LEFT JOIN body_styles ON cars.body_style_id = body_styles.id
        ) AS b
      ) AS body_styles;
    `;
  const { rows } = await pool.query(queries);
  return rows;
};

exports.createCar = async (name, manufacturer, bodyStyle, price) => {
  const queries = `
  INSERT INTO
    cars (
      name, 
      manufacturer_id, 
      body_style_id, 
      price
    ) 
  VALUES ($1, $2, $3, $4)
  RETURNING id
  `;
  const values = [name, manufacturer, bodyStyle, price];
  const { rows } = await pool.query(queries, values);
  return rows;
};
