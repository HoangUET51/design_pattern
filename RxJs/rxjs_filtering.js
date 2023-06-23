/*
    filter: lọc lược bỏ theo điều kiện rồi complete
    first: emit giá trị đầu tiên rồi trả về complete, sẽ throw EMPTY ERROR nếu observable tự complete. hoặc of() không nhận giá trị nào.
    last: ngược lại với first
    find(): giống array.find() trả về giá trị đầu tiên thỏa mãn đk từ predicate rồi complete. sẽ không emit error nếu không có giá trị nào thỏa mãn
    take(): nhận vào 1 tham số count dùng cho số lần lấy giá trị được emit từ observable sau đó sẽ complete
    takeLast(): Ngược lại với take()
    skip(): hoạt động tương tự take() nhưng n sẽ bỏ qua n giá trị ban đầu
    distinct(): so sánh giá trị được emit và chỉ emit các giá trị chưa được emit qua ( Loại bỏ phần tử trùng lặp)
*/

const { filter, from, first, take, skip, distinct } = require("rxjs");

from([1, 2, 3, 4, 5, 6, 7])
  .pipe(filter((x) => x % 2 === 0))
  .subscribe((x) => console.log("filter", x));

from([1, 2, 3, 4, 5, 6, 7])
  .pipe(first())
  .subscribe((x) => console.log("first", x));

from([1, 2, 3, 4, 5, 6, 7])
  .pipe(take(2))
  .subscribe((x) => console.log("take", x));

from([1, 2, 3, 4, 5, 6, 7])
  .pipe(skip(3))
  .subscribe((x) => console.log("skip", x));
from([11, 22, 33, 11, 1, 4, 33, 11, 22])
  .pipe(distinct())
  .subscribe((x) => console.log("distinct", x));
