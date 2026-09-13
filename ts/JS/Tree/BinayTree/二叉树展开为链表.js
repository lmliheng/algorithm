/**
 * @二叉树展开为链表
 */


/**
 * @用数组存储节点
 * 遍历节点，更新left，right属性
 * 
 * 和flatten1的空间复杂度差距大，为n
 */
function flatten(root) {
    let arr = []
    const dfs = (node) => {
        if (!node) {
            return
        }

        arr.push(node)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            arr[i].right = null
            arr[i].left = null
            continue
        }
        arr[i].right = arr[i+1]
        arr[i].left = null
    }

};




/**
 * @树的原地更新
 *  将左子树插入到右子树的地方
 * 将原来的右子树接到左子树的最右边节点
 * 考虑新的右子树的根节点，一直重复上边的过程，直到新的右子树为 null
 */
function flatten1(root) {
    while (root !== null) {
        if (!root.left) {
            // 考虑下一个节点
            root = root.right
        } else {
            let pre = root.left
            while (pre.right !== null) {
                pre = pre.right
            }
            pre.right=root.right
            root.right=root.left
            root.left=null
            root=root.right
        }
    }

};


//     1
//    / \
//   2   5
//  / \   \
// 3   4   6
// //将 1 的左子树插入到右子树的地方
//     1
//      \
//       2         5
//      / \         \
//     3   4         6        
// //将原来的右子树接到左子树的最右边节点
//     1
//      \
//       2          
//      / \          
//     3   4  
//          \
//           5
//            \
//             6
            
//  //将 2 的左子树插入到右子树的地方
//     1
//      \
//       2          
//        \          
//         3       4  
//                  \
//                   5
//                    \
//                     6   
        
//  //将原来的右子树接到左子树的最右边节点
//     1
//      \
//       2          
//        \          
//         3      
//          \
//           4  
//            \
//             5
//              \
//               6         
  
//   ......

// 作者：windliang
// 链接：https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/solutions/17274/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--26/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。