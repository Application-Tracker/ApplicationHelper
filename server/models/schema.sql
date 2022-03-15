

CREATE TABLE users (
  _id serial PRIMARY KEY,
  username unique NOT NULL VARCHAR(50), 
  password NOT NULL VARCHAR(100)
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