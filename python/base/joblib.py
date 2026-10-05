import joblib

model=1
joblib.dump(model, 'model/spam_svm_model.pkl')
model=joblib.load('model/spam_svm_model.pkl')
