import pandas as pd


def read_data(df: pd.DataFrame):
    """
        查看传入的 DataFrame信息
    """
    print('='*20+'start'+'='*18)
    print("行列信息：",df.shape)
    print(df.info())
    # print(df.head())
    # print(df.describe(include='all'))
    print('='*20+'end'+'='*20)

# 使用示例
if __name__ == "__main__":
    # 创建一个示例 DataFrame
    sample_df = pd.DataFrame({
        'A': [1, 2, 3, 4, 5],
        'B': [10, 20, 30, 40, 50]
    })
    
    read_data(sample_df)
    