const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");  // Import the routes

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/myproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Use the routes from userRoutes
app.use("/", userRoutes);  // This should now work correctly

// route to render the view
app.get("/", (req, res) => {
  res.render("index"); // This will render the "views/index.ejs" file
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App running at http://localhost:" + port);
});
