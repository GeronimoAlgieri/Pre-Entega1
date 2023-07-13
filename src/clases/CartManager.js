import utils from "../../utils.js";
import fs from "fs";

export default class CarritoManager {
  static correlativoId = 0;
  static carrito;
  constructor(path) {
    this.carrito = [];
    this.correlativoId = 0;
    this.path = path;
  }

  async addCarrito() {
    this.carrito = await this.getCarrito;
    this.carrito.push({
      id: this.carrito.length ? this.carrito.length : 0,
      producto: [],
    });
    utils.writeFile(this.path, this.carrito);
  }

  async getCarrito() {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      return data?.length > 0 ? data : [];
    } catch (error) {
      console.log(error);
    }
  }

  async getCarritoById(id) {
    let products = await this.getCarrito();
    let findID = products.find((e) => e.id === id);
    if (findID) {
      return findID;
    } else {
      throw new Error("El ID indicado no existe");
    }
  }

  async addProductoToCart(cartId, prodId) {
    let dataCart = await utils.readFile(this.path, "utf-8");
    const dataCartParse = JSON.parse(dataCart);
    let cart = dataCartParse.find((cart) => cart.id === parseInt(id));
    if (cart) {
      const prodIndex = cart.carrito.findIndex((prod) => prod.id === prodId);
      if (prodIndex !== -1) {
        cart.carrito[prodIndex].quantity++;
        const cartIndex = dataCartParse.findIndex(
          (cart) => cart.id === parseInt(cartId)
        );
        dataCartParse[cartIndex] = cart;
      } else {
        let producto = { id: prodId, quantity: 1 };
        cart.carrito.push(producto);
        dataCartParse.push(cart);
      }
    } else {
      console.log("Carrito no encontrado");
    }
  }
}

// export default {
//   CarritoManager,
// };
