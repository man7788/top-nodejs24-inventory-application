const pool = require('./pool');

// CAR CONTROLLER QUERIES //
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
    cars.manufacturer_id = manufacturers.id
  ORDER BY
    cars.name;
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
  COALESCE(
    json_agg(
      jsonb_build_object(
        'id', car_instances.id,
        'production_date', car_instances.production_date,
        'sold_date', car_instances.sold_date
      )
      ORDER BY car_instances.production_date
    ) FILTER (WHERE car_instances.id IS NOT NULL),
    '[]'::json
  ) AS car_instances

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

exports.updateCar = async (id, name, manufacturer, bodyStyle, price) => {
  const queries = `
  UPDATE cars
  SET
    name = $1,
    manufacturer_id = $2,
    body_style_id = $3,
    price = $4
  WHERE 
    cars.id = $5
  RETURNING id;
  `;
  const values = [name, manufacturer, bodyStyle, price, id];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.deleteCar = async (id) => {
  const queries = `
  DELETE FROM 
    cars
  WHERE 
    cars.id = $1
  RETURNING id;
  `;
  const values = [id];
  const { rows } = await pool.query(queries, values);
  return rows;
};

// CAR INSTANCE CONTROLLER QUERIES //
exports.readCarInstanceDetail = async (id) => {
  const queries = `
  SELECT
    cars.id AS car_id,
    cars.name AS name,
    manufacturers.name AS manufacturer,
    body_styles.name AS body_style,
    car_instances.id AS car_instance_id,
    car_instances.production_date,
    car_instances.sold_date
  FROM
    cars
  INNER JOIN
    car_instances
  ON
    cars.id = car_instances.car_id
  INNER JOIN
    manufacturers
  ON
    cars.manufacturer_id = manufacturers.id
  INNER JOIN
    body_styles
  ON
    cars.body_style_id = body_styles.id
  WHERE
    car_instances.id = $1;
  `;
  const values = [id];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.readDeleteCarInstance = async (id) => {
  const queries = `
  SELECT 
    *
  FROM 
    car_instances
  WHERE 
    id = $1
  `;
  const values = [id];
  const { rows } = await pool.query(queries, values);
  return rows;
};

exports.deleteCarInstance = async (id) => {
  const queries = `
  DELETE FROM 
    car_instances
  WHERE 
    car_instances.id = $1;
  `;
  const values = [id];
  const { rows } = await pool.query(queries, values);
  return rows;
};
