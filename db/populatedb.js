#! /usr/bin/env node

require('dotenv').config();
const { Client } = require('pg');

const SQL = `
DROP TABLE IF EXISTS manufacturers CASCADE;
DROP TABLE IF EXISTS body_styles CASCADE;
DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS car_instances;

CREATE TABLE IF NOT EXISTS manufacturers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS body_styles (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  manufacturer_id INTEGER REFERENCES manufacturers(id),
  body_style_id INTEGER REFERENCES body_styles(id),
  price INTEGER
);

CREATE TABLE IF NOT EXISTS car_instances (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  car_id INTEGER REFERENCES cars(id),
  production_date DATE,
  sold_date DATE
);

INSERT INTO manufacturers (name) 
VALUES
  ('Honda'),
  ('Toyota'),
  ('BMW'),
  ('Ford'),
  ('Ferrari');

INSERT INTO body_styles (name) 
VALUES
  ('Coupe'),
  ('Sedan');

INSERT INTO cars (name, manufacturer_id, body_style_id, price) 
VALUES
  ('Civic', 1, 1, 1500),
  ('Corolla', 2, 2, 2500 ),
  ('M3', 3, 2, 3500 ),
  ('Mustang', 4, 1, 4500 ),
  ('Roma', 5, 1, 5500 );

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
