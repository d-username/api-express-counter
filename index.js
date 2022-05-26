const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const counter = require("./counter/counter");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("got request!");
  res.json("Hello!");
});

app.get("/counter", (req, res) => {
  res.json(counter);
});

app.post("/counter/increment", (req, res) => {
  const incrementBy = req.body.incrementBy;
  counter.value += incrementBy;
  res.json(counter.value);
});

app.post("/counter/decrement", (req, res) => {
  const decrementBy = req.body.decrementBy;
  counter.value -= decrementBy;
  res.json(counter.value);
});

app.post("/counter/double", (req, res) => {
  const multiplyBy = req.body.multiplyBy;
  counter.value *= multiplyBy;
  res.json(counter.value);
});

app.delete("/counter", (req, res) => {
  const operation = req.body.operation;
  console.log("OPERATION: ", operation);
  if (operation === "reset") {
    counter.value = 0;
  }
  res.json(counter.value);
});

const port = 3030;
app.listen(port);

// GET /counter - Returns the current value of the counter. The counter should start of at 0.
// POST /counter/increment- Increments the counter on the server and returns the current value.
// POST /counter/decrement- Decrements a counter on the server and returns the current value.
// POST /counter/double- Double the value of the counter on the server and returns the current value.
// DELETE /counter - Resets the counter to 0 and returns the current value.
