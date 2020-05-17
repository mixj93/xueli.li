---
title: Helm 101
id: helm-101
date: 2017-07-21T10:47:15+08:00
tags:
  - 开发
  - k8s
  - helm
---

## 关于 Helm

Helm（意思：舵）是 Kubernetes（希腊语含义：舵手）的应用管理工具。Tiller（意思：舵柄）是 Helm 的服务器部分，通常运行在 K8s 集群内部。

## 基本概念

**Chart**

一个 _chart_ 就是一个 Helm 包，包含应用所需要的各种资源、工具和服务，类似 Homebrew 的 formula。

**Repository**

_Repository_（仓库）是存放 _chart_ 的地方。

```
查看 Repository 列表
$ helm repo list
添加 Repository
$ helm repo add <repo_name> <repo_address>
更新各个 Repository 中的 chart 列表
$ helm repo update
```

**Release**

_Release_ 是 K8s 集群内部运行的 _chart_ 的一个实例，同一个 _chart_ 可以创建多个独立的实例。

总结起来就是：Helm 往 Kubernetes 中安装 chart, 每一次安装都创建一个 release 实例。通过搜索 Helm chart 仓库可以找到你想要的 chart。

## 准备

- 已经安装 Kubernetes，建议 1.4.1 版本或更新。
- 本地有 kubectl 的配置文件，Helm 的服务端 Tiller 将安装在 kuberctl config 对应的集群中，可通过：

```
$ kubectl config current-context
minikube
```

- 配置 Helm 命令行自动补全工具，在 `.bashrc` 或 `.zshrc` 中添加：
  - `$ source <(helm completion <shell_type>)`，`shell_type` 为 `bash` 或 `zsh`

## 安装 Helm

**1. 通过二进制包安装：**

- 在 [这里](https://github.com/kubernetes/helm/releases) 下载需要的版本
- 通过 `tar -zxvf helm-v2.0.0-linux-amd64.tgz` 解压缩文件
- 将二进制文件移动到 `/usr/local/bin/helm` 文件夹： `mv linux-amd64/helm /usr/local/bin/helm`

**2. MacOS 通过 homebrew 安装：**

```
$ brew install helm
```

## 初始化 Helm 安装 Tiller

```
$ helm init
```

- 如果想安装在指定的集群，使用 `--kube-context`
- 升级 Tiller 可以直接运行：`helm init --upgrade`

## 查找 chart

搜索 chart，可使用正则，会匹配 chart 名和描述。

```
$ helm search <keyword>
-r, --regexp           use regular expressions for searching
-v, --version string   search using semantic versioning constraints
-l, --versions         show the long listing, with each version of each chart on its own line
Options inherited from parent commands
```

查看某个具体 chart 的简介

```
$ helm inspect <chart_name>
$ helm inspect chart <chart_name>
$ helm inspect values <chart_name>
```

## 安装 chart

```
$ helm install stable/mysql
NAME:   angry-kudu # 构建了一个叫 angry-kudu 的 release
LAST DEPLOYED: Thu Jul 20 14:50:53 2017
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
...

NOTES:
...
```

在安装 chart 之前，可以通过：

- `$ helm repo update` 来更新仓库中的最新可用 charts 列表。
- `$ helm search xxx` 来搜索想要安装的 chart 是否存在。

## 自定义 chart 配置

直接安装使用的是默认的配置，如果想自定义配置，可以根据 chart 提供的配置项，自定义配置文件，然后再创建 release。

```
$ helm inspect values <chart_name>
$ echo '{mariadbUser: user0, mariadbDatabase: user0db}' > config.yaml
$ helm install -f config.yaml stable/mariadb
```

## 查看 release 状态

```
$ helm status <release_name>
LAST DEPLOYED: Thu Jul 20 14:50:53 2017
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
...

NOTES:
...
```

## 查看 release 列表

```
查看 release
$ helm list
或简写为
$ helm ls

--all 可以查看所有 release（包括被删除的）
$ helm list --all
```

## 升级 release

```
$ helm upgrade <release_name> <chart_name>
如
$ helm upgrade -f update.yaml <release_name> <chart_name>
$ helm upgrade --set <key>=<value> <release_name> <chart_name>
```

## 回滚 release

使用 `helm rollback` 回滚到之前的版本，回滚之后也会创建一个 revision。

```
$ helm rollback <release_name> <revision_number>
```

查看 release 的各个 revision 版本

```
$ helm history <release_name>
```

## 删除 release

```
$ helm delete angry-kudu
release "dining-antelope" deleted
```

## 创建自己的 chart

```
创建 chart
$ helm create <chart_name>

检查 chart 是否符合规范
$ helm lint

打包 chart
$ helm package deis-workflow
deis-workflow-0.1.0.tgz

安装
$ helm install ./deis-workflow-0.1.0.tgz
```

## 获取帮助信息

```
$ helm <command_name> -h
```

## 参考资料

1. [Helm Documentation - Using Helm](https://docs.helm.sh/using_helm/)
2. [Helm Documentation - Helm Commands](https://docs.helm.sh/helm/)
