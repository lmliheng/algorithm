/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
s=s.trim()
 let stack=[]
 let num=0
 let res=0
 let signal=1
 for(let i=0;i<s.length;i++){
    if(s[i]>='0'&&s[i]<='9'){
        //处理多位数
        num=num*10+(+s[i])
    }else if(s[i]==='+'){
        res=signal*num+res
        num=0
        signal=1

    }else if(s[i]==='-'){
        res=res+signal*num
        num=0
        signal=-1
    }else if(s[i]==='('){
        // 入栈顺序
        stack.push(res)
        stack.push(signal)
        
        res=0
        signal=1
    }else if(s[i]===')'){
        res=res+signal*num
        num=0
        res=stack.pop()*res
        res=stack.pop()+res
    }
 }

return res+signal*num

//  if(!(s[s.length-1]===')')){
   
//     return res+(+s[s.length-1])

//  }else{
//     return res
//  }
};

console.log(calculate(" 22 111"))