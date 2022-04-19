const express = require('express');
const router = require('./src/routes/route');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);  //localhost:8080/api/v1      ==> path

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listeing on port: ${port}`);
});