---
title: 10分钟学LESS
id: learn-less-in-10-minutes-or-less-zh-cn
date: 2016-08-13T21:34:13+08:00
tags:
  - 开发
  - Less
---

来自 [tutorialzine](http://tutorialzine.com/) 的速学教程系列，原创翻译，LESS 快速入门。

<!--more-->

[原创翻译，英文原文地址](http://tutorialzine.com/2015/07/learn-less-in-10-minutes-or-less/)

# 10 分钟学 LESS

我们都知道 CSS 有一些不足之处，尤其是面对一个上千行代码的大项目时。我们往往会不停的复制相同的代码，搜索替换每一个需要修改的颜色值。这会花费大量的精力和规范来确保 CSS 代码的可维护性。但不一定非得这样。

幸运的是，Web 开发社区已经解决了这个问题。我们现在可以使用 CSS 预处理器，比如 [Less](http://lesscss.org/)、[Sass](http://sass-lang.com/) 和 [Stylus](http://learnboost.github.io/stylus/)。相比于单纯的 CSS，CSS 预处理器拥有诸多优势。

- 变量，可以在样式表中定义变量并且轻松修改它们的值。（这或许会成为 CSS 的[新特性](http://caniuse.com/#feat=css-variables)）
- 动态计算值。（CSS 中有[calc](http://caniuse.com/#feat=calc)，但是只能计算长度）
- 混合（Mixins），重用、组合样式，甚至可以传入参数。
- 函数，提供了大量实用的功能，用来处理颜色，把图片转成 data-uri 等等。

使用预处理器的缺点是，你需要编译成 CSS 文件好让浏览器认识。

## 1. 起步

[Less](http://lesscss.org/) 是使用 JavaScript 编写的，需要 Node.js 环境或者浏览器环境运行。你可以在你的网站上引入 less.js，它能实时编译所有的 .less 样式表，但这样编译很慢并且不被推荐。推荐的方式是在部署前将 less 样式表编译为 CSS 文件。有许多的[图形化编译程序](http://lesscss.org/usage/#guis-for-less)可以编译 .less 文件，但这篇文章会讲解 node 环境中的编译方法。

如果你已经安装了 node，那么打开命令行，使用 NPM 来安装 Less：

```bash
npm install -g less
```

然后你就可以在任何命令行中使用 **lessc** 命令，把 .less 文件编译成普通的 CSS 文件：

```bash
lessc styles.less > styles.css
```

如果我们的样式规则全部写在 **styles.less** 中的话，上面那行命令，我们的样式表会转换为普通的 CSS 文件：**styles.css**。仅剩的工作就是把样式表引入到 HTML 中。如果编译出错，错误会显示在命令行中。

## 2. 变量 Variables

Less 的特性之一就是可以像其他编程语言一样创建变量。变量可以存储各种类型的变量，如常见的：颜色、大小、选择器、字体名称、URL 等等。Less 的哲学是尽可能的重用 CSS 语法规则。

这里我们定义了两个变量，一个是背景颜色，另一个是字体颜色，都包含了十六进制数值。下面是 Less 和编译的 CSS 代码：

LESS

```less
@background-color: #ffffff;
@text-color: #1a237e;

p {
  background-color: @background-color;
  color: @text-color;
  padding: 15px;
}

ul {
  background-color: @background-color;
}

li {
  color: @text-color;
}
```

CSS

```CSS
p{
  background-color: #ffffff;
  color: #1A237E;
  padding: 15px;
}

ul{
  background-color: #ffffff;
}

li{
  color: #1A237E;
}
```

在上面的栗子中，背景颜色是白色，而字体颜色是黑色的，如果我们希望背景颜色是黑色的而文字是白色的，我们可以简单地修改变量的值，而不是手动一个一个替换。

更多关于变量的信息[阅读更多](http://lesscss.org/features/#variables-feature)。

## 3. 混合 Mixins

Less 让我们可以将已有的类或 id 的样式用在别的选择器上。下面的栗子将会说明这点：

LESS

```LESS
#circle{
  background-color: #4CAF50;
  border-radius: 100%;
}

#small-circle{
  width: 50px;
  height: 50px;
  #circle
}

#big-circle{
  width: 100px;
  height: 100px;
  #circle
}
```

CSS

```CSS
#circle {
  background-color: #4CAF50;
  border-radius: 100%;
}
#small-circle {
  width: 50px;
  height: 50px;
  background-color: #4CAF50;
  border-radius: 100%;
}
#big-circle {
  width: 100px;
  height: 100px;
  background-color: #4CAF50;
  border-radius: 100%;
}
```

如果你不希望混合代码出现在编译出的 CSS 中你可以在混合后添加一对圆括号：

LESS

```LESS
#circle(){
  background-color: #4CAF50;
  border-radius: 100%;
}

#small-circle{
  width: 50px;
  height: 50px;
  #circle
}

#big-circle{
  width: 100px;
  height: 100px;
  #circle
}
```

CSS

```CSS
#small-circle {
  width: 50px;
  height: 50px;
  background-color: #4CAF50;
  border-radius: 100%;
}
#big-circle {
  width: 100px;
  height: 100px;
  background-color: #4CAF50;
  border-radius: 100%;
}
```

另一件很酷的事情是混合可以接受参数。在接下来的栗子中我们会给 circles 添加参数直径，默认值是 25px。然后我闷创建一个直径 25px 的小圆和一个直径 100px 的大圆。

LESS

```LESS
#circle(@size: 25px){
  background-color: #4CAF50;
  border-radius: 100%;

  width: @size;
  height: @size;
}

#small-circle{
  #circle
}

#big-circle{
  #circle(100px)
}
```

CSS

```CSS
#small-circle {
  background-color: #4CAF50;
  border-radius: 100%;
  width: 25px;
  height: 25px;
}
#big-circle {
  background-color: #4CAF50;
  border-radius: 100%;
  width: 100px;
  height: 100px;
}
```

更多关于 Less 混合 [官方文档](http://lesscss.org/features/#mixins-feature).

## 4. 嵌套和作用域

嵌套可以让样式表的结构和 HTML 结构相匹配，减少冲突。以下是一个无序列表的栗子：

LESS

```LESS
ul{
  background-color: #03A9F4;
  padding: 10px;
  list-style: none;

  li{
    background-color: #fff;
    border-radius: 3px;
    margin: 10px 0;
  }
}
```

CSS

```CSS
ul {
  background-color: #03A9F4;
  padding: 10px;
  list-style: none;
}
ul li {
  background-color: #fff;
  border-radius: 3px;
  margin: 10px 0;
}
```

就像在别的编程语言中，Less 中的变量的值和作用域相关，如果当前作用域中没有说明，那么 Less 会向上层寻找最近的声明。

编译成 CSS 后，我们的 **li** 的文字是白色的，因为我们在 **ul** 中提前定义了 **@text-color** 变量。

LESS

```LESS
@text-color: #000000;

ul{
  @text-color: #fff;
  background-color: #03A9F4;
  padding: 10px;
  list-style: none;

  li{
    color: @text-color;
    border-radius: 3px;
    margin: 10px 0;
  }
}
```

CSS

```CSS
ul {
  background-color: #03A9F4;
  padding: 10px;
  list-style: none;
}
ul li {
  color: #ffffff;
  border-radius: 3px;
  margin: 10px 0;
}
```

更多关于作用域请看[这里](http://lesscss.org/features/#features-overview-feature-scope)。

## 5. 运算

你可以进行基本的数学运算来计算数值和颜色。假设我们有两个 div 摆放在一起，第二个 div 的宽度是第一个两倍并且有不同的背景。Less 知道如何处理不同的单位。

LESS

```LESS
@div-width: 100px;
@color: #03A9F4;

div{
  height: 50px;
  display: inline-block;
}

#left{
  width: @div-width;
  background-color: @color - 100;
}

#right{
  width: @div-width * 2;
  background-color: @color;
}
```

CSS

```CSS
div {
  height: 50px;
  display: inline-block;
}
#left {
  width: 100px;
  background-color: #004590;
}
#right {
  width: 200px;
  background-color: #03a9f4;
}
```

## 6. 函数

Less 支持函数！这让 Less 看起来更像正经编程语言啦~

我们来看看 **fadeout**，一个减小颜色透明度的函数。

LESS

```LESS
@var: #004590;

div{
  height: 50px;
  width: 50px;
  background-color: @var;

  &:hover{
    background-color: fadeout(@var, 50%)
  }
}
```

CSS

```CSS
div {
  height: 50px;
  width: 50px;
  background-color: #004590;
}
div:hover {
  background-color: rgba(0, 69, 144, 0.5);
}
```

上面的代码中，当 div 处于 hover 状态时它会变成半透明使得鼠标移入的变化更加简单。还有许多其他的处理颜色、检测图片尺寸甚至将资源以 data-uri 的形式嵌入样式表的函数。[完整的函数列表](http://lesscss.org/functions/)

## 延伸阅读

你现在已经知道了足够多的信息来开始使用 Less！每一个 CSS 文件都是一个有效的 Less 样式表，所以你可以立即开始清理旧的冗长的 .css 文件。随着学习的深入，代码会不断的精进。这是接下来阅读建议：

- 所有的语言特性 – [链接](http://lesscss.org/features/#features-overview-feature)
- LESS 函数参考指南 – [链接](http://lesscss.org/functions/)
- 在浏览器中编辑和编写 – [链接](http://less2css.org/)
