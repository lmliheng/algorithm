
# int float


"""
list 列表
1. 遍历
"""
items=[1,3,10,7,9]
# 遍历
for item in items:
    print(item)
for index,item in enumerate(items):
    print(index,item)
# range(start,stop-1,step=1)
for i in range(0,len(items)):
    print(i,items[i])

# 预创建固定长度列表
list1=[0]*10
# 包括start,不包括end，[start,end,step]
print(items[1:3])


###  排序

twoD_items=[[1,3],[4,6],[2,1],[1,2]]
# 一维
items_sorted=sorted(items)
print(items_sorted,items)
items.sort() #原地修改
print(items)
# 二维
twoD_items_sorted=sorted(twoD_items,key=lambda x:x[0])
print(twoD_items_sorted)

### 删除元素 pop
arr=[1,3,4,6,10]
item=arr.pop(1)
print(arr)

### 插入元素
arr.insert(0,0)
print(arr)

### 反转
arr.reverse()
print(arr)




"""
tuple 元组
1. 遍历
"""





# dict 





# set

