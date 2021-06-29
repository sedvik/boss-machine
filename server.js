const express = require('express');
const cors = require('cors');
const app = express();

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middleware for parsing request bodies here:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Error catching middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log(`Error identified for request method ${req.method} with status ${status}:\n${err.message}`)
  res.status(status).send(err.message);
})

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
  });
}
