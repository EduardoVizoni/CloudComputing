
const express = require("express");
const app = new express();
const routes = require("./Routes/routes");

app.use(express.json());
app.use("/", routes);

const PORT = 3010;
app.listen(PORT, () => {
   console.log("Servidor na porta: ", PORT);
});
