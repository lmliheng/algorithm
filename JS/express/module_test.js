const sayhello = () => {
    console.log("hello world");
}

const typeerror=(msg)=>{
    throw new TypeError(msg);// 抛出类型错误
}

const test_trycatch=async()=>{
    try{
        typeerror("这是一个错误");
    }catch(err){
        console.log(err);
    }finally{
        console.log("finally");
    }
}



module.exports = {
    sayhello,
    typeerror,
    test_trycatch
}