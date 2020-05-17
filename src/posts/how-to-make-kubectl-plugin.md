---
title: 如何制作 kubectl 插件
id: how-to-make-kubectl-plugin
date: 2018-02-12T15:31:34+08:00
tags:
  - 开发
  - k8s
---

本文介绍如何制作一个简单的 kubectl 插件来扩展和定制 kubectl 的功能。

## 简介

kubectl 是 Kubernetes 的命令行工具，管理和操作 Kubernetes 集群的必备工具。在 kubectl 1.8 版本及以后提供了官方对插件的支持。kubectl 插件可以扩展、定制 kubectl，为 kubectl 添加新的子命令。

## 编写一个最简单的 kubectl 插件

kubectl 插件其实就是一系列文件的集合，插件至少要包含一个描述性的文件：`plugin.yaml`，还可以包含二进制文件、脚本、资源文件等。这些文件需要放在 kubectl 插件的指定的路径中，按照寻找插件的顺序，这些路径为：

- 如果指定了 `${KUBECTL_PLUGINS_PATH}`，则不会继续寻找其他的目录。
- `${XDG_DATA_DIRS}/kubectl/plugins`
- `~/.kube/plugins`

最简单的插件只需要一个 `plugin.yaml` 即可，例如：

```yaml
name: 'hello'
shortDesc: 'I say hello!'
command: 'echo Hello plugins!'
```

这个例子中定义了一个名为 `hello` 的 kubernetes 插件，并会打印 `Hello plugins!`。

只需要在 `~/.kube/plugins` 下建一个名为插件名的文件夹，然后将这个 `plugin.yaml` 文件放进文件夹，目录结构如下：

```
~/.kube/plugins/
└── hello/
    └──  plugin.yaml
```

然后就可通过 `kubectl plugins hello` 运行插件，还可以通过 `Tab` 键进行命令的提示。

具体的例子可以查看[这里](https://github.com/kubernetes/kubernetes/tree/master/pkg/kubectl/plugins/examples/hello)。

## 编写复杂的插件

上面简单的例子并没有什么实际作用，我们可以通过任意的二进制文件或脚本代码扩展功能，以下以 python 为例实现了输出 `kube-system` 下 pod 的个数。

文件目录结构：

```
~/.kube/plugins/
└── podnum
    ├── plugin.yaml
    └── podnum.py
```

plugin.yaml

```yaml
name: 'podnum'
shortDesc: 'podnum shows pods number'
longDesc: >
  podnum shows pods number from kube-system.
command: ./podnum.py
```

podnum.py

```python
#!/usr/bin/env python
import commands
import json

namespace = "kube-system"

pods_cmd = "kubectl --namespace %s get pods -o json" % namespace
pods_json = commands.getoutput(pods_cmd)
pods = json.loads(pods_json)["items"]

print "Having %d pod(s) in kube-system" % len(pods)
```

运行情况如下：

![运行情况](https://user-images.githubusercontent.com/12998118/36132761-0020d4e8-10b4-11e8-9c16-994bddf72c65.jpg)

[这里](https://github.com/mixj93/kubectl-plugin-overview)有个更加复杂的例子可以参考。

## 参考

- [Extend kubectl with plugins](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/)
- [kubectl plugins example](https://github.com/kubernetes/kubernetes/tree/master/pkg/kubectl/plugins/examples)
