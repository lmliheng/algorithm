"""
来源：牛客 名企笔试真题 https://www.nowcoder.com/practice/7d20d0d96c9142be8d1a984c31b3faab
考点：递推、递归   难度：中等   时间限制 1 秒，空间 256M

描述
汉诺塔：三根杆编号 A、B、C，在 A 杆上自下而上、由大到小按顺序放置 n 个金盘。
目标是把 A 杆上的金盘全部移到 C 杆上并保持原顺序，每次只能移动一个盘子，
移动过程中三根杆上始终保持大盘在下、小盘在上。经典递归伪代码如下：

Function Hanoi(n,a,b,c)
    if n==1 then
        print(a+'->'+c)
    else
        Hanoi(n-1,a,c,b)
        print(a+'->'+c)
        Hanoi(n-1,b,a,c)
    end if
end Function

请你统计以下信息：A->B, A->C, B->A, B->C, C->A, C->B 的次数，以及所有移动的总步数。

输入描述：
仅一行，输入一个正整数 n（1 <= n <= 60），表示汉诺塔的层数。

输出描述：
首先输出 6 行
A->B:XX
A->C:XX
B->A:XX
B->C:XX
C->A:XX
C->B:XX
分别表示每种移动情况出现的次数；
最后输出一行
SUM:XX
表示所有移动情况的总和。

示例1
输入：
3
输出：
A->B:1
A->C:3
B->A:1
B->C:1
C->A:0
C->B:1
SUM:7
"""

import sys


def solve():
    # TODO: 读入 -> 求解 -> 输出
    pass


if __name__ == '__main__':
    solve()
