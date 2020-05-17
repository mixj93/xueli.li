---
title: 在 Ubuntu 上搭建饥荒联机服务器（2017年9月更新）
id: build-dst-server-on-ubuntu
date: 2017-09-22T20:34:50+08:00
tags:
  - 游戏
  - 饥荒
---

饥荒联机版（Don't Starve Together）是一款非常有意思的跨平台（甚至包括 Linux）生存类游戏。可是游戏里自建服务器是用某一位玩家的电脑做 server，这样作为 server 的玩家退出了，别的人也不能玩了。所以我们需要一台专门的服务器。网上大多的教程都有些过时，并不能成功搭建起来，所以折腾了一下，出了一个新版的搭建手册。

## 机器要求

我这里使用的是 Ubuntu 16.04 64 位 的机器。内存需要至少 1G，并能以 root 身份登录机器。

## 准备服务器环境

添加 i386 的构建器，更新，并安装 32 位依赖库。

```bash
dpkg --add-architecture i386 # 添加i386的构建器
apt-get update # 更新 apt-get
apt-get install -y lib32gcc1 lib32stdc++6 libcurl4-gnutls-dev:i386 screen # 安装32位依赖库
```

## 安装 steamCMD 和 DST

下载 steamCMD

```bash

cd ~
mkdir steamcmd # 在 /root 下创建 steamcmd/ 文件夹
cd steamcmd # 进入 sreamcmd/ 文件夹
wget http://media.steampowered.com/installer/steamcmd_linux.tar.gz
tar -xvzf steamcmd_linux.tar.gz
rm steamcmd_linux.tar.gz
```

运行 steamcmd

```bash
./steamcmd.sh
```

运行 steamcmd 之后，命令提示符会变成 `Steam>`，这时进入了 steamcmd 的命令交互界面。现在使用 steamCMD 安装 DST

```bash
login anonymous # 以匿名身份登录
force_install_dir ../dstserver # 在下建立文件夹安装 DST 服务器
app_update 343050 validate # 安装 DST，成功后会出现 Success! App '343050' fully installed.
quit # 完成后退出
```

```bash
cd ~/dstserver/bin
./dontstarve_dedicated_server_nullrenderer # 这个命令会出现错误，但会帮助我们生成配置文件
```

这时我们会发现多了一个目录：`~/.klei/DoNotStarveTogether`，他的目录结构如下：

```
└── Cluster_1
    └── Master
        ├── backup
        │   ├── server_chat_log
        │   └── server_log
        ├── save
        │   ├── boot_modindex
        │   ├── client_temp
        │   ├── mod_config_data
        │   ├── modindex
        │   ├── profile
        │   ├── server_temp
        │   └── session
        ├── server_chat_log.txt
        ├── server.ini
        └── server_log.txt
```

## 配置服务器

```bash
cd ~/.klei/DoNotStarveTogether/Cluster_1/ # 进入生成配置文件的 Cluster_1/ 文件夹
touch cluster_token.txt cluster.ini # 创建几个需要的配置文件
```

这时的 Cluster_1/ 目录结构如下：

```
├── cluster.ini
├── cluster_token.txt
└── Master
    ├── backup
    │   ├── server_chat_log
    │   └── server_log
    ├── save
    │   ├── boot_modindex
    │   ├── client_temp
    │   ├── mod_config_data
    │   ├── modindex
    │   ├── profile
    │   ├── server_temp
    │   └── session
    ├── server_chat_log.txt
    ├── server.ini
    └── server_log.txt
```

必须拥有饥荒联机帐号才能架设线上独立服务器。所以我们需要通过自己的饥荒联机版客户端生成 Authentication Token。

打开你的游戏，点进入游戏主菜单当中，按~键（esc 下面那个键）打开控制台，输入 `TheNet:GenerateServerToken()`，这会在你的电脑上生成内容为 Authentication Token 的文件 `cluster_token.txt`，你把本机 `cluster_token.txt` 中的 token 复制到服务器上的 `cluster_token.txt` 中即可。不同系统中，这个文件目录不同。

Windows：

```
%USERPROFILE%/My Documents/Klei/DoNotStarveTogether/cluster_token.txt
```

MacOS：

```
~/Documents/Klei/DoNotStarveTogether/cluster_token.txt
```

Linux：

```
~/.klei/DoNotStarveTogether/cluster_token.txt
```

配置 `cluster.ini`

```ini
[GAMEPLAY]
game_mode = survival # 游戏模式
max_players = 6 # 最大玩家数
pvp = true # 是否开启 PVP
pause_when_empty = true # 没有人的时候暂停游戏


[NETWORK]
lan_only_cluster = false
cluster_intention = social
cluster_description =
cluster_name = my server # 服务器名称
offline_cluster = false
cluster_password = password # 密码


[MISC]
console_enabled = true


[SHARD]
shard_enabled = false
bind_ip = 127.0.0.1
master_ip = 127.0.0.1
master_port = 10888
cluster_key = defaultPass
```

写一个脚本方便启动

```bash
cd ~
touch startdst.sh
```

将下面内容写入脚本：

```sh
#!/bin/sh

cd ~/dstserver/bin
screen -S "Don't Starve Together Server" ./dontstarve_dedicated_server_nullrenderer
```

然后让脚本可以运行

```bash
chmod +x startdst.sh
```

## 运行服务器

```bash
~/startdst.sh
```

这时你在本机运行饥荒游戏，便可以看到这个服务器：
![服务器列表](https://user-images.githubusercontent.com/12998118/30770241-cce1e55c-a05d-11e7-81ae-c1c0674b8020.jpg)
![这是一个独立服务器](https://user-images.githubusercontent.com/12998118/30770242-d216d9e2-a05d-11e7-958e-058ff3c957db.jpg)

`Ctrl + C` 可以关闭服务器
`Ctrl + A` 然后 `Ctrl + D` 可以后台运行，`screen -r` 可以恢复。

## 参考资料

- [Install Don’t Starve Together Game Server on Ubuntu 14.04](https://www.linode.com/docs/game-servers/install-dont-starve-together-game-server-on-ubuntu)
- [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD)
- [S_API FAIL SteamAPI_Init() failed; SteamAPI_IsSteamRunning() failed.](https://github.com/FezVrasta/ark-server-tools/issues/677)
- [Server Crashes at Loading Nav Grid - HELP!](https://forums.kleientertainment.com/topic/58831-server-crashes-at-loading-nav-grid-help/)
