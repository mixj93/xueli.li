---
title: 令人舒适的构建 Web 应用工具箱
id: awesome-toolchain-building-webapps
date: 2019-11-23T13:51:59+08:00
tags:
  - 开发
---

本文介绍了 https://superpapers.xueli.li/ 从构想到设计到开发到上线的一些列用到的工具和技术栈。

## 动机

[Super Pads](http://superpadsapp.com/) 是个超级有趣的音乐应用，能够让你像 DJ 一样演奏乐曲。为了便于演奏，就需要有一个可以记录乐谱的工具，这便是 [Super Papers](https://superpapers.xueli.li/)。

- [Super Papers 网站](https://superpapers.xueli.li/)
- [Super Papers 设计稿](https://dribbble.com/shots/7976441-Super-Papers-Web-UI)
- [Super Papers 的 Github](https://github.com/mixj93/superpapers)

## 设计

### 快速原型

手画原型非常适合用来绘制简单的草稿原型，iPad 上的应用 [Paper by 53](https://www.fiftythree.com/) 也是一个非常好的绘图工具，绘制的效果非常好。

### 设计稿

[Sketch](https://www.sketch.com/) 现在我做 UI 设计的首选，必要的功能全面，没有过多复杂的选项，上手快，组件的概念非常适合做 UI 设计。Sketch 的入门教程，推荐一下 [LevelUpTuts 的 Sketch App Tutorials](https://www.youtube.com/playlist?list=PLLnpHn493BHE6UIsdKYlS5zu-ZYvx22CS)。

![Super Papers 的设计稿](https://user-images.githubusercontent.com/12998118/69474514-10534100-0dfd-11ea-942b-2d3c59ba6642.png)

## 开发

[Gatsby](https://www.gatsbyjs.org/) 是构建静态网站的首选。Hexo 基于 Markdown 文件构建静态网站，Gatsby 可以使用各种数据来生成静态页面，比如 Super Papers 就是用 json 文件生成的网站。Gatsby 的生态圈非常丰富，国际化，SEO 都很便捷，lighthouse 的跑分也很高。

## 上线

[Netlify](https://www.netlify.com/) 是我最爱的部署工具。关联代码库，自动构建，发布，支持自定义域名和 https。比自己通过搭建 Travis CI 来构建发布方便许多。
