/*
    forkJoin(): công dụng tương đương promise.all(). Nhận vào tham só list các observable dạng array hoặc obj. Khi các child complete hết forkJoin() emit các giá trị children.
    combineLatest(): tương tự forkJoin nhưng chỉ nhận vào array không nhận vào obj. Và chỉ cần ít nhất một children complete thì combinelatest emit. 
    zip(): nhận vào tham số tượng trưng cho các child Observable được truyền vào lần lượt. sẽ gom tất cả các emit theo cặp, zip throw error nếu một trong các child error
*/

const { forkJoin, of, zip } = require("rxjs");

// forkJoin([
//   this.apiService.getAccountDropdown(),
//   this.apiService.getDepartmentDropdown(),
//   this.apiService.getStoreDropdown(),
// ]).subscribe(([account, department, store]) => {
//   console.log(account);
//   console.log(department);
//   console.log(store);
// });

forkJoin([of(1, 2, 3, 4), of(12, 34, 1), of(1, 2, 3, 4, 5, 6, 9)]).subscribe(
  ([a, b, c]) => {
    console.log(a);
    console.log(b);
    console.log(c);
  }
);

forkJoin({
  foo: of(1, 2, 3, 4),
  bar: of(12, 34, 1),
  baz: of(1, 2, 3, 4, 5, 6, 9),
}).subscribe((res) => {});

zip(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)).subscribe(console.log);
// [1, 4, 7]; // 3 số đầu tiên ở từng observable
// [2, 5, 8]; // 3 số tiếp theo
// [3, 6, 9]; // 3 số cuối cùng
