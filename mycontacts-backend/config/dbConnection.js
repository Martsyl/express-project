const mongoose = require('mongoose');
const connectDb = async ()  => { 
    try {
      const connnect=  await mongoose.connect(process.env.CONNECTION_STRING);
          console.log("Database connected", connnect.connection.host, connnect.connection.name);
            
        }  catch (err) {
        console.log('Error connecting to database', err);
        process.exit(1);
    }
}
module.exports = connectDb;