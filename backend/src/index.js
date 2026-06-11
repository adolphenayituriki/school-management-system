require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed, starting server without DB:', err.message);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (no database connection)`);
    });
  });
