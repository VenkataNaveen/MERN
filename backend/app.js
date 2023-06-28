const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use(cors());
app.options('*',cors());

const product = require('./routes/products');

require('dotenv').config();

const apiUrl = process.env.API_URL;

app.use(`${apiUrl}/product`,product);

mongoose.connect(process.env.DB_CONNECTION,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'eshop_db'
}).then(()=>{
    console.log("Success in running DB");
}).catch((err)=>{
    console.log(process.env.DB_CONNECTION);
    console.log("error in running DB",err);
})


app.listen(3000,(err)=>{
    if(err){
        console.log("error in running app");
    }
    console.log("successFully running in port 3000");
})