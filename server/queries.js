/*
$1, $2 ... is a variable placeholder in PostgreSQL
*/
const { Pool } = require('pg');
const { Client } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  'SELECT table_schema,table_name FROM information_schema.tables;',
  (err, res) => {
    if (err) throw err;
    for (const row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);

// POST (create) A NEW USER
const createUser = (request, response) => {
  const { name, breakfast } = request.body;

  pool.query(
    'INSERT INTO users (name, breakfast) VALUES ($1, $2)',
    [name, breakfast],
    (error, results) => {
      if (error) {
        throw error;
      }
      // eslint-disable-next-line no-undef
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

// GET(read) ALL USERS FUNCTION, ordered by id
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET(read) A SINGLE USER BY ID
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// PUT (update) data in an existing user
/*
- The /users/:id endpoint will also take two HTTP requests — the GET we created for getUserById, and also a PUT, to modify an existing user.
- PUT is idempotent, meaning the same call can be made over and over with the same outcome. This is different than POST, where the exact same call repeated will make new users with the same data.
 */
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// DELETE (delete) a user
/*
Finally, we’ll use the DELETE clause on /users/:id to delete a specific user by id. This call is very similar to our getUserById() function.
*/
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
