// import mongoose from "mongoose"

// const dbConnection = async ()=>{
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
//         console.log(`\n MonogoDB Connected`);
//     } catch (error) {
//         console.log("MongoDb Connection Failed", error);
//         process.exit(1)
//     }
// }

// export default dbConnection;

import mongoose from "mongoose";

let isConnected = false; // track connection

const dbConnection = async () => {
  if (isConnected) {
    // Use existing connection
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected:", conn.connection.host);
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnection;
