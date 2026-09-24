class UserObj:

    #类属性
    used='human'
    default_password=123456
    ## __str__ __repo__
    ## __xx__
    def __init__(self,name,age,score,liked,password=None):
        ## 私有变量用_password
        self.name=name
        self._age=age
        self.score=score
        self.liked=liked
        if(password is None):
            self._password=self.default_password

   ## 魔术方法

    # def __str__(self): # print方法打印，否则是UserObj('小明', 16, 92, ['篮球', '编程'])
    #     return f"{self.name}({self._age}岁, {self.score}分)"

    def __repr__(self):
        return f"UserObj('{self.name}', {self._age}, {self.score}, {self.liked})"

    ## 实例方法
    def canDone(self):
        print("啥也不能干")

    ## 静态方法
    @staticmethod
    def validate_age(age):
        """校验年龄是否合法"""
        return 0 <= age <= 150

    ## 类方法
    @classmethod
    def from_dict(cls, data: dict):
        """从字典创建实例（工厂方法）"""
        return cls(
            name=data['name'],
            age=data['age'],
            score=data['score'],
            liked=data['liked']
        )

    ## property注解 把方法变成像属性一样访问，适合做只读计算属性或带校验的 getter/setter。
    @property
    def age(self):
        return self._age
    @age.setter ## 属性名.setter
    def age(self,value): # 同名
        if(value>120 or value<0):
            raise ValueError('年龄不能超过120，小于0')
        self._age=value

    @property
    def grade_level(self):
        if self.score >= 90:
            return "优秀"
        elif self.score >= 60:
            return "及格"
        else:
            return "不及格"


if(__name__=="__main__"):
    u1 = UserObj("小明", 16, 92, ["篮球", "编程"])
    print(u1)
    print(u1.canDone())
    print(u1.age)
    print(u1._password)

    u1.age=18 # 触发setter
    print(u1)