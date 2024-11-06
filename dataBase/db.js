// const mysql = require('mysql')
// const config = require('./config').db
// moudle.exports = mysql.createConnection(config)


const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '49.232.148.121',
  user: 'tourmap',
  password: 'fivegroup5',
  database: 'tourmap'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;