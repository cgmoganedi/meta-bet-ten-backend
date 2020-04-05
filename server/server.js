if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({ path: `${process.env.PWD}/ .env` });
}

const express = require('express');
const apiRouter = require('./routes');

const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', apiRouter);

app.listen(process.env.PORT || '3000', () => {
  console.log(`Server running on port: ${process.env.PORT || '3000'}`);
});
