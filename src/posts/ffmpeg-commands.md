---
title: 常用ffmpeg命令
id: ffmpeg-commands
date: 2019-05-21T14:00:24+08:00
tags:
  - ffmpeg
  - 多媒体
---

我常用的 ffmpeg，ffprobe 命令。

## 查看视频信息

```
ffprobe video.mp4
```

输出含义：

- tbn = the time base in AVStream that has come from the container
- tbc = the time base in AVCodecContext for the codec used for a particular stream
- tbr = tbr is guessed from the video stream and is the value users want to see when they look for the video frame rate

[FFmpeg-users - What does the output of ffmpeg mean? tbr tbn tbc etc?](http://www.ffmpeg-archive.org/What-does-the-output-of-ffmpeg-mean-tbr-tbn-tbc-etc-td941538.html)

## 剪辑

```
ffmpeg -ss 0:0:4.000 -t 0:2:00 -i input.mp4 -vcodec copy -acodec copy out.mp4 #不重新编码
ffmpeg -ss 0:0:4.000 -t 0:2:00 -i input.mp4 -vcodec h264 -acodec aac out.mp4 #重新编码
```

## 指定间隔截图

```
ffmpeg -ss 00:00:10.000 -i sense8.S01E03.start.mp4  -vf fps=fps=10 ../screenshots/screen-%03d.jpg
# fps 后数值越大，截图越多
```

## 左右拼接

```
ffmpeg -i left.mp4 -i right.mp4 -filter_complex \
"[0:v:0]pad=iw*2:ih[bg]; [bg][1:v:0]overlay=w" output.mp4
```

## 合并

```
ffmpeg -i "concat:input1.flv|input2.flv|input3.flv" -c copy output.mp4
```

## ffmpeg 压制带字幕视频

### 1280\*640

```
ffmpeg -i input.mkv -map 0:0 -map 0:1 -c:a aac -ab 192k -strict -2 -async 1 -c:v libx264 -crf 23 -r 25 -s 1280x640 -aspect 2:1 -pix_fmt yuv420p -partitions partb8x8+partp4x4+partp8x8+parti8x8 -b-pyramid 1 -weightb 1 -8x8dct 1 -fast-pskip 1 -direct-pred 1 -coder ac -trellis 1 -me_method hex -subq 6 -me_range 16 -bf 3 -b_strategy 1 -refs 3 -flags +loop -sws_flags fast_bilinear -sc_threshold 40 -keyint_min 25 -g 50 -qmin 3 -qmax 51 -qdiff 4 -metadata creation_time=now -vf subtitles="sub.ass":charenc=utf-8 -sn -y output.mp4
```

### 1280\*640 -> 1280\*720 加黑边

```
ffmpeg -i input.mkv -map 0:0 -map 0:1 -c:a aac -ab 320k -strict -2 -async 1 -c:v libx264 -crf 20 -r 24000/1001 -s 1280x720 -aspect 2:1 -pix_fmt yuv420p -partitions partb8x8+partp4x4+partp8x8+parti8x8 -b-pyramid 1 -weightb 1 -8x8dct 1 -fast-pskip 1 -direct-pred 1 -coder ac -trellis 1 -me_method hex -subq 6 -me_range 16 -bf 3 -b_strategy 1 -refs 3 -flags +loop -sws_flags fast_bilinear -sc_threshold 40 -keyint_min 24 -g 48 -qmin 3 -qmax 51 -qdiff 4 -threads 1 -metadata creation_time=now -vf scale=iw*1:ih,"pad=max(iw\,ih*(16/9)):ow/(16/9):(ow-iw)/2:(oh-ih)/2" -sn -aspect 16:9 -y output.mp4
```

### 1920\*1080 H265 -> H264

```
ffmpeg -i input.mp4 -map 0:0 -map 0:1 -c:a aac -ab 192k -strict -2 -async 1 -c:v libx264 -crf 20 -r 24 -s 1920x1080 -aspect 16:9 -pix_fmt yuv420p -partitions partb8x8+partp4x4+partp8x8+parti8x8 -b-pyramid 1 -weightb 1 -8x8dct 1 -fast-pskip 1 -direct-pred 1 -coder ac -trellis 1 -me_method hex -subq 6 -me_range 16 -bf 3 -b_strategy 1 -refs 3 -flags +loop -sws_flags fast_bilinear -sc_threshold 40 -keyint_min 24 -g 48 -qmin 3 -qmax 51 -qdiff 4 -threads 1 -metadata creation_time=now -sn -y output.mp4
```

## 视频加封面图片

```
ffmpeg -i INPUT.mp4 -i IMAGE.png -acodec copy -vcodec copy -map 0 -map 1:0 OUTPUT.mp4
ffmpeg -i video.mp4 -i image.png -map 0 -map 1 -c copy -c:v:1 png -disposition:v:1 attached_pic out.mp4
# best
ffmpeg -i <video.mp4> -i <cover.jpg> -map 1 -map 0 -c copy -disposition:0 attached_pic out.mp4
```

## flac 转 mp3

```
ffmpeg -i input.flac -ab 320k -map_metadata 0 -id3v2_version 3 output.mp3
```

## 去片头片尾

```
ffmpeg -ss 30 -i test.mp4 -map 0:0 -map 0:1 -c:a aac -ab 96k -strict -2 -async 1 -c:v libx264 -b:v 1414k -maxrate 2828k -bufsize 2828k -r 24 -s 1280x720 -aspect 1280:720 -pix_fmt yuv420p -partitions partb8x8+partp4x4+partp8x8+parti8x8 -b-pyramid 1 -weightb 1 -8x8dct 1 -fast-pskip 1 -direct-pred 1 -coder ac -trellis 1 -me_method hex -subq 6 -me_range 16 -bf 3 -b_strategy 1 -refs 3 -flags +loop -sws_flags fast_bilinear -sc_threshold 40 -keyint_min 24 -g 48 -qmin 3 -qmax 51 -threads 1 -metadata creation_time=now -sn -t 1034 -y test_0.mp4
```
