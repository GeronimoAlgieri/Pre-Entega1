import utils from "../../utils.js";

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    // genera la funcion addProduct
    if (
      (title == undefined,
      description == undefined,
      price == undefined,
      thumbnail == undefined,
      code == undefined,
      stock == undefined)
    ) {
      // throw new Error("Todos los campos son obligatorios");
    }
    try {
      let data = await utils.readFile(this.path);
      this.products = data?.length > 0 ? data : [];
    } catch (err) {
      console.log(err);
    }

    let codeExists = this.products.some((dato) => dato.code == code);

    if (codeExists) {
      // throw new Error("El codigo ya existe por favor verifique");
    } else {
      const newProduct = {
        id: crypto.randomUUID(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
      try {
        await utils.writeFile(this.path, this.products);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getProduct() {
    try {
      let data = await utils.readFile(this.path);
      return data?.length > 0 ? data : [];
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    let products = await this.getProduct();
    let findID = products.find((e) => e.id === id);
    if (findID) {
      return findID;
    } else {
      throw new Error("El ID indicado no existe");
    }
  }

  async updateProductoById(id, data) {
    try {
      let products = await utils.readFile(this.path);
      this.products = products?.length > 0 ? products : [];

      let productIndex = this.products.findIndex((dato) => dato.id === id);
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...data,
        };
        await utils.writeFile(this.path, products);
        return {
          mensaje: "producto actualizado",
          producto: this.products[productIndex],
        };
      } else {
        return { mensaje: "no existe el producto solicitado" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await utils.readFile(this.path);
      this.products = products?.length > 0 ? products : [];
      let productIndex = this.products.findIndex((dato) => dato.id === id);
      if (productIndex !== -1) {
        let product = this.products[productIndex];
        this.products.splice(productIndex, 1);
        await utils.writeFile(this.path, products);
        return { mensaje: "producto eliminado", producto: product };
      } else {
        return { mensaje: "no existe el producto solicitado" };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
