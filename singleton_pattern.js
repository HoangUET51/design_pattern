/*
    - Singleton Pattern là một mẫu thiết kế được sử dụng để đảm bảo rằng mỗi một class chỉ có được một instance duy nhất và mọi tương tác đều thông qua instance này
    - Instance của singleton giống như global object.
*/

const Singleton = () => {
  var instance;

  const createInstance = () => {
    var obj = new Object("I am th instance");

    return obj;
  };

  return {
    getIntance: !instance ? createInstance() : instance,
  };
};

console.log("Singleton1", Singleton().getIntance);
console.log("Singleton2", Singleton().getIntance);
