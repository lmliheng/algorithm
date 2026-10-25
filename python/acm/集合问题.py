"""
来源：牛客 名企笔试真题 https://www.nowcoder.com/practice/9ab4c0476fbf487586ff47c5761b1b06
考点：并查集、二分图   难度：较难   时间限制 1 秒，空间 256M

描述
给你 a,b 和 n 个数 p[i]，问如何把这 n 个数分配给 A、B 两个集合，并且满足：
若 x 在集合 A 中，则 a-x 必须也在集合 A 中；
若 x 在集合 B 中，则 b-x 必须也在集合 B 中。

输入描述：
第一行 三个数 n a b（1 <= n <= 1e5，1 <= a,b <= 1e9）
第二行 n 个数 p1 p2 ... pn（1 <= pi <= 1e9）

输出描述：
如果某个数只出现一次，它也可以同时分配给 A、B 集合，只要所有数字都可以被分配到集合中，那么输出 YES，
然后第二行输出 n 个数分别代表 p[i] 属于哪个集合（0 代表 A 集合，1 代表 B 集合）；
不行就输出 NO。
放在哪个集合都可以的时候优先放 B。

示例1
输入：
4 5 9
2 3 4 5
输出：
YES
0 0 1 1

示例2
输入：
3 3 4
1 2 4
输出：
NO
"""

import sys


def solve():
    # TODO: 读入 -> 求解 -> 输出
    input_array=sys.stdin.read().split('\n')[:2]
    a=-1
    b=-1
    n=-1
    a_=[]
    b_=[]
    arr=[]
    for index,input_line in enumerate(input_array):
        input_line=input_line.strip()
        if index == 0:
            n,a,b=input_line.split(' ')  
        if index ==1:
            arr=[int(x) for x in input_line.split(' ')]
    n=int(n)
    a=int(a)
    b=int(b)

    if len(arr) != n:
        raise Exception('数组长度不是n')
    # print(n,a,b,arr)

    visit=[0]*len(arr)
    ab=[-1]*len(arr)
    for index,item in enumerate(arr):
       
        if visit[index]==0 :
            if b-item in arr:
                ab[index]=1
                ab[arr.index(b-item)]=1
                visit[arr.index(b-item)]=1
            if a-item in arr:
                ab[index]=0
                ab[arr.index(a-item)]=0
                visit[arr.index(a-item)]=1
    if -1 not in ab:
        print("YES")
        print(" ".join([str(x) for x in ab]))
    else:
        print("NO")

if __name__ == '__main__':
    solve()
