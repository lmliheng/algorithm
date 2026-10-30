import heapq
import math

class Node:
    """表示网格中的一个节点"""
    def __init__(self, x, y):
        self.x = x          # 行坐标
        self.y = y          # 列坐标
        self.g = float('inf')   # 从起点到当前节点的实际代价
        self.h = 0              # 从当前节点到终点的估计代价（启发式）
        self.f = float('inf')   # f = g + h
        self.parent = None      # 父节点，用于回溯路径

    def __lt__(self, other):
        # 让 Node 可以被 heapq 比较大小
        return self.f < other.f

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

def heuristic(a, b):
    """
    启发函数：计算节点 a 到节点 b 的曼哈顿距离
    也可以换成欧几里得距离：math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2)
    """
    return abs(a.x - b.x) + abs(a.y - b.y)

def get_neighbors(node, grid):
    """
    获取当前节点的四个邻居（上下左右）
    如果允许对角线移动，可以扩展到8个方向
    """
    rows, cols = len(grid), len(grid[0])
    neighbors = []
    # 四个方向：上、下、左、右
    directions = [(-1,0), (1,0), (0,-1), (0,1)]
    
    for dx, dy in directions:
        nx, ny = node.x + dx, node.y + dy
        if 0 <= nx < rows and 0 <= ny < cols:
            # 假设 grid 中 0 表示可通行，1 表示障碍物
            if grid[nx][ny] == 0:
                neighbors.append(Node(nx, ny))
    return neighbors

def reconstruct_path(end_node):
    """从终点回溯到起点，返回路径列表"""
    path = []
    current = end_node
    while current is not None:
        path.append((current.x, current.y))
        current = current.parent
    path.reverse()  # 反转得到从起点到终点的顺序
    return path

def astar(grid, start, end):
    """
    A* 主算法
    :param grid: 二维网格，0=可通行，1=障碍物
    :param start: 起点坐标 (x, y)
    :param end: 终点坐标 (x, y)
    :return: 路径列表 [(x1,y1), (x2,y2), ...]，若无路径则返回空列表
    """
    rows, cols = len(grid), len(grid[0])
    
    # 检查起点和终点是否合法
    if not (0 <= start[0] < rows and 0 <= start[1] < cols):
        print("起点超出网格范围")
        return []
    if not (0 <= end[0] < rows and 0 <= end[1] < cols):
        print("终点超出网格范围")
        return []
    if grid[start[0]][start[1]] == 1 or grid[end[0]][end[1]] == 1:
        print("起点或终点是障碍物")
        return []
    
    # 创建起点和终点节点
    start_node = Node(start[0], start[1])
    end_node = Node(end[0], end[1])
    
    # 初始化起点
    start_node.g = 0
    start_node.h = heuristic(start_node, end_node)
    start_node.f = start_node.g + start_node.h
    
    # open_list: 待探索的节点（优先队列）
    open_list = []
    heapq.heappush(open_list, start_node)
    
    # closed_set: 已经探索过的节点
    closed_set = set()
    
    # 记录每个坐标对应的最佳节点（用于快速查找和更新）
    open_dict = {start_node: start_node}
    
    while open_list:
        # 取出 f 值最小的节点
        current = heapq.heappop(open_list)
        
        # 如果到达终点
        if current == end_node:
            return reconstruct_path(current)
        
        # 将当前节点加入 closed_set
        closed_set.add(current)
        
        # 遍历邻居
        for neighbor in get_neighbors(current, grid):
            if neighbor in closed_set:
                continue
            
            # 计算新的 g 值（从起点经过 current 到 neighbor）
            tentative_g = current.g + 1  # 相邻格子移动代价为 1
            
            # 如果 neighbor 不在 open_list 中，或者找到了更好的路径
            if neighbor not in open_dict or tentative_g < neighbor.g:
                neighbor.g = tentative_g
                neighbor.h = heuristic(neighbor, end_node)
                neighbor.f = neighbor.g + neighbor.h
                neighbor.parent = current
                
                if neighbor not in open_dict:
                    heapq.heappush(open_list, neighbor)
                    open_dict[neighbor] = neighbor
                else:
                    # 已在 open_list 中但 g 值更新了，需要重新调整堆
                    # 简单做法：重新 push，旧的会在后面被跳过
                    heapq.heappush(open_list, neighbor)
    
    # open_list 为空仍未到达终点，无可行路径
    return []

# ============= 使用示例 =============
if __name__ == "__main__":
    # 定义一个 5x5 的网格，0=空地，1=障碍物
    grid = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
    
    start = (0, 0)  # 起点
    end = (4, 4)    # 终点
    
    path = astar(grid, start, end)
    
    if path:
        print(f"找到路径，共 {len(path)} 步:")
        print(path)
        
        # 可视化路径
        visual_grid = [['.' for _ in range(len(grid[0]))] for _ in range(len(grid))]
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == 1:
                    visual_grid[i][j] = '#'
        for step, (x, y) in enumerate(path):
            visual_grid[x][y] = str(step % 10)  # 用数字显示路径步骤
        
        print("\n路径可视化（#=障碍物，数字=路径步骤）:")
        for row in visual_grid:
            print(' '.join(row))
    else:
        print("无法找到路径")