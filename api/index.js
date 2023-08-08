const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
dotenv.config();

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: "majority" } })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    
    console.log(err);
  });


app.use("/api",authRoute);

app.listen(5000, () => {
    console.log("Backend server is running!");
  });