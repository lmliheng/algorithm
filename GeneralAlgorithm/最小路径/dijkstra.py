import heapq
from llm_kernel.performance import timer

@timer
def dijkstra(graph,start):
    """
    迪杰斯特拉

    解决非负带权图最小路径问题，单源点到其他顶点
    初始化：将源点设置为已标记，其他所有点设为未标记。初始化源点到各个点的距离为无穷大，源点到自身的距离为0。
    选择最近的未标记点：从所有未标记的点中选择距离源点最近的点，将其标记为已标记。
    更新距离：对于新标记的点，检查其所有邻接点，更新源点到这些邻接点的最短距离。
    重复步骤2和3：直到所有点都被标记为已标记。
    """

    distances={v:float("infinity") for v in graph}
    distances[start]=0
    priority_quene=[(0,start)]
    # print("初始：",distances,priority_quene)
    while priority_quene:
        current_distance,currrent=heapq.heappop(priority_quene)
        if current_distance>distances[currrent]:
            continue
        for neignbor,weight in graph[currrent].items():
            distance=current_distance+weight
            if distance<distances[neignbor]:
                distances[neignbor]=distance
                heapq.heappush(priority_quene,(distance,neignbor))
        # print(distances,priority_quene)
    return distances

if __name__=="__main__":
    graph = {
'A': {'B': 1, 'C': 4},
'B': {'A': 1, 'C': 2, 'D': 5},
'C': {'A': 4, 'B': 2, 'D': 1},
'D': {'B': 5, 'C': 1}
}
 
    # dijkstra(graph, 'A')
    print(dijkstra(graph,'A'))