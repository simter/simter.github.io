# 任务处理流程

## 概述

任务归类为 4 大阶段，发起 (Opened) > 开发 (Working) > 测试 (Testing) > 完成 (Done)。通过 Tower 的看板模式进行区分，如下图所示：

![图 1](/asset/task-flow-01.png)

点击 [这里](https://tower.im/projects/7c9075ba9b4d4ebda50ceaa443bfa786) 打开任务看板。

## 处理流程

![图 2](/asset/task-flow-02.png)

### 发起任务

新建任务并将任务派单给首个处理人员，如下图：

![图 3](/asset/task-flow-03.png)

如果需要为任务添加详细说明，点击上面的任务标题，打开任务后，如下图操作：

![图 4](/asset/task-flow-04.png)

### 开始任务的处理

处理人收到任务后，当实际开始处理该任务时，先打开该任务，然后将鼠标移到任务标题上，此时会在标题左侧出现一个工具条，点击那个执行任务的图标，标记自己正在处理这个任务；点击后会在紧靠任务标题的左侧显示您的用户图标，方便团队中其他用户知道当前任务是谁正在处理，如下图所示：

![图 5](/asset/task-flow-05.png)

特别提醒，禁止出现如下情况：

- 正在实际处理 A 任务，团队成员却在 Tower 中看到你是将 B 任务标记为正在执行中。
- 正在实际处理 A 任务，团队成员却在 Tower 中没有看到你将 A 任务标记为正在执行中。

同时你需要切换到任务的看板界面，看任务是否在对应的板块下，如果不是，则必须拖动任务到对应的板块中，如下图操作：

![图 6](/asset/task-flow-06.png)

### 确定任务的开发分支号

任务的办理人在开始处理任务后，需确定任务相关的 GIT 仓库及其开发分支号。过程如下：

1. 如果 GIT 仓库还没建立，则需先新建相应的 GIT 仓库，如果没有新建权限则向 GIT 仓库管理员提交申请，由 GIT 仓库管理员创建。
2. 如果 GIT 仓库已经存在，则确定任务对应的 issue 是否已经建立，没有则先在仓库中创建一条 issue（[Bitbucket](https://bitbucket.org/bctaxi/bc-business-base/issues) 或 [Github](https://github.com/simter/simter-json/issues) 上），根据自动分配的 issue 号，附加前缀 "issue#" 作为该次任务的公共开发分支号，如 “issue#123”。之后再在该任务中发表一条评论，记录下此信息以方便后续办理人继续在此分支上执行后续的处理工作。

### 暂停任务的处理

当因为某些原因暂时不处理该任务，如要先紧急处理其它任务或者因为其它事情耽搁现在不能继续该任务的处理，此时就需要暂停任务，具体操作为将鼠标移到任务标题上，此时会在标题左侧出现一个工具条，点击那个暂停任务的图标，标记自己暂停处理这个任务；点击后紧靠任务标题左侧的您的用户图标就会消失，方便团队中其她用户知道当前任务无人正在处理，如下图所示：

![图 7](/asset/task-flow-07.png)

### 完成并送下一办理人处理

当在任务中处理完自己当前环节部分要完成的工作后，根据你的实际完成情况，必须在任务中发表一个评论，填写详细的情况说明，然后将任务派单给下一个办理人进行处理，如下图所示：

![图 8](/asset/task-flow-08.png)

如果你的修改有新的 GIT 仓库代码提交记录，务必附加修改前后的 commit 对比链接，以方便团队成员通过点击链接快速查看你的代码修改，如 [581831...bb7f1e](https://github.com/simter/simter-json/compare/581831...bb7f1e)。

[Github 对比两个提交](https://help.github.com/articles/comparing-commits-across-time/) 的 [url 格式](https://github.com/simter/simter-json/compare) 为：(用 `...` 连接两个要对比的提交)

- [https://github.com/&lt;owner&gt;/&lt;repo-name&gt;/compare/&lt;commit-hash1&gt;...&lt;commit-hash2&gt;](https://github.com/simter/simter-json/compare/581831...bb7f1e)
- [https://github.com/&lt;owner&gt;/&lt;repo-name&gt;/compare/&lt;branch-name1&gt;...&lt;branch-name2&gt;](https://github.com/simter/simter-json/compare/master...0.2.0)

[Bitbucket 对比两个提交](http://stackoverflow.com/questions/21437196/how-to-compare-two-revisions-in-bitbucket) 的 url 格式为：(用 `..` 或 `%0D` 连接两个要对比的提交)

- [https://bitbucket.org/&lt;owner&gt;/&lt;repo-name&gt;/branches/compare/&lt;commit-hash1&gt;..&lt;commit-hash2&gt;](https://bitbucket.org/ged/ruby-pg/branches/compare/f97dd6c..cfb2bfc)
- [https://bitbucket.org/&lt;owner&gt;/&lt;repo-name&gt;/branches/compare/&lt;branch-name1&gt;..&lt;branch-name2&gt;](https://bitbucket.org/ged/ruby-pg/branches/compare/v0.18.1..v0.18.0)

### 将任务标记为完成状态

当完成任务的所有工作，再没有下一办理人的时候，如已成功部署到正式环境。当前任务的办理人必须在填写完成情况说明后，将任务标记为完成状态，如下图操作：

![图 9](/asset/task-flow-09.png)

此时任务也应该被正确的拖到 Done 板块中，如下图所示：

![图 10](/asset/task-flow-10.png)

之后还需要打开 GIT 仓库对应的 [issue](https://github.com/simter/simter-json/issues)，将其关闭。