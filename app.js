const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectToMongoDB } = require("./DB_Connection");

dotenv.config();

const { PORT_NUM, DEV_MODE, MONGO_DB_URL } = process.env;

const app = express();
connectToMongoDB(MONGO_DB_URL);
app.use(express.json());

// use morgan only in the developpement mode
if (DEV_MODE === "DEV") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send({ result: "hello, world" });
});

app.listen(PORT_NUM, () => {
  console.log(`server running in http://localhost:${PORT_NUM}`);
});
