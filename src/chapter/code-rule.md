# 编码规范 - 通用篇

## 概述

编码规范的最终目标是不管有多少人共同参与同一项目，确保每一行代码都像是同一个人编写的。

以下编码规范适用于如下源文件：（不包括那些被编译压缩后的文件）

- Java 源文件
- JSON 源文件
- JavaScript 源文件
- CSS 源文件
- HTML 源文件
- XML 源文件

对于上述未提到的其它纯文本文档，如无特别注明，一般上也优先遵循此规范。

这里只定义一般性的编码规范，没有提到的则遵循特定语言的约定规范。

> **特别注意：**在开发维护旧的项目模块时，需要先确认该模块是否使用了这里规定的编码规范，如果不是，请尽量保留原有的编码规范不变 _**\[b]**_。如原来是 tab 键缩进的，则保持原来的缩进规范不变，以免两种规范混用导致代码杂乱无章。如果确实在时间、价值上都允许，可以在团队同意后对原有模块进行编码规范重整 _**\[c]**_，使其统一变为这里的编码规范，实现新的统一。

## 编码规范

### 文件编码

统一使用 [UTF-8](http://baike.baidu.com/item/UTF-8) 无 [BOM](http://baike.baidu.com/item/BOM/2790401) 编码 _**\[a]**_。

以下例外：

- Java 属性文件使用 [ISO8859-1](http://baike.baidu.com/item/ISO-8859-1) 编码 _**\[b]**_，如 `resources.properties`，并且中文字符需要转换为 Unicode 编码（可使用 [native2ascii](https://native2ascii.net) 进行转换） _**\[c]**_

> 使用 [Notepad++](https://notepad-plus-plus.org/) “格式” 菜单下的选项，可以方便的查看当前文档的编码，以及在各种文本编码之间一键转换。

### 代码缩进

统一缩进两个英文空格。不使用制表符 tab，以保证在所有环境下获得一致的展现。

**Java 例子：**

```java
package tech.simter;

public class Utils {
  public int String add(int a, int b) {
    return a + b;
  }
}
```

**JSON 例子：**

```json
[
  {"id": 1, "name": "ST1"},
  {
    "id": 2, 
    "name": "ST2"
  }
]
```

**JS 例子：**

```js
function add(a, b) {
  return a + b;
}

let c = add(1, 1);
```

**CSS 例子：**

```css
.selector {
  padding: 15px;
}
```

**HTML 例子：**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello world!</h1>
    <p>My name is Simter</p>
  </body>
</html>
```

**XML 例子：**

```xml
<project ...>
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>tech.simter</groupId>
    <artifactId>simter-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
  </parent>
  <artifactId>simter-hello</artifactId>
  <name>simter-hello</name>
</project>
```

### 列宽限制与换行对齐

一个文本文件可以选择一行 80 个字符、100 个字符或 120 个字符的列宽限制。由于现在用来编码的显示器都基本上是大屏、宽屏，因此我们推荐并坚持使用 **120** 个字符的列宽限制 _**\[a]**_。

> 注意这里的字符数是按英文半角字符计算的，1 个全角字符或中文字符是占用 2 个字符的宽度。[IntelliJ IDEA](https://www.jetbrains.com/idea
) 编辑器默认的列宽限制就是 120，[Eclipse](http://www.eclipse.org) 默认则为 80，使用 [Eclipse](http://www.eclipse.org) 时需要额外设置一下。

任何一行如果超过这个字符数限制，必须换行 _**\[b]**_，除了下述例外情况 _**\[c]**_：

- 不可能满足列限制的行 (如一个长 URL) _**\[c1]**_
- Java 的 package 和 import 语句 _**\[c2]**_
- 注释中那些可能被剪切并粘贴到 shell 中的命令行 _**\[c3]**_

不能在单词的中间换行 _**\[d]**_，换行时缩进至少 +2 个空格 _**\[e]**_，推荐按需添加更多的空格来对齐相应的元素（推荐但不强制要求） _**\[f]**_。如：

- Java、JS 方法参数多导致要换行时

```java
// Java 换行缩进并对齐第一个参数（推荐）
public void methodName(String arg11, String arg12 ... String arg1N
                       String arg21, String arg22 ... String arg2N) {
  ...
}

// Java 换行缩进 2 个空格
public void methodName(String arg11, String arg12 ... String arg1N
  String arg21, String arg22 ... String arg2N) {
  ...
}
```

```js
// JS 换行缩进并对齐第一个参数（推荐）
function methodName(arg11, arg12 ... arg1N
                    arg21, arg22 ... arg2N) {
  ...
}

// JS 换行缩进 2 个空格
function methodName(arg11, arg12 ... arg1N
  arg21, arg22 ... arg2N) {
  ...
}
```

- HTML 或 XML 的节点属性多换行时

```xml
// XML 换行缩进并对齐第一个属性（推荐）
<X attr11="v11" attr12="v12" ... attr1n="v1N"
   attr21="v21" attr22="v22" ... attr2n="v2N"
   attr31="v31" attr32="v32" ... attr3n="v3N">
</X>
<XXX attr11="v11" attr12="v12" ... attr1n="v1N"
     attr21="v21" attr22="v22" ... attr2n="v2N"
     attr31="v31" attr32="v32" ... attr3n="v3N">
</XXX>


// XML 换行缩进 2 个空格
<XXX attr11="v11" attr12="v12" ... attr1n="v1N"
  attr21="v21" attr22="v22" ... attr2n="v2N">
</XXX>
```

### 常量命名

统一使用 `CONSTANT_CASE` 格式（即所有字母大写，单词使用下划线分隔）。

**正确的常量命名：**

```
// JAVA
public static final String MY_COLOR_RED = "red";

// JS
const MY_COLOR_RED = 'red';
```

**不正确的常量命名：**

```
// JAVA
public static final String MYCOLOR_RED = "red";
public static final String MyColorRed = "red";

// JS
const MYCOLOR_RED = 'red';
const MyColorRed = 'red';
```

### 变量和方法命名

变量和方法名称使用第一个单词首字母小写，后面其它单词首字母大写的小驼峰命名方式（little-camel-case）。

**正确的命名：**(mySimpleMethod、mid)

```
// JAVA
public int mySimpleMethod(int a, int b, int c) {
  int mid = 2 * (a + b);
  return mid + c;
}

// JS
function mySimpleMethod(var a, var b, var c) {
  let mid = 2 * (a + b);
  return mid + c;
}
```

**不正确的命名：**(MySimpleMethod、_mid)

```
// JAVA
public int MySimpleMethod(int a, int b, int c) { // 大写开头
  int _mid = 2 * (a + b); // 下划线开头
  return _mid + c;
}

// JS
function MySimpleMethod(var a, var b, var c) {
  let _mid = 2 * (a + b);
  return _mid + c;
}
```

### Java 类名（class）

类名使用所有单词首字母大写的大驼峰命名方式（big-camel-case） _**\[a]**_。类名与类所保存的文件名称也要一一对应相同 _**\[b]**_。

**正确的命名：**(DateUtils)

```
// JAVA
public final class DateUtils{
  ...
}
```

**不正确的命名：**(dateUtils)

```
// JAVA
public final class dateUtils{
  ...
}
```

### Java 包名（package）

Java 包名使用所有字母小写的形式 _**\[a]**_，单词间不作任何形式的区分。包名与文件夹名称也要一一对应相同 _**\[b]**_。

**正确的命名：**(DateUtils)

```
// JAVA
package org.springframework;
package com.abcframework;
```

**不正确的命名：**

```
// JAVA
package org.springFramework;
package com.SpringFramework;
```

### HTML 标记的自定义属性命名

由于 HTML 标记的属性是不区分大小写的，因此使用单词间用中横线连接的 kebab-case 命名方式 _**\[a]**_。并且在编写 HTML 文档时，统一使用小写字母的标记 _**\[b]**_。

**正确的命名：**（name、fuzzy-value）

```
<div data-name='st'
     data-fuzzy-value='abc'
...
</div>
```

**不正确的命名：**（DIV、Name、fuzzyValue）

```
<DIV data-Name='st'
     data-fuzzyValue='abc'
...
</DIV>
```

## 参考

- [编码规范集锦](http://www.vaikan.com/coding-standards/)
- [Linux内核编码风格](http://lxr.linux.no/linux/Documentation/CodingStyle)
- Google 开源项目风格指南: [官方英文版](https://google.github.io/styleguide)-[Github](https://github.com/google/styleguide)、[中文翻译版](http://zh-google-styleguide.readthedocs.io)-[Github](https://github.com/zh-google-styleguide/zh-google-styleguide)
- [Google Java 编程风格指南 - Hawstein 翻译](http://www.hawstein.com/posts/google-java-style.html)
- [Oracle 官方的 Java 语言编码规范](http://www.oracle.com/technetwork/java/javase/documentation/codeconvtoc-136057.html)
- [codeguide.bootcss.com - 编码规范 by @mdo](http://codeguide.bootcss.com/)
- [麦田: HTML 编码规范](http://itmyhome.com/html)
- [TypeScript 开发团队编码规范](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/wiki/coding_guidelines.html)
- [InfoQ: Google 的 Java 编码规范](http://www.infoq.com/cn/news/2014/02/google-java-coding-standards)
- [PHP 标准规范](https://psr.phphub.org)
- [谷歌是如何做代码审查的](http://www.vaikan.com/things-everyone-should-do-code-review)
- [为什么谷歌要执行严格的代码编写规范](http://www.vaikan.com/google-coding-standards)