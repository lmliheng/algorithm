    const checkString=(str:string)=>{
        if(str.length===0){
            return true
        }
        let stack=[]
        for(let i=0;i<str.length;i++){
            if(str[i]==='('){
                stack.push('(')
            }else{
                // ')'
                if(stack[stack.length-1]==='('){
                    stack.pop()
                }else{
                    return false
                }
            }
        }
        return stack.length===0
    }

    console.log(checkString('(()())'))