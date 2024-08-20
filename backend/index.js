const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

const app = express();
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
