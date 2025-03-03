const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const { connect } = require('./routes/contactRoutes');
const {userRoutes} = require('./routes/userRoutes');
const connectDb = require('./config/dbConnection');

const dotenv  =  require("dotenv").config()
connectDb()
const app =express()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contact", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 


