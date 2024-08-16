const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = 3000

//middlewares
app.use(bodyParser.json())
app.use(cors())

//connect to mongodb
mongoose.connect('mongodb+srv://mdeconozzama:UFyGpfTmxCEVKHrU@cluster0.7fkqi.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0',{
  useNewUrlParser: true,
  useUnifiedTopology:true
});

const db = mongoose.connection
db.on('error',console.error.bind(console, 'connection error'));
db.once('open',()=>{
  console.log('Connected to mongodb');
})

const product = require('./routes/products.js')
app.use('/api/v2/products',product);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//UFyGpfTmxCEVKHrU