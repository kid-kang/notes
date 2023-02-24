//深度优先搜索 DFS 前序遍历
var preorderTraversal = function (root) {
  const res = [];
  const dfs = (root) => {
    if (root == null) return;   // 递归出口
    res.push(root.val);
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return res;
};


//广度优先搜索BFS  层序遍历
var levelOrder = function (root) {
  let res = [];
  if (!root) return res;   // 递归出口
  let q = [root];    // 队列
  while (q.length !== 0) {
    let cur = q.length;
    let arr = [];
    for (let i = 0; i < cur; i++) {
      let node = q.shift();
      arr.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(arr);
  }
  return res;
};