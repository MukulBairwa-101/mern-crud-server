const express = require('express');
const dbConnection = require('./db/db');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());



const router = require('./routes/routes');




// const parser = bodyParser.json();



app.use("/users", router);






const PORT = process.env.SERVER_PORT || 8000

app.listen(PORT,()=>console.log(`Server is running at ${process.env.SERVER_ENDPOINT}${PORT}`));

