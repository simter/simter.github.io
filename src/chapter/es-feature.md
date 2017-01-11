# ES 特征收集

## 概述

ECMAScript 是由国际标准化组织 [ECMA] 通过 [ECMA-262] 标准化的脚本程序设计语言，以下简称 ES。

ECMAScript 只用来标准化 JavaScript 这种语言的基本语法结构，与部署环境相关的标准都由其他标准规定，比如 DOM 的标准就是由 W3C 组织（World Wide Web Consortium）制定的。

ECMA-262 标准后来也被另一个国际标准化组织 ISO (International Organization for Standardization) 批准，标准号是 [ISO-16262](http://www.iso.org/iso/catalogue_detail.htm?csnumber=55755)。

1996 年 11 月，网景公司将 JavaScript 提交给欧洲计算机制造商协会 (现在的 ECMA 组织) 进行标准化。ECMA-262 的第一个版本于 1997 年 6 月被 [ECMA] 组织采纳。

2015 年，负责制定 ECMAScript 规范草案的委员会 [TC39] 将定义新标准的制度改为一年一次，每个新特性一旦被批准就可以添加，不像以往，规范只有在整个草案完成，所有特性都没问题后才能被定稿。标准在每年的 6 月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，直到下一年的 6 月份，草案变成新一年的版本。从 ES2015 开始，版本不再延用 x.y 格式，改用年份标记，如 ECMAScript 2015 (ES2015)、ECMAScript 2016 (ES2016)。

注：[TC39] Technical Committee 39 [ECMA] 的第 39 号技术专家委员会，负责制订 ECMAScript 标准，成员包括 Microsoft、Mozilla、Google 等大公司。

## JavaScript 与 ECMAScript 的关系

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。另外 JavaScript 是 Netscape 的注册商标。

除了 ECMAScript 的版本，很长一段时间中，Netscape 公司（以及继承它的 Mozilla 基金会）在内部依然使用自己的版本号。这导致了 JavaScript 有自己不同于 ECMAScript 的版本号。1996年3月，Navigator 2.0 内置了 JavaScript 1.0。JavaScript 1.1 版对应 ECMAScript 1.0，但是直到 JavaScript 1.4版才完全兼容 ECMAScript 1.0。JavaScript 1.5 版完全兼容 ECMAScript 3.0。目前的 JavaScript 1.8 版完全兼容 ECMAScript 5。

## ES 版本历史

 版本 | 发表日期 | 名称 | 备注
:----:|:----:|:----|:----
7.0 | 2016-06 | ES2016 | 仅小幅修订，只新增指数操作符和 Array.prototype.includes
6.0 | 2015-06 | ES2015, ES6 | Promise、fetch、class、箭头函数、generator/yield/iterator、尾递归优化<br>草案于 2013-12 发布
5.1 | 2011-06 | ES5.1 | 成为 ISO 国际标准 (ISO/IEC 16262:2011)
5.0 | 2009-12 | ES5 | 严格模式、JSON、bind、get/set、now、trim ...<br>与 ES3 基本保持兼容，所有现代浏览器都相当完全的实现了
3.1 | 2008-07 | ES3.1 | 将 4.0 中涉及现有功能改善的一小部分，发布为 ECMAScript 3.1
4.0 | 放弃    |  | 因太激进于 2008-07 被 ECMA 抛弃<br>ActionScript 3 是该版的唯一实现 (Flash 差点就...)<br>草案于 2007-10 发布
3.0 | 1999-12 |  | 正则表达式、异常 ...
2.0 | 1998-06 |  | ISO/IEC16262 ...
1.0 | 1997-06 |  | 首版

关注点：

- [TC39] 判断 ES5 会在 2013 年的年中成为 JavaScript 开发的主流标准，并在此后五年中一直保持这个位置
- ES2016 由于变动非常小（只新增了数组实例的 includes 方法和指数运算符），因此 ES2016 与 ES2015 基本上是同一个标准，都被看作是 ES6。
- 3.0 版是一个巨大的成功，在业界得到广泛支持，成为通行标准，奠定了 JavaScript 语言的基本语法，以后的版本完全继承。直到今天，初学者一开始学习 JavaScript，其实就是在学 3.0 版的语法。

## ES 提案批准流程
针对 ECMAScript 特性的每一个提议都需要经历以下 5 阶段，从阶段 0 开始，从一个阶段递交到下一个阶段必须要得到 [TC39] 的全员同意：

- Stage 0 - Strawman 稻草人
- Stage 1 - Proposal 提议
- Stage 2 - Draft 草案
- Stage 3 - Candidate 候选
- Stage 4 - Finished 完成

一个提案只要能进入 Stage 2，就差不多等于肯定会包括在以后的正式标准里面。ECMAScript 当前的所有提案，可以在 [TC39] 的官方网站 <https://github.com/tc39/ecma262> 查看。

一个特征进入阶段 4，我们才可以称其为 ES20XX 特性。

## ES 浏览器支持情况

- 各大浏览器对 ES2016 的支持 <http://kangax.github.io/compat-table/es2016plus/>
- 各大浏览器对 ES2015 (ES6) 的支持 <https://kangax.github.io/es5-compat-table/es6>
- 各大浏览器对 ES5 的支持 <https://kangax.github.io/es5-compat-table/es5>

## ES 标准规范

最新的 ECMAScript 标准规范全在这个官方 pdf 文件内了，点击 [这里][ECMA-262-pdf] 下载。

## ES 关键特征说明

### 严格模式

在 ECMAscript 5 中新增了 "严格模式" ([strict mode](https://developer.mozilla.org/zh-CN/docs/JavaScript/Strict_mode))，这种模式使得 Javascript 在更严格的条件下运行。

严格模式可以应用到整个 script 标签或个别函数中。

为整个 script 标签开启严格模式:

```
<script>
  "use strict";
  ...// other code
</script>

// or script file: /path/to/my.js
"use strict";
...// other code
```

为个别函数开启严格模式:

```js
function strictFn(){
  'use strict';
  ...// other code
}
```

在严格模式下：

- 全局变量必须显式声明
- 函数必须声明在顶层，即不允许在非函数的代码块内声明函数。
- 禁止使用 with
- 禁止删除变量
- 禁止 this 关键字指向全局对象
- 更多请移步 [这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)

### 作用域

var、let、const 声明变量。

### JSON 操作

序列化 JSON.[stringify](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)(value[, replacer[, space]])

```js
JSON.stringify({})                   // '{}'
JSON.stringify(true)                 // 'true'
JSON.stringify('foo')                // '"foo"'
JSON.stringify([1, 'false', false])  // '[1,"false",false]'
JSON.stringify({ x: 5 })             // '{"x":5}'
JSON.stringify({ x: null })          // "{"x":null}"
JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)) // '"2006-01-02T15:04:05.000Z"'
JSON.stringify({ x: undefined, y: Object, z: Symbol('') }) // '{}'
JSON.stringify({ x: [
  10, undefined, function(){}, Symbol('')
] }) // '{"x":[10,null,null,null]}' 

// with replacer function
JSON.stringify({x: "x", n: 1}, (key, value) =>
  typeof value === 'string' ? undefined : value
) // '{"n":1}'

// with replacer array
JSON.stringify({x: "x", y: "y", n: 1}, ['x', 'n']) // '{"x":"x","n":1}'

// toJSON() behavior
var obj = {
  foo: 'foo',
  toJSON: function() {return 'bar'}
};
JSON.stringify(obj) // '"bar"'
```

反序列化 JSON.[parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)(text[, reviver])

```js
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
JSON.parse('{"p": 5}', (key, value) =>
  typeof value === 'number' ? value * 2 : value
) // { p: 10 }
```

注：JSON.parse() 不允许 trailing commas：

```js
// both will throw a SyntaxError
JSON.parse('[1, 2, 3, 4, ]');
JSON.parse('{"foo" : 1, }');
```

### 模板字符串

模板字符串 (template string) 是增强版的字符串，用反引号 (`)标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

嵌入变量、表达式、函数：(写在 ${} 內)

```js
let name = "world"
let tpl = `Hello ${name}` // Hello world

let user = {name: "world"}
tpl = `Hello ${user.name}` // Hello world

// 大括号内可以是任意 JavaScript 表达式，可以进行运算，以及引用对象属性
let x = 1;
let y = 2;
`${x} + ${y} = ${x + y}` // "1 + 2 = 3"

// 也可调用函数
function fn() {return "Hello World"}
`${fn()}` // Hello World

// 复杂点的嵌套+函数
let array = [1, 2, ...]
let tpl = `${array.map(item => `${item}`).join('')}`
```


如果需要使用反引号，用反斜杠 \ 转义：

```js
let tpl = `Hello \`world\`` // Hello `world`
```

多行模板字符串，所有的空格、换行符和缩进都会保留：

```js
let tpl = `<ul>
  <li>first</li>
  <li>second</li>
</ul>`
```

更复杂的标签模板请移步 [这里](http://es6.ruanyifeng.com/#docs/string#标签模板)。

### 箭头函数

箭头函数可以使代码变得简洁，参数只有一个时可以省略 `()`，函数体只有一句话可以省略 `{}`，如果返回值是一个表达式还可以省略 `return`。

```js
// 未使用箭头函数
var myFn = function (arg1) {
  return x;
}

// 使用箭头函数
var myFn = (arg1) => {
  return arg1 + 'ok';
}

// 或者
var myFn = arg1 => arg1 + 'ok';
```

箭头函数内 this 与使用 function 定义函数内的 this 是两个完全不同的东西，这个要切记、切记、切记。


### Promise

不要将 Promise 与异步编程代码的简化等同，如解决异步的回调地狱问题，那只是 Promise 的其中一个使用场景而已。要用承诺模式的概念去理解 Promise，当承诺得到实现时，我们可以通过 then 函数（第一个函数参数）获取承诺的结果，而当承诺被打破、拒绝而无法实现时，我们可以通过 catch (或者 then 的第二个函数参数) 获取承诺无法实现的理由。

该新特性属于 ECMAScript 2015（ES6）规范。

创建 Promise 实例的标准方法：

```js
// 创建实例
let promise = new Promise(function(resolve, reject)){
  ...//任何同步或异步的代码

  if (成功) {
    // 当承诺得到实现时，返回一些有用的东西，如 someThing
    resolve(someThing) // 状态转为 fulfilled，又叫 resolved
  } else { // 失败
  ...
    // 当承诺无法实现时，返回理由，如 someError
    reject(someError) // 状态转为 Rejected
  }
}

// 处理结果
promise.then(someThing => {
  // 处理承诺得到实现所返回的结果
  ...
})
.catch(someError => {
  // 处理承诺无法实现所返回的理由
  ...
})

// 或者这样处理承诺的结果
promise.then(someThing => {
  // 处理承诺得到实现所返回的结果
  ...
}, someError => {
  // 处理承诺无法实现所返回的理由
  ...
})
```


创建 Promise 实例的其它方法：

```js
// 将任意对象转为 fulfilled 状态的 Promise 对象：
// 1) 如果参数本身是 Promise 实例，会原封不动返回之
// 2) 如果参数是一个 thenable 对象 (有 then 方法的对象)，会将这个对象转为 Promise 对象，然后立即执行其 then 方法
// 3) 参数不是具有 then 方法的对象，或根本就不是对象，会返回一个新的 Promise 对象，状态为 fulfilled
// 4) 不带任何参数，直接返回一个 fulfilled 状态的 Promise 对象
let p = Promise.resolve(someThing)

// 将任意对象转为 Rejected 状态的 Promise 对象。
// 注：Promise.reject() 方法的参数，会原封不动地作为 reject 的理由，变成后续方法的参数。
// 这一点与 Promise.resolve 方法不一样，reject() 方法不会理会参数是否是 thenable 对象 。
let p = Promise.reject(someError) // 等同于
let p = new Promise((resolve, reject) => reject(someError))

// 将多个 Promise 实例，包装成一个新的 Promise 实例：
// 1) 所有 promiseN 都 resolved 时 p 才会 resolved，
//    promiseN 的返回值将组成一个数组，传递给 p 的回调函数
// 2) 任一 promiseN 被 rejected 时 p 就会 rejected，
//    第 1 个被 reject 的实例的返回值，传递给 p 的回调函数
// 注：Promise.all 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
// 如果 promiseN 并不是 Promise 的实例，会自动调用 Promise.resolve(promiseN) 将其转换。
let p = Promise.all([promise1, promise2, ...])

// 将多个 Promise 实例，包装成一个新的 Promise 实例，
// 任一 promiseN 被 resolved 或 rejected 时 p 就会相应的被 resolved 或 rejected，
// 率先改变的 promiseN 的返回值，传递给 p 的回调函数。
// 注：Promise.race 方法的参数的要求与 Promise.all 的相同。
let p = Promise.race([promise1, promise2, ...])
```

Promise 特点总结：

- 状态不受外界影响，且一旦状态改变，就不会再变  
  > 状态只有两种变化的可能：从 pending 变为 fulfilled 或从 pending 变为 rejected
    任何时候都可已继续给 Promise 实例附加 then 回调，总会得到结果，永不落空，不像
    事件监听机制，必须在触发之前去监听，事件触发之后再去监听是得不到结果的。
- 无法中途取消和得知状态的进展过程
  > 一旦实例化，它就会立即执行，无法中途取消，当处于 pending 状态时，无法得知目前
    进展到哪一个阶段（刚刚开始还是即将完成）。
- then、catch 内可以继续返回 Promise 实例或任何其它值，返回值将作为下一个 then 函数的参数向下继续传递
- catch 方法是等价于 .then(null, onRejected) 的语法糖
  > 建议总是使用 catch 方法，而不使用 then 方法的第二个参数。  
    当使用 then(onFulfilled, onRejected) 时，onRejected 不会捕获在 onFulfilled 中抛出的错误。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
  > 上一个 then 内的异常，可以通过下一个 catch 来获取

更多请移步 [Promises/A+ 规范](https://promisesaplus.com/)、[Promises API Reference](https://www.promisejs.org/api/)。

### 解构赋值 Destructuring

#### 变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。如果解构不成功，变量的值就等于 undefined。
解构时可以指定默认值，默认值生效的条件是，对象属性值或数组对应值严格等于 undefined (===)。

```js
// 从数组解构赋值
var [a, b] = [1, 2]          // a=1, b=2
let [a, b] = [1]             // a=1, b=undefined
const [a, b] = [1, 2, 3]     // a=1, b=2
let [a, b = a] = [1];        // a=1, b=1

// 指定默认值: 内部使用 === 判断是否有值
var [a, b = '2'] = [1, , undefined] // a=1, b=2

// 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值，解构赋值会依次从这个接口获取值
let [a, b] = new Set([1, 2, 3]) // a=1, b=2

// 从对象结构：变量与属性同名
var {a, b} = {b: 2, a: 1}       // a=1, b=2

// 从对象结构：变量与属性不同名
// 对象解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量，
// 真正被赋值的是后者，而不是前者(模式)，故 x 是未定义变量
var {a, x: b} = {x: 2, a: 1} // a=1, b=2, x is not defined

// 先定义后解构
let a;
({a} = {a: 1}); // 圆括号是必须的，否则报错

// 嵌套解构
var [a, [b]] = [1, [2, 3]]    // a=1, b=2
var {a, {b}} = {a: 1, {b: 2}} // a=1, b=2
var {a, [b]} = {a: 1, [2, 3]} // a=1, b=2
var {m: {a}} = {m: {a: 1}}    // a=1, m 只是模式不是变量不会被赋值

// 复杂点的嵌套解构赋值
let o = {};
let a = [];
({ foo: o.prop, bar: a[0] } = { foo: 1, bar: true });
// obj={prop:1}, arr=[true]

// 对数组进行对象属性的解构：数组本质是特殊的对象
var arr = [1, 2, 3];
let {0: a, [arr.length - 1] : b} = arr // a=1, b=3

// 解构字符串
const [a, b] = 'hello'       // a="h", b="e"
let {length : len} = 'hello' // len=5
```

#### 函数参数的解构赋值

```js
function add([x, y]){return x + y}
add([1, 2]); // 3

function add({x = 0, y = arg => arg + 1}){return y(x)}
add({x: 1}); // 2

[[1, 2], [3, 4]].map(([a, b]) => a + b) // [ 3, 7 ]
```

### 展开运算符

### 对象操作

### 数组操作

## 在线书籍

- [JavaScript Promise 迷你书（中文版）](http://liubin.org/promises-book)
- [Axel Rauschmayer: Exploring ES2016 and ES2017](http://exploringjs.com/es2016-es2017/index.html)
- [Axel Rauschmayer: Exploring ES6](http://exploringjs.com/es6)
- [阮一峰: ECMAScript 6 入门](http://es6.ruanyifeng.com)

## 参考

- [ECMA-262: ECMAScript Language Specification][ECMA-262-pdf]
- [维基百科 ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript)
- [ES5, ES6, ES2016, ES.Next: JavaScript 的版本是怎么回事？](https://huangxuan.me/2015/09/22/js-version)
- [ES 新特性及 ECMAScript 标准的制定流程](http://wwsun.github.io/posts/new-in-es2016.html)
- [JavaScript 语言的历史](http://javascript.ruanyifeng.com/introduction/history.html)
- [ISO/IEC 16262:2011](http://www.iso.org/iso/catalogue_detail.htm?csnumber=55755)
- [ISO/IEC 16262:2002](http://www.iso.org/iso/catalogue_detail.htm?csnumber=33835)
- [ISO/IEC 16262:1998](http://www.iso.org/iso/catalogue_detail.htm?csnumber=29696)
- [ES5 新增特性汇总](https://gold.xitu.io/post/584f9ef7128fe100692e67e2)
- [ES6 箭头函数使用禁忌](https://mp.weixin.qq.com/s?__biz=MzI1MTE2NTE1Ng==&mid=2649515779&idx=1&sn=a09ec43ee49f2c210ab3132d8463498d)
- [深入理解 Promise (上)](http://coderlt.coding.me/2016/12/03/promise-in-depth-an-introduction-1/)
- [谈谈使用 Promise 时的一些反模式](http://efe.baidu.com/blog/promises-anti-pattern/)

[ECMA]: http://www.ecma-international.org/
[ECMA-262]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
[ECMA-262-pdf]: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
[TC39]: http://www.ecma-international.org/memento/TC39.htm