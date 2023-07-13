import express from "express";
import CartManager from "../clases/CartManager.js";
import { Router } from "express";

let carritoManagerV1 = new CartManager("./carrito.json");

const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    await carritoManagerV1.getCarrito();
    res.json({
      status: "200 ok",
      message: "Se ha añadido correctamente",
    });
  } catch (err) {
    res.status(err.statusCode).send(`${err}`);
  }
});

router.get("/:cid", async (req, res) => {
  const id = Number(req.params.cid);
  try {
    const carrito = await carritoManagerV1.getCarritoById(id);
    res.json({ status: "200 ok", message: carrito });
  } catch (err) {
    // res.status(err.statusCode).send(`${err}`);
    res.status(400).send({ status: "Error", error: "Carrito no encontrado" });
  }
});

router.post("/:cid/productos/pid", async (req, res) => {
  const idProduct = Number(req.params);
  const idCarrito = Number(req.params);
  try {
    let carrito = carritoManagerV1.addProductoToCart(idProduct, idCarrito);
    res.json({ status: "200 ok", message: carrito });
  } catch (err) {
    res.status(400).send({
      status: "Error",
      error: "Error al cargar el producto al carrito",
    });
  }
});

export default router;
