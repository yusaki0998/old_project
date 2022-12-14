/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");
if (process.env.NODE_ENV !== 'test') {
  require("./utils/cron");
}
const morgan = require("morgan");
const path = require("path");

//Declare routes
const userRoutes = require("./routes/user-route");
const movieRoutes = require("./routes/movie-route");
const roomRoutes = require("./routes/room-route");
const slotRoutes = require("./routes/slot-route");
const scheduleRoutes = require("./routes/schedule-route");
const seatRoutes = require("./routes/seat-route");
const ticketRoutes = require("./routes/ticket-route");
const reportRoutes = require("./routes/report-route");

//middleware section
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/slots", slotRoutes);
app.use("/api/v1/schedules", scheduleRoutes);
app.use("/api/v1/seats", seatRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/reports", reportRoutes);

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
