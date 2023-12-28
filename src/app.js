const express = require("express");
const app = express();
app.use(express.json());
const pastesRouter = require("./pastes/pastes.router");
const usersRouter = require("./users/users.router");

// TODO: Follow instructions in the checkpoint to implement ths API.

app.use("/pastes", pastesRouter);
app.use("/users", usersRouter);


// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.log(error);
  const { status = 500, message = "Something went wrong!" } = error;

  response.status(status).json({ error: message });
});

module.exports = app;
