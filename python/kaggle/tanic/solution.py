import pandas as pd
import DataUtils
import seaborn 
import matplotlib.pyplot as plot

train_df = pd.read_csv('train.csv')
test_df = pd.read_csv('test.csv')

# 查看数据大致信息
DataUtils.read_data(train_df)
DataUtils.read_data(test_df)
# 数据集：age 有100个空，cabin大量空，Embarked缺2
# 测试集多了fare 空1

# 查看数据关系
# seaborn.barplot(x='Sex',y='Survived',data=train_df)
# plot.show()
# seaborn.barplot(x='Pclass',y='Survived',data=train_df)
# plot.show()
# train_df['IsChild'] = train_df['Age'] < 16
# seaborn.barplot(x='IsChild', y='Survived', data=train_df)
# plot.show()
# seaborn.histplot(train_df['Age'],kde=True) # kde是拟合


# 数据清洗 

train_df["Age"] = train_df["Age"].fillna(train_df["Age"].median()) # 中位数填充
test_df["Age"]  = test_df["Age"].fillna(train_df["Age"].median())
embarked_mode = train_df["Embarked"].mode()[0]
train_df["Embarked"] = train_df["Embarked"].fillna(embarked_mode) # mode 众数
test_df["Embarked"]  = test_df["Embarked"].fillna(embarked_mode)
test_df["Fare"]  = test_df["Fare"].fillna(train_df["Fare"].median())

# 提取信息，添加数据
train_df["Title"] = train_df["Name"].str.extract(r" ([A-Za-z]+)\.", expand=False)
test_df["Title"]  = test_df["Name"].str.extract(r" ([A-Za-z]+)\.", expand=False)
title_map = {
    "Mr":"Mr","Mrs":"Mrs","Miss":"Miss","Master":"Master",
    "Dr":"Rare","Rev":"Rare","Col":"Rare","Major":"Rare",
    "Lady":"Rare","Sir":"Rare","Countess":"Rare","Capt":"Rare"
}
train_df["Title"] = train_df["Title"].map(title_map).fillna("Rare")
test_df["Title"]  = test_df["Title"].map(title_map).fillna("Rare")
# 社会阶层信息
train_df["FamilySize"] = train_df["SibSp"] + train_df["Parch"] + 1
test_df["FamilySize"]  = test_df["SibSp"] + test_df["Parch"] + 1

train_df["IsAlone"] = (train_df["FamilySize"] == 1).astype(int)
test_df["IsAlone"]  = (test_df["FamilySize"] == 1).astype(int)

# 删除列 cabin属于缺太多数据了
train_df.drop(["PassengerId", "Name", "Ticket","Cabin"], axis=1, inplace=True)
test_df.drop(["PassengerId", "Name", "Ticket","Cabin"], axis=1, inplace=True)


# 独热编码
train_df = pd.get_dummies(train_df, columns=["Sex","Embarked","Title"], drop_first=True)
test_df  = pd.get_dummies(test_df, columns=["Sex","Embarked","Title"], drop_first=True)

DataUtils.read_data(train_df)

## 按训练集 对齐
X = train_df.drop("Survived", axis=1)
y = train_df["Survived"]
X_test = test_df[X.columns]  # 用训练集特征列对齐。

## 划分验证集
from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score # 

rf = RandomForestClassifier(n_estimators=200, random_state=42)
rf.fit(X_train, y_train)

val_pred = rf.predict(X_val)
print("RF acc:", accuracy_score(y_val, val_pred))


## 交叉验证
from sklearn.model_selection import cross_val_score

print(cross_val_score(rf, X, y, cv=5).mean())


#用全部训练数据重新训练
rf_final = RandomForestClassifier(n_estimators=200, random_state=42)
rf_final.fit(X, y)  # 用完整的 X 和 y，不再拆分
# 对测试集做预测
test_predictions = rf_final.predict(X_test)
# 构造提交文件
submission = pd.DataFrame({
    "PassengerId": pd.read_csv("test.csv")["PassengerId"],
    "Survived": test_predictions
})
submission.to_csv("submission.csv", index=False)