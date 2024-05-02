const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users'); // Import users.js

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mount user routes on the /users path
app.post('/users', users.createUser);
app.get('/users', users.getAllUsers);
app.get('/users/:id', users.getUserById);
app.put('/users/:id', users.updateUser);

// Add the deleteUser route (if implemented)
// app.delete('/users/:id', users.deleteUser);

// ... other server setup code

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
