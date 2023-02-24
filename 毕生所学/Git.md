![image-20220304150730811](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20220304150730811.png)

## 下载git后的基本配置

```js
//设置用户信息
git config --global user.name "XXX"     // 设置用户名
git config --global user.email "XXXX"   // 设置邮箱
//查看用户信息
git config --global user.name
git config --global user.email
```

## 指令

- git init   //初始化项目
- git status   //查看当前代码提交的状态
- git add .    //（有空格）将所以的修改提交到暂存区
- git commit -m "这里写备注，不过不能是中文"   //提交到本地仓库（.git的文件中）
- git log    //查看提交到本地仓库的记录  （日志最上面的是最新的  所以是从下网上看的）
- git log --pretty=oneline --all --graph --abbrev-commit   //查看提交到本地仓库的记录简洁版

## 版本回退

1. 先查看提交记录git log   //主要是为了查看提交的commitID，唯一标识
2. git reset --hard  + commitID

![image-20220405172345045](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20220405172345045.png)

- 版本退回了之后又不想退回了  依旧可以用（git reset --hard +commitID）方法退回
- 如果找不到记录了 可以用  git reflog  指令查看

## 添加文件到忽略列表

- 我们可以在工作目录中创建一个名为 .gitignore 的文件（文件名称固定），列出要忽略的文件模式。

```js
// .gitignore 文件内容
file02.txt    //固定忽略的文件
# 也可以使用通配符，例如
*.txt
*.iml
...
```

## 分支

- git branch     //查看分支   主分支是master
- git branch   +分支名   //创建分支
- git checkout  -b +分支名   //添加并切换分支
- git branch -d +分支名   //删除分支  -D 是强制删除  没有合并会警告
- git merge +分支名   // 将该分支合并到当前分支上

![image-20220405180059194](C:\Users\乐此不疲\AppData\Roaming\Typora\typora-user-images\image-20220405180059194.png)

## 使用Github，详情见Github创建仓库后

### 

```js
git init
git commit -m "first commit"
//下面是一个改名操作，所以本地要保证先有默认的master分支。git branch -m oldName  newName
git branch -M main
//本地仓库和远程仓库建立连接、origin 为远程地址的别名。
git remote add origin https://github.com/wangzhengkang-lcbp/创库名.git
git push -u origin main
```

## clone克隆到本地

- git clone +链接

## 拉取

- 当远端有人更新了文件  我们可以直接 git pull 同步到本地