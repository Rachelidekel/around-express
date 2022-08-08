const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
