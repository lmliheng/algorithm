from object_ import UserObj 
try:
    u1=UserObj("小洪", 16, 90, ["篮球", "rap"])
    u1.age=130
except Exception as e:
    print("异常：",e)