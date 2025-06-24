const express = require("express");
const { connectMongoDb } = require("./config/db-connect");
const cors = require("cors");
const app = express();
const PORT = 8000;
const userRoutes = require("./routes/user-route");
// middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

//connect database
(async () => {
  try {
    await connectMongoDb(
      "mongodb+srv://yogeshrajak:Y%40gesh04@collegemanagementsystem.hk7bgek.mongodb.net/myCampus"
    );

    app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();
