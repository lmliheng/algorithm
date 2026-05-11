const user={
    name:"张三",
    age:18,
    sayhello(){
        console.log("hello world");
    }
}
const userValue=Object.values(user)
console.log(userValue);// [ '张三', 18, [Function: sayhello] ]
