const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const managerRoute = require("./routes/manager.route");
const octaneRoute = require("./routes/octane.route");
const mobilRoute = require("./routes/mobil.route");
const dieselRoute = require("./routes/diesel.route");
const expenseRoute = require("./routes/expense.route");
const detailsRoute = require("./routes/details.route");
const ErrorHandler = require("./middlewares/ErrorHandler.js");
const whitelist = require("./config/index").whitelist;
module.exports = (config) => {
  const app = express();
  app.use(helmet({ crossOriginEmbedderPolicy: false }));
  app.use(compression());
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // catch 404 and forward to error handler
  if (app.get("env") === "development") {
    app.locals.pretty = true;
  }

  app.get("/v1/api/", (req, res) => {
    res.send("hello world");
  });
  app.use("/v1/api/auth", authRoute);
  app.use("/v1/api/manager", managerRoute);
  app.use("/v1/api/octane", octaneRoute);
  app.use("/v1/api/diesel", dieselRoute);
  app.use("/v1/api/mobil", mobilRoute);
  app.use("/v1/api/expense", expenseRoute);
  app.use("/v1/api/details", detailsRoute);
  app.use((req, res, next) => {
    next(createError(404));
  });
  // error handler
  app.use(ErrorHandler);
  return app;
};
