const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
             // Enables the new unified topology layer
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exits the application if connection fails
    }
};

module.exports = connectDB;
