# Hosts

## Hosts 文件

      系统 | 路径
-----------|:----
   Windows | C:\Windows\System32\drivers\etc\hosts
Unix/Linux | /etc/hosts

## Hosts IP

工具 <http://ipaddress.com/ip-lookup>。


### 维基百科 [Wikipedia]

 StartDate | IP
-----------|:----|
2017-01-11 | 198.35.26.96 [[from]][laod-hosts]
2016-01-01 | 91.198.174.192 [[from]][laod-hosts]

样本:
```
198.35.26.96 zh.wikipedia.org
198.35.26.96 zh.m.wikipedia.org
198.35.26.96 zh-yue.wikipedia.org
198.35.26.96 wuu.wikipedia.org
```


### [w3schools]

 StartDate | IP
-----------|:----|
2017-01-11 | 66.29.212.110/68.232.44.251 [[from]][laod-hosts]

样本:
```
66.29.212.110 w3schools.com
66.29.212.110 www.w3schools.com
```


### Github

[Github] 国内访问慢主要原因是其 CDN 域名 assets-cdn.github.com 遭到 DNS 污染。

assets-cdn.github.com IP: 

 StartDate | IP
-----------|:----
2017-01-11 | 23.235.47.133 [[from]][github-cdn-ip1]
2017-01-01 | 151.101.100.133 [[from]][github-cdn-ip2]
2016-12-15 | 103.245.222.133 [[from]][github-cdn-ip1]

[gist.github.com](https://gist.github.com) IP:

 StartDate | IP
-----------|:----
2016-01-01 | 192.30.253.119/192.30.253.118

[github-cdn-ip1]: http://www.selfrebuild.net/2016/11/01/github-fast-host/
[github-cdn-ip2]: https://github.com/chenxuhua/chenxuhua.github.io/issues/3


样本:
```
23.235.47.133 assets-cdn.github.com
192.30.253.119 gist.github.com
```


### [Google]/[Youtube]

 StartDate | IP
-----------|:----
2016-12-01 | 61.91.161.217 [[from]][laod-hosts]

使用 [Google] Chrome 的开发者工具，看哪个域名堵塞就将其加入 hosts 配置即可。记住访问 Google 的服务，一定要用 https，不要用 http。为了避免 Google 自动根据地区转发，可以直接访问 <https://google.com/ncr>。

样本: (Google 搜索)
```
61.91.161.217 www.google.com
61.91.161.217 google.com
61.91.161.217 fonts.gstatic.com
61.91.161.217 ssl.gstatic.com
61.91.161.217 lh3.googleusercontent.com
61.91.161.217 clients5.google.com
61.91.161.217 apis.google.com
61.91.161.217 plus.google.com
61.91.161.217 ogs.google.com
61.91.161.217 www.googleadservices.com
61.91.161.217 www.google-analytics.com
```

一些链接：

- 谷歌 <https://www.google.com/ncr>  
- 谷歌香港 <https://www.google.com.hk/ncr>  
- 谷歌学术 <https://scholar.google.com>
- 谷歌翻译 <https://translate.google.com> <https://translate.google.cn/>

### [Facebook]

 StartDate | IP
-----------|:----
2016-12-01 | 157.240.0.17 [[from]][laod-hosts]


### [Twitter]

 StartDate | IP
-----------|:----
2017-01-11 | 110.4.24.178 [[from]][laod-hosts]


[laod-hosts]: https://laod.cn/hosts
[Github]: https://github.com
[Wikipedia]: https://zh.wikipedia.org
[Google]: https://google.com/ncr
[Youtube]: https://www.youtube.com/
[Facebook]: https://www.facebook.com
[Twitter]: https://www.twitter.com
[w3schools]: http://www.w3schools.com