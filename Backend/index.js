const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middlewares
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mdeconozzama:UFyGpfTmxCEVKHrU@cluster0.7fkqi.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error(err.message);
  process.exit(1);
});

// Routes
const product = require('./routes/products.js');
app.use('/api/v2/products', product);

const authRoutes = require('./routes/auth');
app.use('/api/v2/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
