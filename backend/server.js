const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routesCars = require('./routes/carsRoutes.');
const routesAuth = require('./routes/authRoutes');

// const corOptions = {
//     origin: 'http://localhost:3001'
// };

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cars', routesCars);
app.use('/api', routesAuth);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));