const express = require('express');
const morgan = require('morgan');
require('dotenv').config({path: './config.env'})

const app = express();
app.use(morgan('combined'));

// Define routes
app.use('/api/v2/slot')
app.use('/api/v2/registration')
app.use('/api/v2/user')

app.listen(process.env.PORT, () => {
    console.log("vac-19 server ready.");
})

