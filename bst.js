function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(arr, root = null) {
  const getRoot = () => root;
  const _setRoot = (newRoot) => {
    root = newRoot;
  };

  arr = removeDuplicates(arr);
  arr = mergeSort(arr);
  _setRoot(buildTree(arr));

  const insert = (value) => {
    let current = getRoot();
    while (current.data !== value) {
      if (current.data > value) {
        if (!current.left) return (current.left = Node(value));
        current = current.left;
      } else {
        if (!current.right) return (current.right = Node(value));
        current = current.right;
      }
    }
    return console.log(`DUPLICATE VALUE`);
  };

  const del = (value) => {
    let path;
    let pre;
    let target = getRoot();
    while (target.data !== value) {
      if (target.data > value) {
        pre = target;
        path = 'left';
        target = target.left;
      } else {
        pre = target;
        path = 'right';
        target = target.right;
      }
    }

    // leaf delete condition
    if (!target.left && !target.right) {
      pre[path] = null;
      // single child delete condition
    } else if (!target.left || !target.right) {
      if (target.left) pre[path] = target.left;
      else pre[path] = target.right;
      // two children delete condition
    } else {
      let nextGreater = target.right;
      while (nextGreater.left !== null) {
        nextGreater = nextGreater.left;
      }
      del(nextGreater.data);
      target.data = nextGreater.data;
    }
  };

  const find = (value) => {
    let target = getRoot();
    while (target.data !== value) {
      if (!target.left && !target.right) return 'VALUE NOT FOUND';
      if (target.data > value) target = target.left;
      else target = target.right;
    }
    return target;
  };

  const levelOrder = (treeRoot, callback) => {
    const arr = [];
    let queue = [treeRoot];
    let index = 0;
    while (queue[index]) {
      if (callback) callback(queue[index]);
      else arr.push(queue[index].data);
      if (queue[index].left) queue.push(queue[index].left);
      if (queue[index].right) queue.push(queue[index].right);
      index += 1;
    }
    if (!callback) return arr;
  };

  const preOrder = (treeRoot, callback) => {
    const arr = [];
    function rec(node) {
      if (!node) return;
      if (callback) callback(node);
      else arr.push(node.data);
      rec(node.left);
      rec(node.right);
    }
    rec(treeRoot);
    if (!callback) return arr;
  };

  const inOrder = (treeRoot, callback) => {
    const arr = [];
    function rec(node) {
      if (!node) return;
      rec(node.left);
      if (callback) callback(node);
      else arr.push(node.data);
      rec(node.right);
    }
    rec(treeRoot);
    if (!callback) return arr;
  };

  const postOrder = (treeRoot, callback) => {
    const arr = [];
    function rec(node) {
      if (!node) return;
      rec(node.left);
      rec(node.right);
      if (callback) callback(node);
      else arr.push(node.data);
    }
    rec(treeRoot);
    if (!callback) return arr;
  };

  const height = (treeRoot) => {
    if (treeRoot === null) return 0;
    let leftHeight = height(treeRoot.left);
    let rightHeight = height(treeRoot.right);
    if (leftHeight > rightHeight) return leftHeight + 1;
    else return rightHeight + 1;
  };

  const depth = (node, treeRoot = getRoot()) => {
    if (treeRoot.data === node.data) return 1;
    if (node.data < treeRoot.data) return depth(node, treeRoot.left) + 1;
    else return depth(node, treeRoot.right) + 1;
  };

  const isBalanced = (treeRoot = getRoot()) => {
    let status = true;
    preOrder(treeRoot, (node) => {
      if (status === false) return;
      const heightMin = Math.min(height(node.left), height(node.right));
      const heightMax = Math.max(height(node.left), height(node.right));
      if (heightMax - heightMin > 1) return (status = false);
    });
    return status;
  };

  const rebalanceTree = () => {
    arr = inOrder(getRoot());
    arr = mergeSort(arr);
    _setRoot(buildTree(arr));
  };

  return {
    getRoot,
    insert,
    del,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalanceTree,
  };
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const node = Node(arr[mid]);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr, mergedArr = []) {
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      mergedArr.push(leftArr.shift());
    } else {
      mergedArr.push(rightArr.shift());
    }
  }
  return [...mergedArr, ...leftArr, ...rightArr];
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function randomNumbers(minValue, maxValue = 100, amount = 10) {
  const arr = [];
  if (!minValue) {
    for (let i = 0; i < amount; i++) {
      arr.push(Math.floor(Math.random() * maxValue));
    }
  } else {
    for (let i = 0; i < amount; i++) {
      arr.push(Math.floor(Math.random() * (maxValue - minValue) + minValue));
    }
  }
  return arr;
}

function driverScript() {
  // Create a binary search tree from an array of random numbers < 100.
  const binaryTree = Tree(randomNumbers());
  // Confirm that the tree is balanced by calling isBalanced.
  console.log(binaryTree.isBalanced());
  // Print out all elements in level, pre, post, and in order.
  console.log(binaryTree.levelOrder(binaryTree.getRoot()));
  console.log(binaryTree.preOrder(binaryTree.getRoot()));
  console.log(binaryTree.inOrder(binaryTree.getRoot()));
  console.log(binaryTree.postOrder(binaryTree.getRoot()));
  // Unbalance the tree by adding several numbers > 100.
  const arr = randomNumbers(101, 1000);
  arr.forEach((num) => {
    binaryTree.insert(num);
  });
  // Confirm that the tree is unbalanced by calling isBalanced.
  console.log(binaryTree.isBalanced());
  // Balance the tree by calling rebalance.
  binaryTree.rebalanceTree();
  // Confirm that the tree is balanced by calling isBalanced.
  console.log(binaryTree.isBalanced());
  // Print out all elements in level, pre, post, and in order.
  console.log(binaryTree.levelOrder(binaryTree.getRoot()));
  console.log(binaryTree.preOrder(binaryTree.getRoot()));
  console.log(binaryTree.inOrder(binaryTree.getRoot()));
  console.log(binaryTree.postOrder(binaryTree.getRoot()));
}
driverScript();
