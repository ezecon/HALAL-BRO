const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const port =  3000; 

// Middlewares
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Configure CORS
app.use(cors({
  origin: '*',
  credentials: true 
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error(err.message);
  process.exit(1);
});

// Routes
const product = require('./routes/products');
app.use('/api/v2/products', product);

const authRoutes = require('./routes/auth');
app.use('/api/v2/auth', authRoutes);

const user = require('./routes/User');
app.use('/api/v2/users', user);

const cart = require('./routes/cart');
app.use('/api/v2/carts', cart);

const order = require('./routes/order');
app.use('/api/v2/orders', order);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
