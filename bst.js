function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function buildTree(arr, start, end) {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const node = Node(arr[mid]);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
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
};

const arrTest = [1, 2, 3, 4, 5, 6, 7];
const treeTest = buildTree(arrTest, 0, arrTest.length - 1);
prettyPrint(treeTest);
