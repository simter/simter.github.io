# Simter Git 协作规范

## 概述

使用 Git 作为项目的源码管理，不可避免涉及到多人协作。协作就必须有一个规范的工作流程，让大家可以有效地合作，使得项目井井有条地发展下去。这就是此规范制定的目的。

项目是基于需求进行开发的（Feature-driven development，简称 [FDD]），需求是开发的起点，先有需求再有功能分支（feature branch）或者补丁分支（hotfix branch）。完成开发后，该分支就合并到主分支，然后被删除。如下图所示：

![图 1](/asset/simter-git-flow.png)

## Git 分支约定

开发过程中，约定使用如下命名规范的几个协作分支：（X 为占位符，视具体情况而定）

名称 | 作用 | 生命周期 | 备注
---|---|---|---
master    | 主分支   | 长期存在 | 最新开发版
feature/X | 功能分支 | 短期存在 | 基于 master 创建，完成后合并回 master，然后删除
hotfix/X  | 补丁分支 | 短期存在 | 完成后合并回 master，然后删除
release/X | 发布分支 | 短期存在 | 基于 master 创建，确定版本号后打 tag，然后删除

### master 分支

此分支是项目唯一的长期分支，存放最新的开发版，是相对比较稳定的，只有开发完成的 feature 和 hotfix 才会合并到此分支，随时为版本发布做好准备。也是每日构建版本（SNAPSHOT）的直接源头。项目在此分支的源码的版本号固定设置为 `x.y.z-SNAPSHOT`。如 `simter-build` 模块，其 Maven 的 pom 版本配置如下：

```xml
<project ...>
  ...
  <groupId>tech.simter</groupId>
  <artifactId>simter-build</artifactId>
  <version>${revision}</version>
  <properties>
    <revision>0.1.0-SNAPSHOT</revision>
  </properties>
  ...
<project>
```

注：
1. ${revision} 特征需要 Maven-3.5+ 才能支持，详见 Maven 官方文档 [Maven CI Friendly Versions]。这样的好处是可以通过命令行临时指定其它版本号进行编译打包，如 "`mvn package -D revision=0.1.1-SNAPSHOT`"。
2. 项目初始化时，约定首个开发版本号为 `0.1.0-SNAPSHOT`。

### feature 分支

此为功能开发或特征开发分支，基于主分支 master 创建，完成后合并回 master，然后删除。基本的操作流程如下：

```bash
# 1. 更新 master 分支到最新
$ git checkout master
$ git pull origin master

# 2. 基于 master 分支创建 feature/X 分支
$ git checkout -b feature/X

# 3. feature/X 分支开发过程 - 产生必须的提交，可能是多个
$ git add ...
$ git commit -m ...
$ git push origin feature/X  # 分支开发可能耗时多天，要经常同步到云端
...

# 4. feature/X 分支开发完成后合并到 master 分支
# 4.1. 合并前先更新 master 到最新
$ git checkout master
$ git pull origin master

# 4.2. 变基 feature/X 分支 到最新的 master 分支（可能会有冲突需要修正）
$ git checkout feature/X
$ git rebase master

# 4.3. 合并 feature/X 到 master
$ git checkout master
$ git merge --no-ff feature/X   # 使用 --no-ff 合并
$ git push origin master        # 同步到云端
$ git branch -d feature/X       # 删除本地 feature 分支
$ git push origin :feature/X    # 删除云端 feature 分支
```

我们约定合并 feature 分支时必须使用 --no-ff 选项，保证合并后 git 自动产生一个格式为 "`Merge branch 'feature/X' into master`" 的合并提交，这样做的好处是可清晰知道合并点在哪里，从而可以清晰的回滚到合并前的位置。如下图所示可以图像化的显示合并点的位置：

```bash
$ git log --oneline --graph -20
* dcd071c (HEAD -> master, origin/master, origin/HEAD) Polishing
*   b7d5dfe Merge branch 'feature/log' into master
|\
| * 5ff535e Support delete history log
| * b876f48 Add log record
|/
* e59cbd2 Polishing
...
```

注：如果使用图像化工具，如 [GitKraken]，可以提供更佳的显示效果，如下图为 [GitKraken] 打开 spring-boot 源码的部分截图：

![图 2](/asset/git-kraken-commit-ui.png)

### hotfix 分支

此为补丁修复分支，基于 tag:x.y.z 对应的 master 提交点创建，完成后合并到 master 分支，然后删除。基本的操作流程如下：

