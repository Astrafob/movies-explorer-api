require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/expressRateLimit');
const { DB_ADDRESS } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(requestLogger);

mongoose.connect(DB_ADDRESS);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
