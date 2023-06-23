/*
    catchError: xử lý lỗi
    retry:
*/

const { forkJoin, catchError, of } = require("rxjs");

forkJoin([
  of(1),
  of(2),
  throwErrorr(new Error("401")).pipe(catchError((err) => of(err))),
]).subscribe(console.log);
