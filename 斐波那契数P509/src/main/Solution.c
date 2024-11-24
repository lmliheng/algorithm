package 斐波那契数P509.src.main;

public class Solution {
    public int fib(int n) {

        int two=1,zero=0,one=1;
        if(n==0){return zero;}
        if(n==1){return one;}

        for (int i=2;i<=n;i++){

            two = zero+one;
            zero = one;
            one = two;

        }
        return two;


    }
}