const mittx = function mittx(storage) {
  // 数据结构
  // {[key]:[fun,fun,fun,...],[key2]:[fun,fun]}
  // ->  {sym:[fun,fun,fun,...], sym:[fun,fun]}
  storage =
    Object.prototype.toString.call(storage) === "[object Object]"
      ? storage
      : Object.create(null);

  return {
    on: function on(type, handler) {
      console.log(`[mitt-x] on: type=${type.toString()}`);
      const sym = typeof type === "symbol" ? type : Symbol.for(type);
      (storage[sym] || (storage[sym] = [])).push(handler);
      console.log(`[mitt-x] on: handlers=`, storage[sym]);
      return () => {
        this.off(type, handler);
      };
    },

    off: function off(type, handler) {
      console.log(`[mitt-x] off: type=${type.toString()}`);
      const sym = typeof type === "symbol" ? type : Symbol.for(type);
      if (storage[sym]) {
        storage[sym].splice(storage[sym].indexOf(handler) >>> 0, 1);
        console.log(`[mitt-x] off: handlers=`, storage[sym]);
      }
    },

    emit: function emit(type, evt) {
      console.log(`[mitt-x] emit: type=${type.toString()}`);
      const sym = typeof type === "symbol" ? type : Symbol.for(type);
      (storage[sym] || []).slice().map(function (handler) {
        console.log(`[mitt-x] emit: handler=`, handler);
        handler(evt);
      });
    },

    all: function all() {
      return {
        storage,
        keys: Object.getOwnPropertySymbols(storage).map(
          (sym) => sym.description
        ),
      };
    },
  };
};

/**
// 案例1 -常规用法-
const msg = mittx();
// 监听handle
const handle = () => {
  console.log(Date.now());
};
msg.on("demo", handle);
// 触发
msg.emit("demo"); // 1678080875920
// 卸载
msg.off("demo", handle);
// 卸载后再触发
msg.emit("demo"); // undefined
*/

/**
// 案例2 -react hook用法-
const msg = mittx();
// 监听handle
const handle = () => {
  console.log(Date.now());
};
React.useEffect(() => {
  const subscribe = msg.on("demo", handle);
  // 卸载handle
  return subscribe();
}, []);
*/
