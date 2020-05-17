---
title: 使用 a 标签的 download 属性实现导出下载
id: anchor-download-attribute
date: 2017-12-15T13:28:29+08:00
tags:
  - 开发
  - CSS
  - JavaScript
---

HTML5 中 `a` 标签支持一个叫 `download` 属性，这个属性标识了这个 `a` 标签的行为时下载文件，而不是跳转。

## 浏览器兼容性

如 [CANIUSE](https://caniuse.com/#feat=download) 的数据所示，IE 浏览器都不支持这一特性，Edge 从 13 版本开始支持，Safari 从 10.1 版本开始支持。Firefox 只允许下载同源的文件。

## 快速使用

```html
<a download="data.txt" href="data:text/txt;charset=utf-8,内容lalallaala">
  下载 TXT
</a>
```

通过以上代码可以将文字以 `text/txt` 格式，下载为名为 `data.txt` 的文件。

## 下载为 JSON、CSV、TSV 格式

JSON、CSV 与 TSV 格式是表格数据导出下载的常用格式，在实际开发中会经常遇到。

### JSON 格式

JSON 格式的下载与 txt 下载类似，将 `a` 标签的 `href` 开头设置成 `data:text/csv;charset=utf-8,` ，拼接上数据的 `JSON.stringify` 的值即可。

```html
<a download="data.json" href="data:application/json;charset=utf-8,{index:10}">
  下载 JSON
</a>
```

### CSV 与 TSV 格式

CSV、TSV 格式首先需要借助 [ricardobeat/TSV](https://github.com/ricardobeat/TSV) 这个库将数据对象转换为 CSV、TSV 格式的字符串，其他步骤与 txt 和 JSON 格式的下载都类似。有一点需要特殊注意，如果内容包含中文字符，需要在 `data:text/csv;charset=utf-8,` 后面加上 `\ufeff`，否则会造成中文乱码。

```javascript
<a
  download="data.json"
  href="data:application/json;charset=utf-8,\ufeff一些内容"
>
  下载 CSV
</a>
```

### 完整示例

{% raw %}

<p data-height="309" data-theme-id="0" data-slug-hash="eyLEQL" data-default-tab="result" data-user="mixj93" data-embed-version="2" data-pen-title="Download js object as JSON, CSV, TSV" class="codepen">See the Pen <a href="https://codepen.io/mixj93/pen/eyLEQL/">Download js object as JSON, CSV, TSV</a> by mixj93 (<a href="https://codepen.io/mixj93">@mixj93</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
{% endraw %}

## 参考

- [了解 HTML/HTML5 中的 download 属性](http://www.zhangxinxu.com/wordpress/2016/04/know-about-html-download-attribute/)
- [HTML 元素参考 <a> - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)
