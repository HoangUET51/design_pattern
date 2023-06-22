/*
  - Nguyên lý SOLID là tập hợp các nguyên tắc thiết kế phần mềm, giúp hiểu được cách cấu trúc code để code mạnh mẽ, dễ dàng bảo trì và linh hoạt nhất có thể.
  - S => single responsibility: mỗi class thực hiện 1 nhiệm vụ, không nên gộp chung vào, việc maintain hay mở rộng code trở nên dễ dàng hơn.
  - O => Open/Close: hạn chế việc chỉnh sủa bên trong một class hoặc module có sẵn, thay vào đó hay xem xét mở rộng.
  - L => Liskov substiution: các đối tượng trong một chương trình có thể thay thế bởi các class con mà không làm thay đổi tính đúng đắn của chương trình.
      + Phương thức class con ghi đè phương thức class cha với chính xác số lượng tham số.
      + Mỗi tham số của phương thức ghi đè phải có type giống như phương thức class cha
      + Type của giá trị trả về phương thức ghi đè của class con giống class cha
      + Các type exception được ném từ phương thức ghi đè của class phải giống phương thức cha
  - I => Interface segregation: 1 class không nên bị buộc thực hiện các phương thức không sử dụng. Nhiều interface mục đích cụ thể tốt hợn một interface mục đích chung.
  - D Dependency Inversion: đề cập đến việc tách rời module. Mối quan hệ phụ thuộc thông thường được thiết lập từ các module cấp cao đến module cấp thấp sẽ bị đảo ngược.
      + Các module cấp cao không nên phụ thuộc vào module cấp thấp. Cả 2 đều nên phụ thuộc vào trừu tượng.
      + Trừu tượng không nên phụ thuộc vào chi tiết. Các chi tiết nên phụ thuộc vào trừu tượng.
*/

// VD => S
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

//VD: => O
const roles = ["ADMIN", "USER"];
checkRole = (user) => {
  if (roles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
// Thay vì sửa đổi code ta thêm func để thêm role mới

const addRole = (role) => {
  roles.push(role);
};

addRole("SUPER_USER");

checkRole("ADMIN"); //true
checkRole("Foo"); //false
checkRole("SUPERUSER"); //true

//VD => L
class Bird {
  fly(speed) {
    return `Flying at ${speed} km/h`;
  }
}
// Khong vi pham
class Eagle extends Bird {
  dive() {}

  fly(speed) {
    return `Soaring through the sky at ${speed}`;
  }
}
//Vi pham LSP
class Penguin extends Bird {
  fly() {
    return new Error("Sorry, I cant fly");
  }
}

//VD: => L

//ISP: Validate chỉ khi cần thiết
class UserISP {
  constructor(username, password, validate) {
    this.username = username;
    this.password = password;
    this.validate = validate;

    if (validate) {
      this.initiateUser(username, password);
    } else {
      console.log("no validation required");
    }
  }

  initiateUser() {
    this.validateUser(this.username, this.password);
  }

  validateUser = (username, password) => {
    console.log("validating...");
  };
}

// User khi bắt buộc phải validation
console.log(new UserISP("Francesco", "123456", true));
// validating...
// UserISP {
//   validateUser: [Function: validateUser],
//   username: 'Francesco',
//   password: '123456',
//   validate: true
// }

// User khi không bắt buộc validation
console.log(new UserISP("guest", "guest", false));
// no validation required
// UserISP {
//   validateUser: [Function: validateUser],
//   username: 'guest',
//   password: 'guest',
//   validate: false
// }

//VD => D.trong các class mà bạn import phương thức doGet, bạn sẽ không cần phải quan tâm nó được triển khai cụ thể như thế nào,
//việc này cho phép bạn tách đoạn code xử lý download ra khỏi module chính.
//Đồng thời cách đóng gói code như vậy cũng giúp code sẽ không bị lặp lại, dễ dàng maintain.

//utils.js
const doGet = (url) => {
  return fetch(url, {
    method: "GET",
    mode: "same-origin",
  }).then((r) => r.json());
};

//DowloadToConsole.js

const url = "https://jsonplaceholder.typicode.com/posts";
class Example {
  constructor() {}
  downloadDataFromAPI(params) {
    doGet(url).then((r) => {
      console.log("Posts:" + r);
    });
  }
}
