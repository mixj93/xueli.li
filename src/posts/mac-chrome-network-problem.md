---
title: Mac Chrome 出现 net::ERR_CERT_DATABASE_CHANGED 以及 net::ERR_NETWORK_CHANGED 问题
id: mac-chrome-network-problem
date: 2017-04-19T20:22:07+08:00
tags:
  - macOS
---

一个困扰了我好久的问题，Mac 上 Chrome 经常出现 `net::ERR_CERT_DATABASE_CHANGED` 以及 `net::ERR_NETWORK_CHANGED` 的问题，会导致上传文件失败，js 脚本拉不到，AJAX 请求失败等。一开始以为是 Chrome 的问题，因为浏览器换成 Safari 之后就好了，没想到竟然是 Mac 升级到 Sierra 之后老旧不用的支付宝的插件导致的。

**关于这个问题的一些讨论**

- [Barret 李靖的微博](http://weibo.com/1812166904/EcafVhwmc?sudaref=www.google.com.vn&retcode=6102&type=comment#_rnd1492597468055)
- [MacOS Sierra 升级 CHROME 用 HTTPS 访问间歇性失败 - V2EX](https://www.v2ex.com/t/307911)

**解决方案：**

```bash
sudo launchctl remove com.alipay.DispatcherService # 执行完这条就已经有了立竿见影的效果
# 以下命令是为了彻底清除万恶的支付宝插件，请确认存在后删除
sudo rm -rf /Library/Application\ Support/Alipay
sudo rm -rf /Library/LaunchDaemons/com.alipay.DispatcherService.plist
sudo rm -rf ~/Library/LaunchAgents/com.alipay.adaptor.plist
sudo rm -rf ~/Library/LaunchAgents/com.alipay.refresher.plist
sudo rm -rf ~/Library/Internet\ Plug-Ins/aliedit.plugin
sudo rm -rf ~/Library/Internet\ Plug-Ins/npalicdo.plugin
```
