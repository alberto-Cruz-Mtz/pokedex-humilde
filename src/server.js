const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { pokeApiRoute } = require("./routes/pokeapi.route");
const { default: mongoose } = require("mongoose");
const { favoriteRouter } = require("./routes/favorites.route");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.use("/", pokeApiRoute);
app.use("/", favoriteRouter);

const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/utsv501", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Manejar eventos de conexión
mongoose.connection.on("connected", () => {
  console.log("Mongoose conectado a", process.env.MONGODB_URI);
});

mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión de Mongoose:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose desconectado");
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
