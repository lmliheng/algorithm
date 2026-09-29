import pandas as pd

train_df = pd.read_csv('train.csv')
test_df = pd.read_csv('test.csv')
gender_submission_df= pd.read_csv('gender_submission.csv')
# gender_submission_df.to_csv('submission.csv', index=False)

# 数据清洗 
print(gender_submission_df.info())

train_df["Age"].fillna(train_df["Age"].mean(), inplace=True)
test_df["Age"].fillna(test_df["Age"].mean(), inplace=True)

train_df["Fare"].fillna(train_df["Fare"].mean(), inplace=True)
test_df["Fare"].fillna(test_df["Fare"].mean(), inplace=True)

train_df["Embarked"].fillna("S", inplace=True)
test_df["Embarked"].fillna("S", inplace=True)


# 



# 提交