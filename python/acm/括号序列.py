"""
来源：牛客 名企笔试真题 https://www.nowcoder.com/practice/6c3c21e1c753498c9563c6b959a89a2c
考点：栈、字符串   难度：简单   时间限制 1 秒，空间 256M

描述
给出一个仅包含 '[', ']', '(', ')', '{', '}' 六种字符的括号序列，判断其是否合法。
* 空串是一个合法的括号序列
* 如果 A、B 都是合法的括号序列，那么 AB 也是合法的括号序列
* 如果 A 是合法的括号序列，那么 (A)、[A]、{A} 都是合法的括号序列

输入描述：
一行一个字符串 S，只包含题目中的六种括号字符。
1 <= |S| <= 1000000

输出描述：
输出为一行 "Yes" 或 "No"

示例1
输入：
(){}[]
输出：
Yes

示例2
输入：
({[]})
输出：
Yes

示例3
输入：
([)]
输出：
No
"""

import sys

def solve():
    # pass
    input_=sys.stdin.read().split('\n')[0].strip()
    stack=[]
    left=["(","[","{"]
    dict1={")":"(","]":"[","}":"{"}
    print('==',input_)
    for item in input_:  # str也是迭代对象
        if item in left:
            stack.append(item)
        else:
            if stack[len(stack)-1] == dict1[item]:
                stack.pop()
            else:
                print("NO1")
                return
    if len(stack):
        print("NO2")
    else:
        print("YES")
        
if __name__ == '__main__':
    solve()
