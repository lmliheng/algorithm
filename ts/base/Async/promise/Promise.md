#### MyPromise






#### Promise 对象池

请你编写一个异步函数  `promisePool` ，它接收一个异步函数数组  `functions`  和  **池限制** `n`。它应该返回一个 promise 对象，当所有输入函数都执行完毕后，promise 对象就执行完毕。
**池限制**  定义是一次可以挂起的最多 promise 对象的数量。`promisePool`  应该开始执行尽可能多的函数，并在旧的 promise 执行完毕后继续执行新函数。`promisePool`  应该先执行  `functions[i]`，再执行  `functions[i + 1]`，然后执行  `functions[i + 2]`，等等。当最后一个 promise 执行完毕时，`promisePool`  也应该执行完毕。
例如，如果  `n = 1` , `promisePool`  在序列中每次执行一个函数。然而，如果  `n = 2` ，它首先执行两个函数。当两个函数中的任何一个执行完毕后，再执行第三个函数(如果它是可用的)，依此类推，直到没有函数要执行为止。
你可以假设所有的  `functions`  都不会被拒绝。对于  `promisePool`  来说，返回一个可以解析任何值的 promise 都是可以接受的。

**示例 1：**

```
输入：
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 2
输出： [[300,400,500],500]
解释
传递了三个函数。它们的睡眠时间分别为 300ms、 400ms 和 200ms。
在 t=0 时，执行前两个函数。池大小限制达到 2。
当 t=300 时，第一个函数执行完毕后，执行第3个函数。池大小为 2。
在 t=400 时，第二个函数执行完毕后。没有什么可执行的了。池大小为 1。
在 t=500 时，第三个函数执行完毕后。池大小为 0，因此返回的 promise 也执行完成。
```

**示例 2：**

```
输入： functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 5
输出： [[300,400,200],400]
解释：
在 t=0 时，所有3个函数都被执行。池的限制大小 5 永远不会满足。
在 t=200 时，第三个函数执行完毕后。池大小为 2。
在 t=300 时，第一个函数执行完毕后。池大小为 1。
在 t=400 时，第二个函数执行完毕后。池大小为 0，因此返回的 promise 也执行完成。
```