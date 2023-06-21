class Order {
  constructor(userId) {
    this.userId = userId;
    this.timeOrder = Date.now();
    this.products = [];
  }
}

class OrderManager {
  constructor() {
    this.order = null;
  }

  createOrder(userId) {
    this.order = new Order(userId);
  }

  addProduct(product) {
    this.order.products.push(product);
  }

  getOrder() {
    return this.order;
  }

  isValid() {
    return !!this.order.products.length;
  }
}

const orderManager = new OrderManager();
orderManager.createOrder("userId-1011");
orderManager.addProduct({ product: 101, userId: 2, MSP: 3 });

console.log("order:::", orderManager.getOrder());
