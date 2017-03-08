# 单元测试

单元测试的起步依赖于如下版本：

- [Junit]-v4.12+
- [Mockito]-v2.7.13+
- [Spring-Test]-v4.3.7+

## 使用 Junit

[Junit] 测试属于程序员测试，即所谓白盒测试，因为程序员知道被测试的软件如何（How）完成功能和完成什么样（What）的功能。

单元测试的目的是全面了解程序内部**逻辑**结构、对所有逻辑路径进行测试，保证程序逻辑的正确性。

### 初级篇

1. 编写测试代码
    > 定义一个没有返回值的 public 方法，为此方法添加 @Test 注解，然后在方法体内执行要测试的代码，最后执行断言判断代码的执行是否正确：

    ```java
    import static org.junit.Assert.assertEquals;
    import org.junit.Test;

    public class MyTest {
    @Test                               // 1) 添加注解
    public void evaluatesExpression() { // 2) 无返回值的 public 方法
      int result = Utils.add(1, 2);     // 3) 执行业务代码

      assertEquals(3, result);          // 4) 断言结果的正确性
    }
    ```

2. 运行测试
    - 方法 1： 命令行执行 `mvn test`，详见 [<mvn test 的默认行为>]。(http://rongjih.blog.163.com/blog/static/335744612010102911363452)
    - 方法 2： 在 IntelliJ IDEA 中点击测试类或测试方法名称，右键菜单选择 `Run 'xxx'`。
    - 方法 3： 在 Eclipse neon 中点击测试类或测试方法名称，右键菜单选择 `Run As / Junit Test`。

### [JUnit 断言](https://github.com/junit-team/junit4/wiki/Assertions)

#### JUnit 4.4+ 新断言语法 `assertThat`

[Junit] 4.4 学习 [JMock]，引入了 [Hamcrest] 匹配机制，使 assert 语句具有更强的可读性、灵活性，那就是新的 `org.junit.Assert#assertThat`。新的 assertThat 可以代替以前所有的经典断言语句，但是以前的所有 assert 语句仍然可以继续使用。

**assertThat 基本语法：**

1. `assertThat(actual, matcher)`
2. `assertThat(reason, actual, matcher)`

其中：

- reason - 测试失败时提供的错误提示信息
- actual - 要测试的值
- matcher - 用匹配符 org.hamcrest.Matcher 来表达的对前面变量所期望值的声明，如果 actual 值与 matcher 所表达的期望值相符，则测试成功，否则测试失败

> [JUnit] 4.4~4.10 自带了一些 [Hamcrest] 的匹配符 Matcher（`org.hamcrest.CoreMatchers.*`），会与 [Hamcrest] 官网的 `org.hamcrest:hamcrest-core:[version]` 包产生冲突，导致 Matcher 重复定义，编译可能会出错（ambiguous for the type）。但从 [JUnit] 4.11+ 开始，[JUnit] 移除了之前自带的 `org.hamcrest` 包，改为直接依赖 [Hamcrest] 官网的 `org.hamcrest:hamcrest-core:[version]` 从而避免了这个问题。

> org.hamcrest.CoreMatchers.* 只有有限的几个 Matcher，如果想使用一些其他更多的匹配符 Matcher，可以添加依赖 [Hamcrest] 官网的 `org.hamcrest:hamcrest-library:[version]` 包，更多的 Matcher 都在类 `org.hamcrest.Matchers` 中定义了，在代码中 `import static org.hamcrest.Matchers.*` 即可，详见 [这里](https://code.google.com/archive/p/hamcrest/wikis/Tutorial.wiki)。注意 `org.hamcrest.Matchers` 已包含了 `org.hamcrest.CoreMatchers` 中的所有 Matcher 了。

**assertThat 例子：**

```
assertThat(x, is(y)) // === assertThat(x, is(equalTo(y)))
assertThat(x, isA(y)) // === assertThat(x, is(instanceOf(y.class)))
assertThat(x, equalTo(y))
assertThat(x, not(equalTo(3)))
assertThat(x, sameInstance(y)) // === assertThat(x, theInstance(y))
assertThat(x, nullValue(3))
assertThat(x, notNullValue(3))
assertThat(x, allOf(containsString("a"), containsString("b")))
assertThat(x, endsWith("Test"))
assertThat(x, endsWith("Test"))
assertThat(x, lessThanOrEqualTo (16.0)) // 小于等于, 需要 hamcrest-library
assertThat(x, closeTo(20.0, 0.5)) // 20.0±0.5范围之内, 需要 hamcrest-library
assertThat(mapObject, hasEntry("key", "value")), 需要 hamcrest-library
```

**[Hamcrest] 常见的匹配器：**

- Core
    - anything - 任何时候都匹配
    - describedAs - 添加自定义不匹配描述信息
    - is - 用来改善可读性的修饰符，如 is(y) 相当与 is(equalTo(y))
- Logical 逻辑运算
    - allOf - 与匹配 (类似 Java &&)
    - anyOf - 或匹配 (类似 Java ||)
    - not - 反转匹配
- Object 对象
    - equalTo - 使用 Object.equals 方法判断是否相等的匹配
    - hasToString - 判断对象 toString 方法的返回值是否匹配
    - instanceOf, isCompatibleType - 类型匹配
    - notNullValue, nullValue - null 匹配
    - sameInstance - 对象实例匹配
- Beans
    - hasProperty - JavaBeans 属性匹配
- Collections 数组、集合
    - array - test an array's elements against an array of matchers
    - hasEntry, hasKey, hasValue - test a map contains an entry, key or value
    - hasItem, hasItems - 测试集合中是否包含既定元素
    - hasItemInArray - 测试数组中是否包含指定元素
- Number 数值
    - closeTo - 浮点值的精度测试
    - greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo - 大小比较
- Text 文本
    - equalToIgnoringCase - 忽略大小写的匹配
    - equalToIgnoringWhiteSpace - 忽略前后空白字符、而内部连续的空白字符视作1个空白字符的匹配
    - containsString, endsWith, startsWith - 字符串匹配

**更多第三方 Matcher:**

- [Excel spreadsheet matchers](https://github.com/tobyweston/simple-excel)
- [JSON matchers](https://github.com/hertzsprung/hamcrest-json)
- [XML/XPath matchers](https://github.com/davidehringer/xml-matchers)

#### JUnit 4 经典断言

```java
import static org.junit.Assert.fail;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertArrayEquals;

import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertNotNull;
```

### 高级特征

1. @Before : 在执行每个测试方法前都运行一次设置  
    ```java
    @Before  // org.junit.Before
    public void setup() {...}
    ```
2. @After : 在执行每个测试方法后都运行一次清理  
    ```java
    @After  // org.junit.After
    public void teardown() {...}
    ```
3. @BeforeClass : 在执行所有测试方法之前运行一次公共的设置  
    ```java
    @BeforeClass  // org.junit.BeforeClass
    public static void setupOnlyOnce() {...}
    ```
4. @AfterClass : 在执行完所有测试方法之后运行一次清理  
    ```java
    @AfterClass  // org.junit.AfterClass
    public static void teardownOnlyOnce() {...}
    ```
5. 测试异常 : `@Test(expected=xxx.class)`
6. 测试超时(毫秒) : `@Test(timeout=xxx)` - 超过这个时间自动强行终止，测试失败
7. 忽略测试 : `@ignore("xxx")` - 修饰类或方法，可与 `@Test` 一齐使用
8. 运行器 `@RunWith(xxx.class)`  
    > 修饰类，如果无指定 `Junit` 默认使用 `@RunWith(TestClassRunner.class)` 运行器。  
    > 一些第三方包扩展了自己的运行器，如:
    > - 与 `Spring-Test` 整合时使用 `@RunWith(SpringRunner.class)`
    > - 与 `Mockito` 整合时使用 `@RunWith(MockitoJunitRunner.StrictStubs.class)`
9. 参数化测试 @RunWith(Parameterized.class)
    > 修饰类，详见 [Parameterized tests](https://github.com/junit-team/junit4/wiki/Parameterized-tests)，
    > 用于简化多值参数函数的测试。  

10. [聚合测试套件](https://github.com/junit-team/junit4/wiki/Aggregating-tests-in-suites) - 将多个测试类汇集在一起运行  
    ```java
    import org.junit.runner.RunWith;
    import org.junit.runners.Suite;

    @RunWith(Suite.class)
    @Suite.SuiteClasses({Business1Test.class, Business2Test.class, ...})
    public class AllTests {}
    ```

11. 假设机制 [Assumption](https://github.com/junit-team/junit4/wiki/Assumptions-with-assume) - JUnit4.4+
    > 用于假设一定的条件满足了才运行相应的测试代码。如某个测试必须在 Windows 环境下才有效时，在其它环境下就应该被忽略。

    > 使用 org.junit.Assume.assumeThat 来实现假设机制，assumeThat 的语法与 assertThat 类似，但 assumeThat 的结果一旦被判断为不匹配，则 assumeThat 之后的代码不会执行，测试方法将立即退出，并将测试结果标记为 ignored（针对 @Test 方法。如果是 @Theory 方法，就算 assumeThat 不成立，只要至少有一个 @DataPoint 通过，也会测试通过，如果没有一个 @DataPoint 满足 assumeThat，则会 failed）。
    
    例子：
    ```java
    import static org.junit.Assume.*
    @Test public void filenameIncludesUsername() {
      assumeThat(File.separatorChar, is('/'));
      assertThat(new User("optimus").configFileName(), is("configfiles/optimus.cfg"));
    }
    ```

12. 理论机制 [@Theory](https://github.com/junit-team/junit4/wiki/Theories) - JUnit4.4+
    > 理论就是对那些需要无穷个测试用例才能正确描述的代码行为的概括性陈述。

    > 在 JUnit 的理论机制中，每个测试方法不再是由注释 @Test 指定的无参测试函数，而是由注释 @Theory 指定的带参数的测试函数，这些参数来自一个通过注释 @DataPoint 指定的数据集。JUnit 会自动将数据集中定义的数据类型和理论测试方法定义的参数类型进行比较，如果类型相同，会将数据集中的数据通过参数一一传入到测试方法中逐个执行。
    
    例子：
    ```java
    @RunWith(Theories.class)
    public class UserTest {
      @DataPoint
      public static String GOOD_USERNAME = "optimus";
      @DataPoint
      public static String USERNAME_WITH_SLASH = "optimus/prime";

      @Theory
      public void filenameIncludesUsername(String username) {
        assumeThat(username, not(containsString("/")));
        assertThat(new User(username).configFileName(), containsString(username));
      }
    }
    ```

## 使用 [Spring-Test]



## 使用 [Mockito]



## 友情链接

- [探索 JUnit 4.4 新特性](http://www.ibm.com/developerworks/cn/java/j-lo-junit44/index.html)
- [AssertJ - Fluent assertions for java] (http://joel-costigliola.github.io/assertj)

[Junit]: http://junit.org
[Hamcrest]: http://hamcrest.org
[Mockito]: http://mockito.org
[Spring-Test]: http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#overview-testing
[JMock]: http://www.jmock.org/