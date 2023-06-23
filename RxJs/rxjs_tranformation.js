/*
    Tranformation operators

*/

const { Observable } = require("rxjs");
const { map } = require("rxjs/operators");

const source = new Observable((observer) => {
  const users = [
    {
      id: "ddfe3653-1569-4f2f-b57f-bf9bae542662",
      username: "tiepphan",
      firstname: "tiep",
      lastname: "phan",
    },
    {
      id: "34784716-019b-4868-86cd-02287e49c2d3",
      username: "nartc",
      firstname: "chau",
      lastname: "tran",
    },
  ];

  setTimeout(() => {
    observer.next(users[0]);
  }, 1000);
  setTimeout(() => {
    observer.next(users[1]);
    observer.complete();
  }, 3000);
});

const observer = {
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log("completed"),
};

source
  .pipe(
    map((user) => {
      return {
        ...user,
        fullname: `${user.firstname} ${user.lastname}`,
      };
    })
  )
  .subscribe(observer);
