const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectToMongoDB } = require("./DB_Connection");
const { User } = require("./UserModel");

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

app.post("/api/v1/users", async (req, res) => {
  const userInfo = req.body;

  try {
    const user = User(userInfo);
    const savedUser = await user.save();
    // send the response if user saved successfully
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: savedUser,
    });
  } catch (err) {
    console.log("failed to save the user");
    res.status(400).json({
      state: "faild",
      stateCode: 400,
      message: " failed to save the data in the database.",
    });
  }
});

app.listen(PORT_NUM, () => {
  console.log(`server running in http://localhost:${PORT_NUM}`);
});
