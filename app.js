const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const { handleConnection } = require("./controllers/sessionController");

const problemRouter = require("./routes/problemRoutes");
const teamRouter = require("./routes/teamRoutes");
const userRouter = require("./routes/userRoutes");
const courseRouter = require("./routes/courseRoutes");
const quizRouter = require("./routes/quizRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const contestRouter = require("./routes/contestRoutes");
const roadmapRouter = require("./routes/roadmapRoutes");
const questionRouter = require("./routes/questionRoutes");
const sessionRouter = require("./routes/sessionRoutes");

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "js")));
app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

app.use(cors());

// ROUTES
app.use("/users", userRouter);
app.use("/problems", problemRouter);
app.use("/teams", teamRouter);
app.use("/courses", courseRouter);
app.use("/quizes", quizRouter);
app.use("/feedbacks", feedbackRouter);
app.use("/contests", contestRouter);
app.use("/roadmaps", roadmapRouter);
app.use("/questions", questionRouter);
app.use("/session", sessionRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
