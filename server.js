const fs = require('fs');
const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;

//initalizes express app
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

//any time a client navigates to <ourhost>/api, app use router we set up in apiRoutes
app.use('/api', apiRoutes);

// If / is the endpoint, then the router will serve back our HTML routes.
app.use('/', htmlRoutes);

//creates server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
