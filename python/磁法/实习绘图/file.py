import pandas as pd
import numpy as np
import os

# 创建输出目录（如果不存在）
os.makedirs('output_csv', exist_ok=True)

# 检查所有文件的编码和内容
files_to_process = [
    'Diurnal_Station.txt',
    'Line01_Raw.txt', 'Line02_Raw.txt', 'Line03_Raw.txt',
    'Line04_Raw.txt', 'Line05_Raw.txt', 'Line06_Raw.txt'
]

generated_files = []

for file_name in files_to_process:
    try:
        # 尝试多种编码读取文件
        encodings = ['utf-8-sig', 'utf-8', 'gbk', 'gb2312']
        df = None
        
        for encoding in encodings:
            try:
                # 先尝试读取文件内容查看格式
                with open(file_name, 'rb') as f:
                    sample = f.read(200)
                
                # 检测分隔符
                if b'\t' in sample:
                    delimiter = '\t'
                elif b',' in sample:
                    delimiter = ','
                else:
                    delimiter = None  # 空格分隔
                
                # 读取数据
                if delimiter:
                    df = pd.read_csv(file_name, delimiter=delimiter, encoding=encoding)
                else:
                    df = pd.read_csv(file_name, sep=r'\s+', encoding=encoding)
                    
                print(f"{file_name}: 成功读取，编码={encoding}, 形状={df.shape}")
                break
            except Exception as e:
                continue
        
        if df is not None:
            # 生成CSV文件名
            csv_name = file_name.replace('.txt', '.csv')
            csv_path = f"output_csv/{csv_name}"
            
            # 保存为CSV
            df.to_csv(csv_path, index=False, encoding='utf-8-sig')
            generated_files.append(csv_name)
            print(f"已生成: {csv_name}")
        else:
            print(f"无法读取文件: {file_name}")
            
    except Exception as e:
        print(f"处理 {file_name} 时出错: {str(e)}")

# 打印所有生成的文件
print("\n生成的CSV文件:")
for file in generated_files:
    print(file)