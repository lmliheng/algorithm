import pandas as pd




# pandas csv 
# DataFrame
test_data=pd.read_csv('test.csv')
print(test_data.info())
print(test_data["isSpam"])
print(test_data["content"])
test_data.to_csv('output.csv', index=False)