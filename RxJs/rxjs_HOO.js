/*
    - HOOs là những operators mà sẽ nhận vào giá trị của Outer Observable (hay còn gọi là Source) và sẽ trả về một Inner Observable (hay còn gọi là Destination) khác.
    - switchMap(): là HOOs nhận vào projectFunction mà sẽ nhận vào giá trị được emit từ Outer Observable và sẽ trả về 1 Observable mới. 
    Giá trị cuối cùng của outer observable khi dùng với switchMap() sẽ là giá trị mà Inner Observable emit.
*/

const { of, switchMap } = require("rxjs");

of(1, 2, 3)
  .pipe(switchMap((x) => of(x, x ** 2, x ** 3)))
  .subscribe((x) => console.log(x));
