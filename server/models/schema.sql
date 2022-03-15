

CREATE TABLE users (
  _id serial PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL, 
  password VARCHAR(100) NOT NULL 
)

CREATE TABLE applications (
  _id serial PRIMARY KEY, 
  user_id INT NOT NULL, 
  status VARCHAR(50) NOT NULL, 
  date_created TIMESTAMP NOT NULL, 
  date_applied TIMESTAMP, 
  company VARCHAR(100), 
  position VARCHAR(100), 
  notes TEXT, 
  description TEXT, 

  FOREIGN KEY(user_id) REFERENCES users(_id)
)