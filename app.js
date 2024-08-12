const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const dbconnection = require('./src/config/db.js');
const router = require('./src/routes.js');
dotenv.config();//{ path: './src/.env' }
const app = express();
//192.168.29.188
dbconnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./'));

app.get('/test',async(req,res)=>{
    res.send('server running...');
});

app.use('/',router);

app.listen(process.env.PORT,()=>{
    console.log("server is running on port number "+process.env.PORT);
})