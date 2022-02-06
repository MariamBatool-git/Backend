CREATE DATABASE pern_sbb;

CREATE TABLE allbooks(
  book_id SERIAL PRIMARY KEY,
  book_name VARCHAR(255),
  author VARCHAR(255),
  borrowed_by VARCHAR(255),
  borrow_date Date,
  expected_return_date Date
);