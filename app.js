const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const { PORT_NUM, DEV_MODE } = process.env;

const app = express();
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
