---
title: React Hooks 速查手册
id: react-hooks-cheatsheet
date: 2020-03-13T12:14:03+08:00
tags:
  - react
  - 开发
  - cheatsheet
---

简单直观的 React Hooks 速查手册

## useState

使函数组件可以拥有内部的状态。

```js
const [state, setState] = useState(initialState)

setState(newState)
```

## useEffect

使函数组件可以在 render 时可以进行一些副作用操作。

```js
useEffect(() => {
  // 操作
  ...

  // 清理操作
  return () => {
    ...
  }
}, dependencyList) // dependencyList 为 [] 时，仅在组件挂载和卸载时执行
```

## useContext

使函数组件可以使用 context。

```js
const myContext = useContext(MyContext)
```

## useReducer

useState 的替代方案，易于处理逻辑较复杂且包含多个子值的 state。

```js
function reducer(state, action) {
  switch (action.type) {
    case 'TYPE_1':
      ...
      break
    case 'TYPE_2':
      ...
      break
    case 'TYPE_3':
      ...
      break
    default:
      ...
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
```

## useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

## useMemo

用于创建一个 memoized 值，它仅会在某个依赖项改变时才重新计算 memoized 值，有助于避免在每次渲染时都进行高开销的计算。

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

## useRef

返回 ref 对象。

```js
const ref = useRef(initialValue)

...

return (
  <div ref={ref}>
    ...
  </div>
)
```

## useImperativeHandle

```js
useImperativeHandle(ref, createHandle, [deps])
```

## useLayoutEffect

使函数组件可以在所有的 DOM 变化后可以进行一些副作用操作。可以使用它来读取 DOM 并触发重渲染。

```js
useLayoutEffect(() => {
  // 操作
  ...

  // 清理操作
  return () => {
    ...
  }
}, dependencyList) // dependencyList 为 [] 时，仅在组件挂载和卸载时执行
```

## useDebugValue

用于在 React 开发者工具中显示 hook 的调试信息。

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  // ...

  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline')

  return isOnline
}
```

## 参考资料

- [Hook - React 文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)

## 延伸阅读

- [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
- [Collection of React Hooks](https://nikgraf.github.io/react-hooks/)
- [useHooks](https://usehooks.com/)
