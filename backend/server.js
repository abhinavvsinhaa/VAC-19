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

app.post('/homereg',(request, response) => {
    console.log(request.body);
    let user = {
        name: request.body.name,
        age: request.body.age,
        mobile: request.body.mobile,
        verificationId: request.body.verificationId,
        idNo: request.body.idNo,
        address: request.body.address,
        pincode: request.body.pincode,
        reason: request.body.reason
    }

    let query = 'INSERT INTO homereg(name,age,mobile,verification_id,id_no,pincode,address,reason) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
    let values = [user.name,user.age,user.mobile,user.verificationId,user.idNo,user.pincode,user.address,user.reason];

    pool.query(query,values, (err,res) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Home registration done!')
            return response.status(200).send('User registered');
        }
    })

})

app.post('/basicreg',(request, response) => {
    console.log(request.body);
    let user = {
        name: request.body.name,
        age: request.body.age,
        mobile: request.body.mobile,
        verificationId: request.body.verificationId,
        idNo: request.body.idNo,
        pincode: request.body.pincode,
        vanAddress: request.body.vanAddress
    }

    let query = 'INSERT INTO basicreg(name,age,mobile,verification_id,id_no,pincode,van_address) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
    let values = [user.name,user.age,user.mobile,user.verificationId,user.idNo,user.pincode,user.vanAddress];

    pool.query(query,values, (err,res) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Basic registration done!')
            return response.status(200).send('User registered');
        }
    })
})

app.get('/getdetailsBasic',(request, response) => {
    let idNo = request.query.idNo;
    let mobile = request.query.mobile;
    let query1 = 'SELECT * FROM basicreg WHERE id_no = $1 AND mobile = $2';
    let values1 = [idNo,mobile]; 

    pool.query(query1, values1, (err,res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res.rows[0]);
            response.json(res.rows[0]);
        }
    })
})

app.get('/getDetailsHome',(request, response) => {
    let idNo = request.query.idNo;
    let mobile = request.query.mobile;
    let query2 = 'SELECT * FROM homereg WHERE id_no = $1 AND mobile = $2';
    let values2 = [idNo,mobile];
    pool.query(query2, values2, (err,res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res.rows[0]);
            response.json(res.rows[0]);
        }
    })  
})


app.listen(8080, () => {
    console.log('server working');
})