// app.js
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }, // cookie tylko dla serwera
  }),
);

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.use(express.urlencoded({ extended: true }));

// Routing
const webRoutes = require("./routes/web");
app.use("/", webRoutes);

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Serwer
app.listen(3002, () => {
  console.log("Server is working on port 3002");
});
