"""
Description

对数值很大、精度很高的数进行高精度计算是一类十分常见的问题。比如，对国债进行计算就是属于这类问题。

现在要你解决的问题是：对一个实数R( 0.0 < R < 99.999 )，要求写程序精确计算 R 的 n 次方(Rn)，其中n 是整数并且 0 < n <= 25。
Input

T输入包括多组 R 和 n。 R 的值占第 1 到第 6 列，n 的值占第 8 和第 9 列。
Output

对于每组输入，要求输出一行，该行包含精确的 R 的 n 次方。输出需要去掉前导的 0 后不要的 0 。如果输出是整数，不要输出小数点。
Sample Input

95.123 12
0.4321 20
5.1234 15
6.7592  9
98.999 10
1.0100 12


Sample Output

548815620517731830194541.899025343415715973535967221869852721
.00000005148554641076956121994511276767154838481760200726351203835429763013462401
43992025569.928573701266488041146654993318703707511666295476720493953024
29448126.764121021618164430206909037173276672
90429072743629540498.107596019456651774561044010001
1.126825030131969720661201
"""


import sys

def pow(num,exp):
    res=1
    for i in range(exp):
        res*=num
    return res



def solve1():
    """
    去除小数点后，求幂得到一个大整数
    再加上小数点
    """
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        
        parts = line.split()
        r_str = parts[0]  # 底数字符串，如 "95.123"
        n = int(parts[1]) # 指数
        
        # 1. 找到小数点的位置，并去掉小数点
        point_pos = len(r_str) - r_str.index('.') - 1  # 小数点后的位数
        num_str = r_str.replace('.', '')               # 去掉小数点，变成纯整数
        
        # 2. 将数字转为整数，然后计算幂
        num = int(num_str)
        result_num = str(num ** n)
        
        # 3. 确定最终小数点的位置
        total_decimals = point_pos * n
        
        # 4. 补零：如果结果长度不够，前面要补0
        if len(result_num) <= total_decimals:
            result_num = '0' * (total_decimals - len(result_num) + 1) + result_num
        
        # 5. 插入小数点
        int_part = result_num[:-total_decimals]
        dec_part = result_num[-total_decimals:]
        
        # 6. 去掉多余的零
        # 整数部分去掉前导零（但至少留一位）
        int_part = int_part.lstrip('0')
        if int_part == '':
            int_part = '0'
        
        # 小数部分去掉后置零
        dec_part = dec_part.rstrip('0')
        
        # 7. 输出
        if dec_part:
            print(f"{int_part}.{dec_part}")
        else:
            print(int_part)



def solve():
    lines=sys.stdin.readlines()
    outLines=[]
    for line in lines:
        line=line.strip()
        if not line:
            continue
        a,b=map(int,line.strip())

if __name__=="__main__":
    solve1()