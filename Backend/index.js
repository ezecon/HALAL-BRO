const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
const port = 3000;


//mongodb
mongoose.connect('mongodb+srv://mdeconozzama:NC7qFlCX5oHHrGcJ@ajdsiwipdhiph.ohx5p.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('connceted to db');
})


// Routes
const product = require('./routes/products.js');
app.use('/api/v2/products', product);

const authRoutes = require('./routes/auth');
app.use('/api/v2/auth', authRoutes);

const authLogin = require('./Verification/Auth.js');
app.use('/api/v2/auth-login', authLogin);

const authVerify = require('./Verification/verifytoken.js');
app.use('/api/v2/auth-user-info', authVerify);

const user = require('./routes/User.js');
app.use('/api/v2/users', user);

const cart = require('./routes/cart.js');
app.use('/api/v2/carts', cart);

const order = require('./routes/order.js');
app.use('/api/v2/orders', order);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
