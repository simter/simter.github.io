# 通用编码规范

不管有多少人共同参与同一项目，一定要确保每一行代码都像是同一个人编写的。这是编码规范的终极目的。

除非特殊说明，否则以下提到的文本文件泛指包括 Java、JS、JSON、XML、HTML、CSS 等代码文件及其它未提到的纯文本文档。

## 文件编码

除非有特殊要求，否则文本文件统一使用 UTF-8 无 BOM 编码。

## 列限制与换行对齐

一个文本文件可以选择一行 80 个字符、100 个字符或 120 个字符的列宽限制。由于现在用来编码的显示器都基本上是大屏、宽屏，因此我们推荐并坚持使用 120 个字符的列宽限制。注意 1 个全角字符或中文字占用 2 个字符的宽度。

除了下述例外，任何一行如果超过这个字符数限制，必须自动换行：

- 不可能满足列限制的行 (如一个长 URL)。
- Java 的 package 和 import 语句。
- 注释中那些可能被剪切并粘贴到 shell 中的命令行。

自动换行时缩进至少 +2 个空格，并且按需要添加更多的空格来对齐相应的元素：

- HTML 或 XML 的节点属性换行时，在前面添加空格对齐第一个属性名

```xml
<X attr11="v11" attr12="v12" ... attr1n="v1N"
   attr21="v21" attr22="v22" ... attr2n="v2N"
   attr31="v31" attr32="v32" ... attr3n="v3N"
   attr41="v31" attr42="v32" ... attr4n="v3N">
</X>
<XXX attr11="v11" attr12="v12" ... attr1n="v1N"
     attr21="v21" attr22="v22" ... attr2n="v2N"
     attr31="v31" attr32="v32" ... attr3n="v3N"
     attr41="v31" attr42="v32" ... attr4n="v3N">
</XXX>
```

- Java、JS 方法参数多导致要换行时，在前面添加空格对齐第一个参数

```java
// Java
public void methodName(String arg11, String arg12 ... String arg1N
                       String arg21, String arg22 ... String arg2N) {
  ...
}
```

```js
// JS
function methodName(arg11, arg12 ... arg1N
                    arg21, arg22 ... arg2N) {
  ...
}
```

## 代码缩进

统一缩进两个英文空格。不使用制表符 tab，以保证在所有环境下获得一致的展现。范例如下所示。

HTML 文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page title</title>
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
```

CSS 文件：

```css
.selector[type=text] {
  padding: 15px;
  margin: 0px 0px 15px;
}
```

JS 文件：

```js
function add(a, b) {
  return a + b;
}

let a = add(1, 2);
```

Java 文件：

```java
package tech.simter;

public class Utils {
  public int String add(int a, int b) {
    return a + b;
  }
}
```

JSON 文件：

```json
[
  {"id": 1, "name": "RJ1"},
  {"id": 2, "name": "RJ2"}
]
```

XML 文件：

```xml
<project>
  <name>simter-json</name>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
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