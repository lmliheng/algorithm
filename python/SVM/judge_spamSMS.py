import jieba
import joblib

model = joblib.load('spam_svm_model.pkl')
vectorizer = joblib.load('spam_tfidf.pkl')

def predict_spam(text):
    seg = ' '.join(jieba.lcut(text))
    X = vectorizer.transform([seg])
    decision = model.decision_function(X)[0]  # 用decision_function代替predict_proba
    label = model.predict(X)[0]
    return ('垃圾短信' if label == 1 else '正常短信'), decision

tests = [
    # === 垃圾短信（应该被拦截）===
    "免费送iPhone点击链接马上领取",
    "您的白条额度已提升加微信办理",
    "恭喜您中奖了回复TD退订",
    "无抵押贷款当天放款联系VX",
    "您的积分即将过期请点击兑换",
    "刷单返利日赚300联系客服",
    "澳门赌场上线啦注册送彩金",
    "您的ETC已过期请点击认证",
    "淘宝好评返现加微信领红包",
    "您的社保账户异常点击处理",
    
    # === 边缘案例（容易误判）===
    "免费咨询热线400-800-8888",        # 含"免费"但可能是正规客服
    "点击下方链接查看会议纪要",          # 含"点击""链接"但可能是正常工作
    "您的快递已到达请凭码领取",          # 正常物流通知
    "邀请您参加免费体检活动",            # 含"免费"但可能是社区活动
    
    # === 正常短信（不应该被拦截）===
    "爸我放学了马上回家",
    "明天一起吃饭别忘带伞",
    "今晚加班晚点回去不用等我吃饭",
    "你的快递放在丰巢柜了验证码1234",
    "本周六同学聚会地点在老地方",
    "收到请回复明天上午九点开会",
]

for t in tests:
    label, score = predict_spam(t)
    print(f"{label}  得分={score:.3f}  -> {t}")