```bash
# 1. 基于要修复的 tag:x.y.z 对应的 master 提交点创建 hotfix/X 分支
$ git log --oneline --graph --all -10
* 308c380 (HEAD -> master, origin/master, origin/HEAD) 设置下一个开发版
| * bc16893 (tag: 1.1.0) Release version 1.1.0
|/
* 8ac5296 Add 1.1.0 change log
* f6d987b Polishing
# 假设 1.1.0 有一个 bug 要修复，从上面的日志中可以看出 1.1.0 版对应的 master 提交点是 8ac5296，故基于此提交点创建 hotfix/1.1.1 分支：
$ git branch hotfix/1.1.1 8ac5296

# 3. hotfix/X 分支开发过程 - 产生必须的提交，可能是多个，但尽量合并为 1 个
$ git add ...
$ git commit -m ...
$ git push origin hotfix/1.1.1  # 补丁修复可能耗时多天，要经常同步到云端
...

# 4. hotfix/X 分支开发完成后合并到 master 分支和按需确定是否发布紧急修复版

# 4.1.合并到 master 分支
# 4.1.1. 合并前先更新 master 到最新
$ git checkout master
$ git pull origin master

# 4.1.2. 合并 hotfix/X 到 master（不要变基，合并时有冲突就修复）
$ git merge --no-ff hotfix/1.1.1  # 使用 --no-ff 合并
$ git push origin master          # 同步到云端

# 4.2. 发布紧急修复版（如果此补丁不需要紧急发布则忽略，因为可能要汇集几个 hotfix 一齐发布）

# 4.2.1. 基于 hotfix 分支创建 release 分支
$ git checkout -b release/1.1.1

# 4.2.2. 在 CHANGELOG.md 文件中添加相应的版本发布日志
$ git add CHANGELOG.md
$ git commit -m "Add 1.1.1 change log"

# 4.2.3. 修改 pom 文件中的版本号为新的修复版，如 1.1.1
$ git add pom.xml
$ git commit -m "Release version 1.1.1"

# 4.2.4. 打包
$ mvn package ...                 # Maven 打包（打包后就可以拿去部署了）
$ git tag 1.0.0                   # Git 打 tag
$ git push origin 1.1.1           # 将 tag 同步到云端

# 4.2.5. 删除创建的 release/x.y.z 分支
$ git checkout master
$ git branch -D release/1.1.1

# 5. 删除 hotfix 分支
$ git branch -d hotfix/X          # 删除本地 hotfix 分支
$ git push origin :hotfix/X       # 删除云端 hotfix 分支
```

上述合并过程与 feature 的合并流程类似，区别在于在合并时没有变基 hotfix 分支，这可以保证合并后在 git log 中可以清晰的看到 hotfix 的起始点和合并点，回滚时将提供极大的帮助。

上述是标准的 hotfix 操作流程，但如果只是很简单的一个小修改，而且不需要立即发布，可以直接在 master 分支上进行修复。


### release 分支

此为版本预发布分支，基于 master 创建或基于 hotfix/X 分支紧急修复发布，确定版本号后打 tag，然后删除。

当基于 hotfix/X 分支紧急修复发布时，基本的操作流程见上面 《`2.3 hotfix 分支内的 4.2. 发布紧急修复版`》的说明。

当基于 master 分支创建时（多个 feature 和 hotfix 一齐发布时），基本的操作流程如下：

```bash
# 1. 更新 master 到最新
$ git checkout master
$ git pull origin master

# 2. 基于 master 分支创建 release/x.y.z 分支（x.y.z 为此次要发布的版本号，如 1.0.0）
$ git checkout -b release/1.0.0

# 3. 在 CHANGELOG.md 文件中添加相应的版本发布日志
$ git add CHANGELOG.md
$ git commit -m "Add 1.0.0 change log"

# 4. 修改 pom 文件中的版本号为新的版本号，如 1.0.0
$ git add pom.xml
$ git commit -m "Release version 1.0.0"

# 5. 打包
$ mvn package ...                 # Maven 打包（打包后就可以拿去部署了）
$ git tag 1.0.0                   # Git 打 tag
$ git push origin 1.0.0           # 将 tag 同步到云端

# 6. 删除创建的 release/x.y.z 分支
$ git checkout master
$ git branch -D release/1.0.0     # 删除本地 release 分支
$ git push origin :release/1.0.0  # 删除云端 release 分支（如果有）
```

`CHANGELOG.md` 文件的格式如下：

```txt
## 1.0.1 - 2018-01-01

- comment-1
- comment-2

## 1.0.0 - 2017-01-01

- comment-1
- comment-2
```



### 为什么我们没有使用 [Git Flow]？

nvie 的 [Git Flow] 清晰可控，但相对复杂，需同时维护两个长期分支（master 和 develop）。但大多数工具都将 master 当作默认分支，当在 develop 分支进行开发时，导致经常要切换分支，非常烦人。

对于小团队的开发项目，经常是持续发布，使用 [Git Flow] 会导致频繁的 feature、hotfix 分支开发完成，合并回 develop 分支，后又立即合并回 master 分支，master 分支和 develop 分支的差别甚微，维护操作起来感觉很啰嗦繁琐。

因为上述原因，我们没有采用完整的 [Git Flow] 操作流程，但我们的 《Maven + Git 协作规范》也是在 [Git Flow] 的工作理念和一段时期的实践后，根据实际情况改进而来的。特别是可以很好的跟进 Maven 版本号的修改。


[FDD]: https://en.wikipedia.org/wiki/Feature-driven_development
[Maven CI Friendly Versions]: https://maven.apache.org/maven-ci-friendly.html
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model
[GitKraken]: https://www.gitkraken.com/