import productsData from "@/services/mockData/products.json";

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.products.map(product => ({ ...product }));
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = this.products.find(p => p.Id === parseInt(id));
    return product ? { ...product } : null;
  }

  async create(productData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.Id)) + 1 : 1;
    const newProduct = {
      Id: newId,
      ...productData,
      createdAt: new Date().toISOString()
    };
    
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const productIndex = this.products.findIndex(p => p.Id === parseInt(id));
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    this.products[productIndex] = { ...this.products[productIndex], ...updates };
    return { ...this.products[productIndex] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const productIndex = this.products.findIndex(p => p.Id === parseInt(id));
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    this.products.splice(productIndex, 1);
    return true;
  }
}

export default new ProductService();