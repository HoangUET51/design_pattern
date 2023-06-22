/*
    Facade pattern được sử dụng với mục đích giảm thiểu sự phức tạp của hệ thống. Phân tách class với chức năng riêng, tái sử dụng.
    VD: xây dựng module tính tiền shopee có các bước: check sp giảm giá => tính thuế VAT => dịch vụ vận chuyển 
*/

class ShopPattern {
  constructor() {
    this.discount = new Discount();
    this.shipping = new Shipping();
    this.fees = new Fees();
  }

  calc(price) {
    price = this.discount.calc(price);
    price = this.fees.calc(price);
    price += this.shipping.calc();

    return price;
  }
}

class Discount {
  calc(value) {
    return value * 0.9;
  }
}

class Shipping {
  calc() {
    return 5;
  }
}

class Fees {
  calc(value) {
    return value * 1.05;
  }
}
