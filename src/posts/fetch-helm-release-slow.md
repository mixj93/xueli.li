---
title: 调查获取 helm release 过慢的问题
id: fetch-helm-release-slow
date: 2019-09-19T11:27:21+08:00
tags:
  - 开发
  - k8s
  - helm
---

最近发现并发获取 helm release 时会出现比较高的延迟，决定查了一下原因。

## 一、过程与进度

### (1) 压测、查看监控

使用 [ghz](https://github.com/bojand/ghz) 进行压测，发现并发为 5 的时候每个请求大约花费 1s 左右，并发为 10 的时候花费 2s。

![](https://user-images.githubusercontent.com/12998118/79627176-c468b600-8168-11ea-8f75-745b4bae96f5.png)

```
# ghz 使用例子
./ghz -proto ./tiller.proto \
-call hapi.services.tiller.ReleaseService.GetReleaseStatus \ -d '{"name": "original-skunk"}' \
-m '{"x-helm-api-client": "v2.9.1"}' \
<tiller_pod_ip>:44134

# 如出现以下问题，可添加 -insecure 选项
# rpc error: code = Unavailable desc = all SubConns are in TransientFailure, latest connection error: connection error: desc = "transport: authentication handshake failed: tls: first record does not look like a TLS handshake"
./ghz -proto ./tiller.proto -insecure -call hapi.services.tiller.ReleaseService.GetReleaseStatus -d '{"name": "<release_name>"}' -m '{"x-helm-api-client": "v2.9.1"}' <tiller_pod_ip>:44134
```

`tiller.proto`:

```
syntax = "proto3";
package hapi.services.tiller; option go_package = "services";

// GetReleasesStatus retrieves status information for the specified release.
rpc GetReleaseStatus(GetReleaseStatusRequest) returns (GetReleaseStatusResponse) { }

// GetReleaseStatusRequest is a request to get the status of a release. message GetReleaseStatusRequest {
  // Name is the name of the release
  string name = 1;
  // Version is the version of the release
  int32 version = 2;
}
// GetReleaseStatusResponse is the response indicating the status of the named release. message GetReleaseStatusResponse {
// Name is the name of the release. string name = 1;
// // Info contains information about the release. // hapi.release.Info info = 2;
  // Namespace the release was released into
  string namespace = 3;
}
```

### (2) 为 tiller 开启 trace

可以通过 tiller 支持的 --trace 参数，为 tiller 开启 grpc trace，由于 trace 的限制，只支持 local 的请求。

![tiller日志](https://user-images.githubusercontent.com/12998118/79627272-68eaf800-8169-11ea-9da5-45f1c9a0b2ba.png)

查看日志显示请求大部分时候都花在处理上了，接下来打算增加 tiller 的日志。

### (3) 增加 requestId 和 log 为日志增加时间戳:

增加 `requestId:github.com/mercari/go-grpc-interceptor/xrequestid`

![](https://user-images.githubusercontent.com/12998118/79627192-dfd3c100-8168-11ea-807f-7980294fb07d.png)

## 二、结果

跟踪代码后发现获取 k8s 资源时会进入 tryThrottle，是由于 tiller 的 k8s client 使用了默认的 qbs(5) 和 brust(10)，现在调整为 1e6，效果明显。

同样的并发为 5 总共 50 个请求:

![改进之后的压测数据](https://user-images.githubusercontent.com/12998118/79627196-e82bfc00-8168-11ea-8cc4-512a7a434960.png)
