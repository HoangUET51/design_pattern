/*
    - of() là operators dùng để tạo 1 observable từ bất cứ giá trị gì: primitives, array, obj, func. of() 
    sẽ nhận vào các giá trị và sẽ complete ngay sau khi tất cả các giá trị truyền vào được emit.
    - from() tương tự như of() nhưng n chỉ nhận 1 Iterable from([1, 2, 3]).subscribe(observer) <=> of(1, 2, 3).subscribe(observer)
    - fromEvent(): chuyển đổi 1 event sang observable. Muốn sử dụng cần nhs unsbscrible các observable tránh tràn bộ nhớ
    - interval(): tạo observable mà emit ra số nguyên từ 0 theo 1 chu kì nhất định, giống setInterval
    - throwError(): tạo observable thay vì emit giá trị, observable sẽ throw 1 error ngay lập tức sau khi subscribe.
*/

//of
of("Hello world").subscribe(observer);
of([1, 2, 3, 4, 5]).subscribe(observer);
of(1, 2, "hello", [1, 2, 3, 4], { hello: "world" }).subscribe(observer);

//fromEvent
const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
fromEvent(btn, "click").subscribe(observer);

//interval
interval(1000) // emit giá trị sau mỗi giây
  .subscribe(observer);

//throwError
throwError("an error").subscribe(observer);
