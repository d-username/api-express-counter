const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const counter = require("./counter/counter");
const counterTwo = require("./counter/counterTwo");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// GET /counter - Returns the current value of the counter. The counter should start of at 0.
// POST /counter/increment- Increments the counter on the server and returns the current value.
// POST /counter/decrement- Decrements a counter on the server and returns the current value.
// POST /counter/double- Double the value of the counter on the server and returns the current value.
// DELETE /counter - Resets the counter to 0 and returns the current value.

app.get("/counter", (req, res) => {
  res.json({ counter });
});

app.post("/counter/increment", (req, res) => {
  const incrementBy = req.body.incrementBy;
  counter.value += incrementBy;
  res.json({ counter });
});

app.post("/counter/decrement", (req, res) => {
  const decrementBy = req.body.decrementBy;
  counter.value -= decrementBy;
  res.json({ counter });
});

app.post("/counter/double", (req, res) => {
  const multiplyBy = req.body.multiplyBy;
  counter.value *= multiplyBy;
  res.json({ counter });
});

app.delete("/counter", (req, res) => {
  const operation = req.body.operation;
  console.log("OPERATION: ", operation);
  if (operation === "reset") {
    counter.value = 0;
  }
  res.json({ counter });
});

// Extension 1
// PUT /counter - counter?value=20 should set the value of the counter to 20 - specified by a query string parameter. Use the req.query property in your callback to get the value provided.

app.put("/counter", (req, res) => {
  const operation = req.body.operation;
  const newValue = Number(req.query.value);
  if (operation === "setValuebyQueryString") {
    counter.value = newValue;
  }
  res.json({ counter });
});

// Extension 2
// Using route parameters - Allow the client to specify the counter name as part of the URL.
// POST / counter / cars / increment;
// POST / counter / cars / decrement;
// POST / counter / cars / double;
// DELETE / counter / cars;
// GET / counter / cars;

app.post("/countertwo/increment", (req, res) => {
  const incrementBy = req.body.incrementBy;
  counterTwo.value += incrementBy;
  res.json({ counterTwo });
});

app.post("/countertwo/decrement", (req, res) => {
  const decrementBy = req.body.decrementBy;
  counterTwo.value -= decrementBy;
  res.json({ counterTwo });
});

const port = 3030;
app.listen(port);
