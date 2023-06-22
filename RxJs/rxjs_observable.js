/*
    + Observable: đại diện cho một tập hợp với các giá trị hoặc sự kiện trong tương lai. Nó là func(class). Nhận đàu vào là một func, mà func nhận đầu vào là observer và trả về một func để có thể thực hiện việc cancel quá trình xử lý thường gọi unsubscribe
    + Observer lần một tập hợp các callback tương ứng cho việc lắng nghe cấc giá trị(next, error, complete) được gửi đến bởi observable.
    + Subscription là kết quả có được sau khi thực hiện một observable, dùng tron hủy việc tiếp tục xử lý.
    + Operators: là pure func cho phép lập trình functional với Observable.
    + Subject để thực hiện việc gửi dữ liệu đén nhiêu observable
    + schedulers: một schedulers sẽ điều khiển khi nào subscription bắt đầu thực thi, khi nào sẽ gửi tín hiệu đi.
*/

const { Observable } = require("rxjs");

// Creating observable: Để create một Observable chúng ta chỉ cần gọi constructor và truyền vào một function (gọi là subscribe), trong đó subscribe function sẽ nhận đầu vào là một Observer.

const observable = new Observable(function subscribe(observer) {
  const id = setTimeout(() => {
    observer.next("Hello RxJs");
    observer.complete();
  }, 1000);

  return () => {
    clearTimeout(id);
  };
});

// Invoking Observable - Observer

const subscription = observable.subscribe({
  next: (value) => console.log(value),
  error: (e) => console.log(e),
  complete: () => console.log("done"),
});

// Disposing Observable Executions - subscription: một subscription chứa nhiều subscription con, khi subscription unsubscribe, các subscription con bị unsubscribe, ở subscription cha gọi method add để thêm con.

setTimeout(() => {
  subscription.unsubscribe();
}, 2000);

const foo = interval(500);
const bar = interval(700);

const subscriptParent = foo.subscribe((x) => console.log("first", x));
const subscriptChild = bar.subscribe((x) => console.log("second", x));

subscriptParent.add(subscriptChild);

setTimeout(() => {
  subscriptParent.unsubscribe();
}, 2000);
