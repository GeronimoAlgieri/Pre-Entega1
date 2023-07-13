import express from "express";
import productRoutes from "./src/routes/productos.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/:api/productos", productRoutes);
app.use("/:api/carrito", cartRoutes);

app.listen(PORT, () => {
  console.log("listening at " + PORT);
});
