#### 添加当前目录的所有文件到暂存区：
`git add .`

#### 拉取代码报错：`You have not concluded your merge`

解决方案：

**一、保留你本地的修改**

`git merge --abort`

`git reset --merge`

**二、抛弃本地的修改**

git fetch --all

git reset --hard origin/master

git fetch

2、上传代码报错: failed to push some refs to
解决方案：

先拉去一次：git pull origin heyp
再次提交：git push origin heyp

若是还未解决

git pull --rebase origin heyp
git push -u origin heyp
