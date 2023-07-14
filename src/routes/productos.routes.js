import express from "express";
import ProductManager from "../clases/ProductManager.js";
import { Router } from "express";
const productosManagerV1 = new ProductManager("./productos.json");

const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const limite = req.query.limit;
  try {
    let products = await productosManagerV1.getProduct();
    if (limite) {
      products = products.filter((el, index) => {
        return index < limite;
      });
    }
    res.send({
      status: "200 ok",
      message: products,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, error: "Error al buscar los productos" });
  }
});

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  try {
    let products = await productosManagerV1.getProductById(pid);

    res.json({
      status: "200 ok",
      message: products ? products : "no existe producto seleccionado",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: `El producto con el id: ${req.params.pid} no existe!`,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let product = req.query;
    await productosManagerV1.addProduct(product);
    res.send({
      status: "Success",
      message: "El producto fue agregado correctamente",
    });
  } catch (err) {
    res.status(400).send({
      status: "Error",
      message: "Producto no agregado, verifique lo datos",
    });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const {
      body,
      params: { pid },
    } = req;
    await productosManagerV1.updateProductoById(pid, body);
    res.send({ status: "Success", message: "Producto actualizado" });
  } catch (err) {
    res.status(400).send({
      status: "Error",
      message: "No se pudo actualizar, verifique los datos",
    });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.query;
  let product = await productosManagerV1.getProductById(pid);
  if (!product) {
    res
      .status(400)
      .send({ status: "Error", message: "Producto no encontrado" });
  } else {
    let result = await productosManagerV1.deleteProduct(parseInt(pid));
    res.json({ message: "Producto eliminado", data: result });
  }
});

export default router;
