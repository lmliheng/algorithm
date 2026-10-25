
from typing import List
def quick_sort(array:List)->List:
    """
    快速排序
     时间O(n log n) - O(n^2)，不稳定排序
    """
    if len(array)<2:
        return array
    pivot=array[len(array)//2]
    left=[x for x in array if x<pivot]
    middle=[x for x in array if x==pivot]
    right=[x for x in array if x>pivot]
    return quick_sort(left)+middle+quick_sort(right)

if __name__=="__main__":
    print(quick_sort([3,4,1,23,2]))