const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectToMongoDB } = require("./DB_Connection");
const UserRoutes = require("./routes/UserRoute");
const BrandRoutes = require("./routes/BrandRoute");
const CategoryRoutes = require("./routes/CategoryRoute");
const SubCategorydroutes = require("./routes/SubCategoryRoute");
dotenv.config();
const app = express();

const { PORT_NUM, DEV_MODE, MONGO_DB_URL } = process.env;
// use morgan only in the developpement mode
if (DEV_MODE === "DEV") {
  app.use(morgan("dev"));
}

connectToMongoDB(MONGO_DB_URL);
app.use(express.json());
app.use("/api/v1", UserRoutes);
app.use("/api/v1", BrandRoutes);
app.use("/api/v1", SubCategorydroutes);
app.use("/api/v1", CategoryRoutes);

app.get("/", (req, res) => {
  res.send({ result: "hello, world" });
});

app.listen(PORT_NUM, () => {
  console.log(`server running in http://localhost:${PORT_NUM}`);
});
