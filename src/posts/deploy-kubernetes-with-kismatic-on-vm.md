---
title: 使用 kismatic 在虚拟机上部署 Kubernetes
id: deploy-kubernetes-with-kismatic-on-vm
date: 2017-04-24T18:38:59+08:00
tags:
  - 开发
  - k8s
  - kismatic
---

[Kismatic](https://github.com/apprenda/kismatic) 是 Kubernetes 的自动化部署工具，使用它可以在 Linux 上快速部署 Kubernetes。

## 1. 准备虚拟机

我选择的是 [Vultr](https://my.vultr.com) 的虚拟机，价格适中，管理方便。
我们需要两台虚拟机，其中 etcd、master 可以在同一个节点上，worker 单独一个节点。
所以我们选择两台新加坡的 CentOS 7 机器；上传 SSH 公钥，方便 SSH 登录；设置机器的 hostname；点击创建。
待虚拟机创建完成，你就拥有了两台带公网 IP 的节点。

_说明：为什么要使用新加坡节点？延迟小，丢包少，拉取镜像又不需要翻墙。_

## 2. 准备 kismatic

### 1. Kismatic 支持的操作系统

    * RHEL 7
    * CentOS 7
    * Ubuntu 16.04

### 2. 下载 Kismatic

在 [Releases · apprenda/kismatic · GitHub](https://github.com/apprenda/kismatic/releases) 页面，根据操作系统（目前支持 LInux 和 Mac）下载 kismatic 文件，放到文件夹中。
下面命令以 MacOS、Kismatic 1.3.0 为例。

### 3. 确认 kismatic 可用

进入 `kismatic-v1.3.0-darwin-amd64` 文件夹，输入 `./kismatic help` 命令：

```bash
./kismatic help
```

如果返回 kismatic 的帮助信息，那么 kismatic 则可用，帮助信息大致如下：

```bash
kismatic is the main tool for managing your Kubernetes cluster
more documentation is availble at https://github.com/apprenda/kismatic

Usage:
  kismatic
  kismatic [command]

Available Commands:
  dashboard   Opens/displays the kubernetes dashboard URL of the cluster
  diagnose    Collects diagnostics about the nodes in the cluster
  info        Display info about nodes in the cluster
  install     install your Kubernetes cluster
  ip          retrieve the IP address of the cluster
  ssh         ssh into a node in the cluster
  upgrade     Upgrade your Kubernetes cluster
  version     display the Kismatic CLI version
  volume      manage storage volumes on your Kubernetes cluster

Use "kismatic [command] --help" for more information about a command.
```

## 3. 使用 kismatic 部署 K8s

文档：[kismatic/INSTALL.md at master · apprenda/kismatic · GitHub](https://github.com/apprenda/kismatic/blob/master/docs/INSTALL.md)

### 1. 使用 Kismatic 的部署流程大致分为四步：

Plan（计划） -> Provision（准备） -> Validate（验证） -> Apply（应用）
_ Plan（计划）：
_ 做一些部署相关的选择，Kismatic 会根据相应的选择生成一个 `kismatic-cluster.yaml` 文件。
_ Provision（准备）
_ 准备机器
_ 准备网络
_ Validate（验证）
_ 根据 `kismatic-cluster.yaml` 文件检查机器核网络是否可以安装。
_ Apply（应用） \* 根据 `kismatic-cluster.yaml` 文件来部署，并在结束后进行冒烟测试。

### 2. 部署流程

**1.kismatic intall plan**

```bash
./kismatic install plan
```

由于这里是一个简易的部署，所以只设置了 etcd、master、work 节点各一个，plan 的过程和结果如下：

```bash
Plan your Kubernetes cluster:
=> Number of etcd nodes [3]: 1
=> Number of master nodes [2]: 1
=> Number of worker nodes [3]: 1
=> Number of ingress nodes (optional, set to 0 if not required) [2]: 0
=> Number of storage nodes (optional, set to 0 if not required) [0]: 0
=> Number of existing NFS volumes to be attached [0]: 0

Generating installation plan file template with:
- 1 etcd nodes
- 1 master nodes
- 1 worker nodes
- 0 ingress nodes
- 0 storage nodes
- 0 nfs volumes

Wrote plan file template to "kismatic-cluster.yaml"
Edit the plan file to further describe your cluster. Once ready, execute the "install validate" command to proceed.
```

这时目录下多了一个 `kismatic-cluster.yaml` 文件，打开该文件，进行进一步的配置。

**2.修改虚拟机 hostname：**

没有修改 hostname 的时候，Validate 的时候一直报

```bash
verify worker node to master node connectivity using hostname [ERROR]
```

后来发现把 hostname 改为机器 IP 就验证成功了，修改 hostname 方法如下：

```bash
hostname new-server-name-here
nano /etc/hostname # 修改里面的旧 hostname 为新 hostname
nano /etc/hosts # 把 127.0.1.1 和 ::1 之后的旧 hostname 改为新 hostname
```

[修改 Linux hostname](https://www.cyberciti.biz/faq/ubuntu-change-hostname-command/)

**3.配置 kismatic-cluster.yaml**

配置 ssh：
修改 cluster -> ssh 下的 `user` 和 `ssh_key`，`user` 一般为 `root`，`ssh_key` （本地 ssh 私钥的绝对路径），Mac 系统下一般为 `/Users/username/.ssh/id_rsa`。
注意：把本机的 SSH 公钥放到虚拟机 root 用户的 ~/.ssh/authorized_keys 中，确保执行 kismatic 的机器可以无密码访问部署的机器。如果在创建虚拟机的时候选择了 SSH 公钥，那么 `authorized_keys` 就已经存在了。

配置节点的 IP 和 hostname：
我们只需要配置了 etcd、master、worker 节点，节点配置大致如下：

```yaml
etcd:
  expected_count: 1
  nodes:
    - host: '虚拟机1的 IP'
      ip: '虚拟机1的 IP'
      internalip: ''
master:
  expected_count: 1
  load_balanced_fqdn: '虚拟机1的 IP'
  load_balanced_short_name: '虚拟机1的 IP'
  nodes:
    - host: '虚拟机1的 IP'
      ip: '虚拟机1的 IP'
      internalip: ''
worker:
  expected_count: 1
  nodes:
    - host: '虚拟机2的 IP'
      ip: '虚拟机2的 IP'
      internalip: ''
```

**4.关闭虚拟机上的防火墙：**

CentOS 7 会默认开启防火墙，这会导致 Kismatic 验证、安装失败。
通过 `ssh root@虚拟机 IP` 登录远程机器。

```bash
systemctl disable firewalld # 禁用防火墙
systemctl stop firewalld # 停止防火墙
systemctl status firewalld # 查看防火墙状态
```

[如何关闭 CentOS 7 的防火墙]( [How to Stop and Disable Firewalld on CentOS 7 – Liquid Web Knowledge Base]https://www.liquidweb.com/kb/how-to-stop-and-disable-firewalld-on-centos-7/)

**5.kismatic intall validate**

进行验证：

```bash
./kismatic install validate
```

验证完毕：

```bash
Validating==========================================================================
Reading installation plan file "kismatic-cluster.yaml"                          [OK]
Validating installation plan file                                               [OK]
Validating SSH connectivity to nodes                                            [OK]
Configure Cluster Prerequisites                                                 [OK]
Run Cluster Pre-Flight Checks                                                   [OK]
```

**6.kismatic install apply**

进行部署：

```bash
./kismatic install apply
```

## 4. 使用集群

### 1. 使用 kubectl

在 kismatic 文件夹中使用 `kubectl --kubeconfig generated/kubeconfig` 命令
或者复制配置文件 cp generated/kubeconfig ~/.kube/config

### 2. 打开 Dashboard

```bash
./kismatic dashboard
```

会打开 https://45.76.186.209:6443/ui，登录名为 root，密码为 `kismatic-cluster.yamlDashboard` 中 `admin_password` 字段的值，Dashboard 显示如下：
![Kubernetes Dashboard](http://ww2.sinaimg.cn/large/006tNbRwgy1fexypn8vctj30zm0m9djl.jpg)

### 3. 安装 Heapster

1. 克隆 [heapster repo]( [GitHub - kubernetes/heapster: Compute Resource Usage Analysis and Monitoring of Container Clusters]https://github.com/kubernetes/heapster) 到本地
2. 在 kismatic 文件夹中 `kubectl --kubeconfig generated/kubeconfig create -f path/to/heapster/deploy/kube-config/influxdb/`
3. 等待 heapster 安装完成，刷新 Dashboard，监控图表已经出现了：
   ![安装了 Heapster 的 Kubernetes Dashboard](http://ww4.sinaimg.cn/large/006tNbRwgy1fexynfmtvhj30zm0m9djl.jpg)
