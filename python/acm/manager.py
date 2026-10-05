"""
描述
小明是一个互联网公司的老板，需要招聘员工。现在有k个学校的学生前来应聘。
由于特殊原因，要求最后入职的员工学校的人数应该都不一样。
比如我们可以A大学录取5人，B大学录取4人。但是不允许A大学和B大学都录取5人。
请问最后最多录取多少人呢？

输入描述
第一行一个整数k，表示学校的数量。
第二行k个整数ai，表示这个学校有ai个人前来应聘。
满足 1<=k<=100000,1<=ai<=100000

输出描述:输出最多录取人数

示例
输   入：
3
3 3 2
返回值：
6
"""
import sys

def max_num(students:list):

    students.sort(key=None,reverse=True)
    res=0
    max_people=students[0] + 1 
    for num in students:
            take = min(num, max_people - 1)
            if take <= 0:  # 如果可录取人数≤0，直接结束
                break
            res += take
            max_people = take
    return res
    # print(students)



def solve():
    step=1
    schools=0
    students=[]
    for line in sys.stdin:
        line=line.strip()
        if not line:  # 跳过空行
            continue
        if step ==1:
            schools=int(line)
            step+=1
        else:
            students=[int(item) for item in line.split(" ")]

        

    print(max_num(students))


# sys.stdout.write("\n",)

if __name__=="__main__":
    solve()