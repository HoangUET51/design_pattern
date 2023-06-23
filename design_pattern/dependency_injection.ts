/*
    DI: là design pattern. 
*/

//Dependency injection thông qua contructor

class ProductModel {
  sku: string;
  name: string;
  price: number;
}

interface CartItem {
  product: ProductModel;
  quantity: number;
}

class CartService {
  selectedProducts: CartItem[] = [];
  calculateTotal(): number {
    return this.selectedProducts.reduce(
      (total, item) => item.product.price * item.quantity + total,
      0
    );
  }
  addToCart(): void {
    // logic here
  }
}

//Injection (request để lấy về instance)

class ProductComponent {
  constructor(public cartService: CartService) {}

  addCalculator() {
    return this.cartService.addToCart;
  }
}

const container = () => {
  const service = new CartService();

  const productCom = new ProductComponent(service);

  return productCom.cartService.addToCart;
};

/*
  Dependency Injection trong angular
  
*/
