const express = require("express");
const app = new express();
const route = require("./routes/routes");

app.use(express.json());
app.use("/", route);

const PORT = 3010;
app.listen(PORT, () => {
   console.log("Servidor na porta: ", PORT);
});