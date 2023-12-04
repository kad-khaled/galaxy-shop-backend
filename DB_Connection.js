const mongoose = require("mongoose");

const connectToMongoDB = async (url_mongodb) => {
  try {
    await mongoose.connect(url_mongodb);
    console.log("the connection to mongoDB was established ...");
  } catch (err) {
    console.log("Connection to database was failed ....");
    process.exitCode = 1;
    return;
  }
  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log("the connection to mongoDB was established ...");
  });
  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
  return dbConnection;
};

module.exports = { connectToMongoDB };
