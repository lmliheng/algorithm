
# int float


"""
string

"""
### 字符方法:
# ord('a') 单个字符转ASCII
# chr(97) ASCII转字符
print(ord('a'))
print(chr(97))

### 转字符串
arr_=[1,3,5]
print(type(str(arr_)))


"""
list 列表
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

# 创建二维数组
rows, cols = 3, 4
matrix = [[0] * cols for _ in range(rows)]
print(matrix)

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

### 合并
arr1=[1,3,5]
arr2=[4,1,5]
print([*arr1,*arr2])


"""
tuple 元组
1. 遍历
"""





 
"""
dict 字典
1. 添加,删除,修改,查询
"""
dict1={}
dict1['first']='liheng'
dict1['two']=1
print(dict1)
print(dict1['first'])
dict1['two']-=1
print(dict1)
dict1.pop('two')
print(dict1)


"""
set 集合
"""
set2={'1','2'}
# 空集合
set1=set()

set1.add(1)
set1.add('2')
set1.add('集合')
print(set1)
set1.remove(1)
try:
    set1.remove(0)
except:
    print('不存在')
# 查询方法还是in，比数组快的多
print('2' in set1)
