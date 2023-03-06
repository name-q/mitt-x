# mitt-x
👊😈👊

更开放的监听订阅

```js
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
```

```js
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
```
