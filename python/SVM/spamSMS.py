import jieba
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.calibration import CalibratedClassifierCV
import joblib

# ---------- 1. 读数据 ----------
texts = []
labels = []

# with open('data/chinese_sms.txt', 'r', encoding='utf-8') as f:
#     for line in f:
#         line = line.rstrip('\n')
#         if not line.strip():
#             continue
#         label, text = line.split('\t')
#         labels.append(int(label))
#         texts.append(text)

df=pd.read_csv('data/train.csv')
for i in range(len(df)):
        labels.append(int(df.iloc[i]['label']))
        texts.append(df.iloc[i]['text'])

# ---------- 2. 中文分词 ----------
def cut_text(text):
    return ' '.join(jieba.lcut(text))

corpus = [cut_text(t) for t in texts]

# ---------- 3. TF-IDF ----------
vectorizer = TfidfVectorizer(
    max_features=5000,
    min_df=1,
    ngram_range=(1, 2),
    sublinear_tf=True
)

X = vectorizer.fit_transform(corpus)
y = labels

# ---------- 4. 划分训练/测试 ----------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# ---------- 5. 线性 SVM ----------
model = LinearSVC(
    C=1.0,
    class_weight='balanced',
    max_iter=10000,
    random_state=42
)

# 训练（不用 CalibratedClassifierCV，避免属性丢失）
model.fit(X_train, y_train)

# ---------- 6. 评估 ----------
y_pred = model.predict(X_test)
print("=== 分类报告 ===")
print(classification_report(y_test, y_pred, target_names=['正常', '垃圾'], zero_division=0))

print("=== 混淆矩阵 ===")
print(confusion_matrix(y_test, y_pred))

# ---------- 7. 看模型学到了什么 ----------
coef = model.coef_.ravel()
feature_names = vectorizer.get_feature_names_out()

top_spam = coef.argsort()[-10:][::-1]
top_ham = coef.argsort()[:10]

print("\n垃圾短信强特征词：")
for i in top_spam:
    print(feature_names[i], round(coef[i], 3))

print("\n正常短信强特征词：")
for i in top_ham:
    print(feature_names[i], round(coef[i], 3))

# ---------- 8. 保存模型 ----------
joblib.dump(model, 'model/spam_svm_model.pkl')
joblib.dump(vectorizer, 'model/spam_tfidf.pkl')
print("\n模型已保存")