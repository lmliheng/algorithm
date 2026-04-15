## Binary Tree
二叉树（Binary Tree）是计算机科学中一种重要的数据结构，每个节点最多有两个子节点，分别称为左子节点和右子节点。二叉树在算法设计、数据存储和各种应用场景中都有广泛的应用
以下是关于二叉树的一些基本概念、性质、遍历方法和应用场景的详细介绍：

## 基本概念
节点：二叉树的基本组成单元，包含数据元素及指向左右子节点的指针。
根节点：二叉树的顶部节点，没有父节点。
叶子节点：没有子节点的节点，位于树的最底层。
父节点：某个节点的上层节点。
子节点：某个节点的下层节点。

## 二叉树的类型
满二叉树：所有层的节点数都达到最大值。
完全二叉树：除最后一层外，其他层节点数达到最大值，且最后一层的节点从左到右依次排列。
平衡二叉树：任意节点的左右子树高度差不超过1。

## 二叉树的遍历方法
前序遍历：根节点 -> 左子树 -> 右子树。
中序遍历：左子树 -> 根节点 -> 右子树。
后序遍历：左子树 -> 右子树 -> 根节点。
层序遍历：按层次从上到下、从左到右访问每一个节点。

## 二叉树的应用场景
二叉搜索树：用于高效地执行查找、插入和删除操作。
平衡二叉树（AVL树）：一种自平衡的二叉搜索树，保证树的平衡性，避免退化成链表。
堆：一种特殊的完全二叉树，用于实现优先队列等数据结构。

## start
创建二叉树
```
package 二叉树;

class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
        left = null;
        right = null;
    }
}
```
二叉树的插入以及排序搜索
```
package 二叉树;

public class BinaryTree {
    TreeNode root;

    public BinaryTree() {
        root = null;
    }

    public void insert(int value) {
        root = insertRec(root, value);
    }



    // 递归插入节点
    private TreeNode insertRec(TreeNode root, int value) {
        if (root == null) {
            root = new TreeNode(value);
            return root;
        }
        if (value < root.value) {
            root.left = insertRec(root.left, value);
        } else if (value > root.value) {
            root.right = insertRec(root.right, value);
        }
        // If the value is already present in the tree, do not insert duplicates
        return root;
    }

    // 前序遍历
    public void preorderTraversal(TreeNode root) {
        if (root != null) {
            System.out.print(root.value + " ");
            preorderTraversal(root.left);
            preorderTraversal(root.right);
        }
    }

    // 中序遍历
    public void inorderTraversal(TreeNode root) {
        if (root != null) {
            inorderTraversal(root.left);
            System.out.print(root.value + " ");
            inorderTraversal(root.right);
        }
    }

    // 后序遍历
    public void postorderTraversal(TreeNode root) {
        if (root != null) {
            postorderTraversal(root.left);
            postorderTraversal(root.right);
            System.out.print(root.value + " ");
        }
    }

    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(20);
        tree.insert(40);
        tree.insert(60);
        tree.insert(80);
        tree.insert(10);
        tree.insert(90);
        tree.insert(5);
        tree.insert(15);


        System.out.println("前序遍历:");
        tree.preorderTraversal(tree.root);
        System.out.println("\n中序遍历:");
        tree.inorderTraversal(tree.root);
        System.out.println("\n后序遍历");
        tree.postorderTraversal(tree.root);
    }
}
```