/**
 * @二叉树
 */
export class BinaryTree {
    val: any
    left: BinaryTree | null
    right: BinaryTree | null
    constructor(val: any, left?: BinaryTree | undefined, right?: BinaryTree | undefined) {
        this.val = val === undefined ? null : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}


/**
 * @二叉搜索树
 * Binary Search Tree 要求每个节点都满足：
 * 左树节点值<根节点<右树节点
 * 节点的左子树只包含 严格小于 当前节点的数。
 * 节点的右子树只包含 严格大于 当前节点的数。
 * 
 */

class BST {

}


/**
 * @完全二叉树
 * 对一棵深度为 h 的二叉树，如果前 h−1 层是满的（节点数达到最大值 2h−1−1），也就是满二叉树
 * 且第 h 层的节点从左到右连续排列、中间不留空位，就是完全二叉树
 * 
 * 666个节点的完全二叉树的叶子节点有333个,公式[node_count/2]
 * 或者推算最后一层和倒数第二层的叶子数
 */





/**
 * @满二叉树
 * 对一棵深度为 h 的二叉树，h 层都是满的（节点数2^h-1）
 */