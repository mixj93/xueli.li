---
title: git commit 合并
id: merge-git-commits
date: 2018-10-09T10:10:17+08:00
tags:
  - 开发
  - git
---

> 如何将多个 git commit 合并为一个？遇到冲突时怎么办？

## 常用方案

通常只需使用 rebase 命令：

```
# 合并最近的三个 commit
$ git rebase -i HEAD~12
```

## 终极方案

如果想要合并的 commit 中有 merge 操作，rebase 是可能会出现冲突，最强解决方案：

```
$ git diff --binary master...feature > ~/feature.diff
$ wc -l ~/feature.diff # 查看 diff 行数
$ git checkout feature-new
$ git apply ~/feature.diff
# 此时 feature-new 分支只有一个 commit，修改的内容与 feature 分支一致
```
