const mittx = function mittx(storage) {
  storage =
    Object.prototype.toString.call(storage) === "[object Object]"
      ? storage
      : Object.create(null);

  return {
    on: function on(type, handler) {
      const sym = typeof type === "symbol" ? type : Symbol.for(type);
      (storage[sym] || (storage[sym] = [])).push(handler);
      return () => {
        this.off(type, handler);
      };
    },

    off: function off(type, handler) {
      const sym = typeof type === "symbol" ? type : Symbol.for(type);
      if (storage[sym]) {
        storage[sym].splice(storage[sym].indexOf(handler) >>> 0, 1);
      }
    },

    emit: function emit(type, evt) {
      const sym = typeof type === "symbol" ? type : Symbol.for(type);
      (storage[sym] || []).slice().map(function (handler) {
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
