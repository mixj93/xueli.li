---
title: 30分钟学 TypeScript
id: learn-typeScript-in-30-minutes
date: 2016-08-20T22:39:13+08:00
tags:
  - 开发
  - TypeScript
---

![](http://cdn.tutorialzine.com/wp-content/uploads/2016/07/learn-typescript-in-30.png)

[原创翻译，英文原文地址](http://tutorialzine.com/2016/07/learn-typescript-in-30-minutes/)

今天我们要来看看 TypeScript，一个为构建复杂的大型的应用而设计的需要编译成 JavaScript 的语言。它继承了诸多语言比如 C#、Java 的理念，并且在动态类型的 JavaScript 中加入了更多的约束。

这篇教程针对那些能够相对熟练的使用 JavaScript 但是没怎么用过 TypeScript 的人们。教程包含了 TypeScript 最基础和关键的特性并且配合许多带有注释的例子帮助大家理解这门语言。让我们开始吧！

## 使用 TypeScript 的好处

JavaScript 是一门很不错的语言，以至于很多人会想是否真的有必要去学习 TypeScript。技术上，成为一个优秀的开发者不必要使用 TypeScript，很多用不使用它也做得很好。但是，使用 TypeScript 必定会带来一些好处：

- 得益于静态类型，使用 TypeScript 写的代码有更多的可预测性，调试起来也更加方便。
- 感谢模块、命名空间和强大的面向对象支持，让组织大型复杂的应用代码更加方便。
- TypeScript 编译成 JavaScript 时会捕获错误，这样在运行时就不会打断。
- 即将到来的 Angular 2 框架使用 TypeScript 写的，并且推荐使用 TypeScript。

推荐使用 TypeScript 的最后一点也是主要理由是 Angular 2 是当下最火的框架之一，尽管她可以使用普通的 JavaScript 编写，但是大量的教程和例子用的都是 TypeScript，所以越来越多的人会使用 TypeScript。

## 安装 TypeScript

> 需要先安装 Node.js 和 NPM。如果还没有安装它们，请看[这里](https://docs.npmjs.com/getting-started/installing-node)。

最简单的安装 TypeScript 的方式是使用 [NPM](https://www.npmjs.com/) 。使用下面的命令，我们可以全局的安装 TypeScript 包，让 TS 编译器在所有项目中都可以使用。

```bash
npm install -g typescript
```

打开命令行，在任意地方试着运行 tsc -v 查看有没有正确安装：

```bash
tsc -v
Version 1.8.10
```

## 编辑器的 TypeScript 支持

TypeScript 是一个开源项目，但是是由微软开发和维护的，所以它在微软的 Visual Studio 平台被原生支持。现在，越来越多的编辑器原生支持或通过插件支持 TypeScript 语法，自动完成提示，错误捕捉甚至是内置编译。

- [Visual Studio Code](https://code.visualstudio.com/) - 微软的一款轻量级开源代码编辑器，内置 TypeScript 支持。
- [官方的 Sublime Text 插件](https://github.com/Microsoft/TypeScript-Sublime-Plugin)。
- 最新版的 [WebStorm](https://www.jetbrains.com/webstorm/) 内置对 TypeScript 的支持。
- [更多支持](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support) 包括 Vim、Atom、Emacs 以及其他。

## 编译成 JavaScript

TypeScript 代码写在 .ts 文件中（JSX 是 .tsx 文件），不能直接在浏览器中运行，需要编译成普通的 JavaScript 文件。编译过程可以以以下几种方式进行：

- 在命令行中使用前面说的命令行工具 `tsc`。
- 直接用 Visual Studio 或者其他的一些 IDEs 和代码编辑器。
- 使用自动化构建工具如 [gulp](http://gulpjs.com/)。
- 我们发现第一种方式是最简单、对新手最友好的，所以在这篇教程中我们将使用第一种方式。

在下面的命令中一个名为 _main.ts_ 的 TypeScript 文件被编译成了 JavaScript 文件 _main.js_。如果 _main.js_ 已经存在将会被覆盖。

```bash
tsc main.ts
```

我们可以一次编译多个文件使用通配符

```bash
# Will result in separate .js files: main.js worker.js.
tsc main.ts worker.ts

# Compiles all .ts files in the current folder. Does NOT work recursively.
tsc *.ts
```

我们可以使用 `--watch` 选项自动编译当 TypeScript 文件有改变时:

```bash
# Initializes a watcher process that will keep main.js up to date.
tsc main.ts --watch
```

更多的高级 TypeScript 用户会创建 tsconfig.json 文件，包含了许多的编译设置。配置文件在构架大型项时十分有用，当 .ts 文件很多时，能够自动化程序。在 TypeScript 文档中可以读到[更多关于 tsconfig.json 的信息](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。

## 静态类型

TypeScript 最大的特点就是支持静态类型。这意味着你可以声明变量的类型，编译器会确保变量没有被赋予错误的类型。如果类型声明被省略，类型会通过代码自动推测出来。

这里有一个例子。任何变量、函数参数以及返回值可以在初始化的时候定义类型：

```typescript
var burger: string = 'hamburger', // String
  calories: number = 300, // Numeric
  tasty: boolean = true // Boolean

// Alternatively, you can omit the type declaration:
// var burger = 'hamburger';

// The function expects a string and an integer.
// It doesn't return anything so the type of the function itself is void.

function speak(food: string, energy: number): void {
  console.log('Our ' + food + ' has ' + energy + ' calories.')
}

speak(burger, calories)
```

因为 TypeScript 会被编译成 JavaScript，JavaScript 并不理解类型的概念，在 JavaScript 中类型会被完全移除：

```javascript
// JavaScript code from the above TS example.

var burger = 'hamburger',
  calories = 300,
  tasty = true

function speak(food, energy) {
  console.log('Our ' + food + ' has ' + energy + ' calories.')
}

speak(burger, calories)
```

但是如果我们想做一些非法的操作，那么在编译的时候会显示错误。比如：

```typescript
// The given type is boolean, the provided value is a string.
var tasty: boolean = "I haven't tried it yet"
```

```bash
main.ts(1,5): error TS2322: Type 'string' is not assignable to type 'boolean'.
```

如果我们向函数传入错误的参数，也会显示错误：

```typescript
function speak(food: string, energy: number): void {
  console.log('Our ' + food + ' has ' + energy + ' calories.')
}

// Arguments don't match the function parameters.
speak('tripple cheesburger', 'a ton of')
```

```bash
main.ts(5,30): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

下面列出了常用的类型：

- 数字 – All numeric values are represented by the number type, there aren’t separate definitions for integers, floats or others.
- 字符串 – 就像普通的 JavaScript 中使用 '单引号' 或者 "双引号" 包裹的字符串。
- 布尔值 – `true` 或者 `false`, 使用 0 和 1 会引起编译错误。
- 任意 – 变量的类型可以是任意一种类型。
- 数组 – 两种语法： `my_arr: number[]` 或者 `my_arr: Array<number>`。
- 空 – 返回没有返回数。

完整的类型列表请参阅 TypeScript 文档 – [这里](http://www.typescriptlang.org/docs/handbook/basic-types.html).

## 接口

接口用于检查一个对象是否符合一个特定的结构。通过定义一个接口，我们可以命名一个特定的变量的集合，确保这些变量一直会在一起。当编译成 JavaScript 的时候，接口会消失 - 它们的主要在开发阶段带来帮助。

在下面的例子中我们会定义一个简单的接口来检查函数参数的类型：

```typescript
// Here we define our Food interface, its properties, and their types.
interface Food {
  name: string
  calories: number
}

// We tell our function to expect an object that fulfills the Food interface.
// This way we know that the properties we need will always be available.
function speak(food: Food): void {
  console.log('Our ' + food.name + ' has ' + food.calories + ' calories.')
}

// We define an object that has all of the properties the Food interface expects.
// Notice that types will be inferred automatically.
var ice_cream = {
  name: 'ice cream',
  calories: 200
}

speak(ice_cream)
```

属性的顺序无关紧要。我们只需要将属性都展现出来并且类型正确。如果缺少了什么、类型错误或是命名不同，编译器都会告诉我们错误。

```javascript
interface Food {
  name: string;
  calories: number;
}

function speak(food: Food): void {
  console.log('Our ' + food.name + ' has ' + food.calories + ' grams.')
}

// We've made a deliberate mistake and name is misspelled as nmae.
var ice_cream = {
  nmae: 'ice cream',
  calories: 200
}

speak(ice_cream)
```

```bash
main.ts(16,7): error TS2345: Argument of type '{ nmae: string; calories: number; }
is not assignable to parameter of type 'Food'.
Property 'name' is missing in type '{ nmae: string; calories: number; }'.
```

这里是入门指南，我们不会深入接口的更多细节。但是关于接口还有很多在这里没有提到的，所以建议去看看 TypeScript 的文档 – [这里](http://www.typescriptlang.org/docs/handbook/interfaces.html)。

## 类

当我们构建大型应用的时候，很多开发者会选择面向对象编程，尤其是像 Java 或是 C#。 TypeScript 提供了与之类似的类系统，包括了继承、抽象类、接口实现、set、get 方法以及其他。

还需要提到的是，自从 JavaScript 最近的升级（ECMAScript 2015），原生的 JavaScript 开始支持类，不通过 TypeScript 也可以使用。这两种实现非常相似，但是它们有缩不同， TypeScript 更加严格。

延续食物的主题，下面是一个简单的 TypeScript 的例子：

```typescript
class Menu {
  // Our properties:
  // By default they are public, but can also be private or protected.
  items: Array<string> // The items in the menu, an array of strings.
  pages: number // How many pages will the menu be, a number.

  // A straightforward constructor.
  constructor(item_list: Array<string>, total_pages: number) {
    // The this keyword is mandatory.
    this.items = item_list
    this.pages = total_pages
  }

  // Methods
  list(): void {
    console.log('Our menu for today:')
    for (var i = 0; i < this.items.length; i++) {
      console.log(this.items[i])
    }
  }
}

// Create a new instance of the Menu class.
var sundayMenu = new Menu(['pancakes', 'waffles', 'orange juice'], 1)

// Call the list method.
sundayMenu.list()
```

任何写过一些 Java 或是 C# 应该感觉这些语法很熟悉，继承也类似：

```typescript
class HappyMeal extends Menu {
  // Properties are inherited

  // A new constructor has to be defined.
  constructor(item_list: Array<string>, total_pages: number) {
    // In this case we want the exact same constructor as the parent class (Menu),
    // To automatically copy it we can call super() - a reference to the parent's constructor.
    super(item_list, total_pages)
  }

  // Just like the properties, methods are inherited from the parent.
  // However, we want to override the list() function so we redefine it.
  list(): void {
    console.log('Our special menu for children:')
    for (var i = 0; i < this.items.length; i++) {
      console.log(this.items[i])
    }
  }
}

// Create a new instance of the HappyMeal class.
var menu_for_children = new HappyMeal(['candy', 'drink', 'toy'], 1)

// This time the log message will begin with the special introduction.
menu_for_children.list()
```

TS 中类的更多信息请看文档 – [这里](http://www.typescriptlang.org/docs/handbook/classes.html)。

## 泛型

泛型是模板，它允许一个函数接收不同类型的参数。使用泛型创建可重用的组件比 any 类型要好，当变量传入传出时，泛型会保留变量的类型。

下面的例子一个接收一个参数并返回一个含有相同参数的数组。

```typescript
// The <T> after the function name symbolizes that it's a generic function.
// When we call the function, every instance of T will be replaced with the actual provided type.

// Receives one argument of type T,
// Returns an array of type T.

function genericFunc<T>(argument: T): T[] {
  var arrayOfT: T[] = [] // Create empty array of type T.
  arrayOfT.push(argument) // Push, now arrayOfT = [argument].
  return arrayOfT
}

var arrayFromString = genericFunc<string>('beep')
console.log(arrayFromString[0]) // "beep"
console.log(typeof arrayFromString[0]) // String

var arrayFromNumber = genericFunc(42)
console.log(arrayFromNumber[0]) // 42
console.log(typeof arrayFromNumber[0]) // number
```

第一次调用函数的时候我们手动设置类型为字符串。这不需要编译器知道参数的类型会自动决定合适的类型，就像第二次调用。尽管不是强制的，每一个提供类型是最佳实践，因为编译器可能在复杂的场景中猜测类型时出现错误。

TypeScript 文档包含许多泛型使用的高级用法，包括和接口的一起使用，可以在[这里](http://www.typescriptlang.org/docs/handbook/generics.html)看到。

## 模块

构建大型应用是另一个重要的理念是模块化。把代码分成许多小的可重用的模块可以帮助项目保持组织性和可理解性，比一个一万行的代码要好的多。

TypeScript 介绍了一种导入导出模块的语法，但不用处理文件间的真正的依赖。为了拓展 TS 的模块化，需要依赖第三方库：客户端应用使用 [require.js](http://requirejs.org/)，而 Node.js 使用 [CommonJS](https://en.wikipedia.org/wiki/CommonJS)。让我们来看看一个 TypeScript 使用 require.js 的简单例子：

我们将有两个文件。一个导出一个函数，一个导入这个函数并使用它。

exporter.ts

```typescript
var sayHi = function (): void {
  console.log('Hello!')
}

export = sayHi
```

importer.ts

```typescript
import sayHi = require('./exporter')
sayHi()
```

现在需要下载 require.js 并引入（[如何使用](http://requirejs.org/docs/start.html)）。最后一步是编译两个 .ts 文件。一个额外的参数告诉 TypeScript 使用的是 require.js（也被称作 AMD），与之像对应的是 CommonJS。

```bash
tsc --module amd *.ts
```

Modules are quite complex and are out of the scope of this tutorial. If you want to continue reading about them head out to the TS docs – [here](http://www.typescriptlang.org/docs/handbook/modules.html).

模块相当的复杂超出了这篇教程的范围。如果你想要继续学习可以查看 TS 的文档 - [这里](http://www.typescriptlang.org/docs/handbook/modules.html)。

## 第三方声明文件

当我们使用原本为普通 JavaScript 文件设计的库时，我们需要使用一个声明文件使得库可以在 TypeScript 中使用。声明文件的扩展名是 .d.ts 包含库和 API 的多种信息。

TypeScript 声明文件通常是自己写的，但有很高的可能已经有了 .d.ts 文件已经有其他人完成。 [DefinitelyTyped](http://definitelytyped.org/) 是最大的声明文件的公共仓库，包含超过一千个库。同时还有一个流行的 Node.js 模块去管理 TypeScript 定义：[Typings](https://github.com/typings/typings)。

如果你需要自己编写定义文件，[这篇指南](http://www.typescriptlang.org/docs/handbook/writing-declaration-files.html)会给你帮助。

## TypeScript 2.0 的新特性

下面会介绍一些使用的新特性：

- Non-nullable 类型防止变量值为 null 或 undefined
- 声明文件直接通过 NPM 安装
- 控制流的分析帮助在编译之前发现错误
- 模块导入导出的演进

其他的特性包括在 async/await 中控制异步流，这将会在 2.1 中更新。

## 延伸阅读

官方文档中的大量内容可能在一开始有点多，但是深入学习时会很有帮助。这篇教程可以作为入门介绍，所以没有包含 TS 的方方面面。这里是一些这篇教程跳过的有用的理念：

- [命名空间](http://www.typescriptlang.org/docs/handbook/namespaces.html)
- [枚举](http://www.typescriptlang.org/docs/handbook/enums.html)
- [高级类型和类型指南](http://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [使用 TypeScript 编写 JSX](http://www.typescriptlang.org/docs/handbook/jsx.html)

## 总结

希望你喜欢这篇教程

现在你会考虑在项目中使用 TypeScript 了吗？
