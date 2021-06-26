const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool ({
    user : 'postgres',
    host : 'localhost',
    database : 'vaccine_hack21',
    password : 'test',
    port : 5432    
})

app.use(cors());
app.use(
    express.urlencoded({
      extended: true
    })
)
  
app.use(express.json())

app.get('/', (request, response) => {
    let pincode = request.query.pincode;
    let query = 'SELECT * FROM ' + `"${pincode}"` + ';'
    console.log(query);

    pool.query(query, (err,res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            response.send(res.rows);
        }
    })
})

app.listen(8080, () => {
    console.log('server working');
})