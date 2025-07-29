#! /usr/bin/env node

require('dotenv').config();
const { Client } = require('pg');

const SQL = `
DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS car_instances;

CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  manufacturer VARCHAR ( 255 ),
  body_style VARCHAR ( 255 ),
  price INTEGER
);

CREATE TABLE IF NOT EXISTS car_instances (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  car_id INTEGER REFERENCES cars(id),
  production_date DATE,
  sold_date DATE
);

INSERT INTO cars (name, manufacturer, body_style, price) 
VALUES
  ('Civic', 'Honda', 'Coupe', 1500),
  ('Corolla', 'Toyota', 'Sedan', 2500 ),
  ('M3', 'BMW', 'Sedan', 3500 ),
  ('Mustang', 'Ford', 'Coupe', 4500 ),
  ('Roma', 'Ferrari', 'Coupe', 5500 );

INSERT INTO car_instances (car_id, production_date, sold_date) 
VALUES
  (1, '1999-01-08', NULL),
  (1, '2000-10-15', '2001-03-19'),
  (2, '2010-12-11', NULL),
  (2, '2012-04-08', '2013-03-19');
`;

const url = process.argv[2] || process.env.PGCONNECTSTRING;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: url,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
