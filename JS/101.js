/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

  function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }

var isSymmetric = function (root) {


    const bfs = (l, r) => {
        if (r == null && l == null) {
            return true
        }
        if (r == null || l == null) {
            return false
        }
        if (r !== l) {
            return false
        }
        return bfs(l.left, r.right) && bfs(l.right, r.left)
    }

    if (root === null) {
        return true
    }
    return bfs(root.left, root.right)//undefined

};



 const bfs = (l, r) => {
        if (r == null && l == null) {
            return true
        }
        if (r == null || l == null) {
            return false
        }
        if (r !== l) {
            return false
        }
        return bfs(l.left, r.right) && bfs(l.right, r.left)
    }

    let root= new TreeNode(1,new TreeNode(2,new TreeNode(3,null,null),new TreeNode(4,null,null)),new TreeNode(2,))
    if (root === null) {
        return true
    }



     bfs(root.left, root.right)//undefined

