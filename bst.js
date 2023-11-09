function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(arr) {
  arr = removeDuplicates(arr);
  arr = mergeSort(arr);
  const root = buildTree(arr, 0, arr.length - 1);

  const insert = (value) => {
    let current = root;
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
    let target = root;
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
    let target = root;
    while (target.data !== value) {
      if (!target.left && !target.right) return 'VALUE NOT FOUND';
      if (target.data > value) target = target.left;
      else target = target.right;
    }
    return target;
  };

  const levelOrder = (callback, node = root) => {
    let queue = [node];
    while (queue.length > 0) {
      if (callback) callback(queue[0]);
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      queue.shift();
    }
  };

  return { root, insert, del, find, levelOrder };
}

function buildTree(arr, start, end) {
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

let arrTest = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const treeTest = Tree(arrTest);
prettyPrint(treeTest.root);

treeTest.levelOrder(); // does nothing
treeTest.levelOrder((node) => {
  console.log(node.data);
}); // logs data from each node
treeTest.levelOrder((node) => {
  console.log(node.data);
}, treeTest.find(67)); // logs data from each node (treeTest.find return value acts as the root)
