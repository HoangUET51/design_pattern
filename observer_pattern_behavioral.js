/*
    - Observer pattern định nghĩa mối quan hệ một nhiều giữa các đối tượng sao cho một đối tượng thay đổi trạng thái, tất cả các đối tượng liên quan sẽ được thông báo và cập nhật tự động.
    - Cơ chế hoạt động của Observer Pattern
        + Subject: là đối tượng mà trạng thái của nó sẽ được theo dõi
        + Observers: Những đối tượng muốn được thông báo khi Subject thay đổi trạng thái. 
*/
// Tạo user - Observer

class User {
  constructor(name) {
    this.name = name;
  }

  update(msg) {
    console.log(`${this.name} received: ${msg}`);
  }
}

// Tạo class chatRoom - Subject

class ChatRoom {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUser(user) {
    this.users = this.users.filter((u) => u !== user);
  }

  sendMessage(message) {
    this.users.forEach((user) => user.update(message));
  }
}

// Tạo 1 chatRoom

let chatRoom = new ChatRoom();

// Tạo 2 user

let user1 = new User("Lisa");
let user2 = new User("Jerry");

// Add 2 user vào chatRoom

chatRoom.addUser(user1);
chatRoom.addUser(user2);

// Gửi tin nhắn cho tất cả user

chatRoom.sendMessage("Hello world");
