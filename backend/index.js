const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
dotenv.config({path: path.join(__dirname,'config','config.env')})


connectDB();

// middleware 

app.use(express.json()); //takes the req and sets it into the body
app.use(cors());

app.use('/api/v1/cafe',require("./routes/cafeRoutes"));
app.use('/api/v1/item',require("./routes/itemRoutes"));
app.use('/api/v1/user',require("./routes/userRoutes"));
app.use('/api/v1/order',require("./routes/orderRoutes"));
app.use('/api/v1/pickup',require("./routes/pickupRoutes"));
app.use('/api/v1/payment',require("./routes/paymentRoutes"));

// error handle
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Serever listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});

