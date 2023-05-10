const express = require('express');
const app = express();
const PORT = 8080;

// Middleware to parse incoming requests as JSON
app.use(express.json());

// Define API endpoints
app.get('/tshirt', (req, res) => {
  res.status(200).send({
    tshirt: 'adidas',
    size: 'large'
  });
});

app.post('/tshirt/:id', (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: 'We need a logo!' });
  } else {
    res.send({
      tshirt: `Logo with your ${logo} and ID of ${id}`
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});