package 第N个泰波那契数P1137.src.main;

public class Solution {
    public int tribonacci(int n) {
        int zero = 0;
        int first = 1;
        int second = 1;
        int third = 2;
        if(n == 0){return zero;}
        if(n == 1){return first;}
        if(n == 2){return second;}

        for (int i = 3; i <= n; i++) {
            third = first + second +zero;
            zero = first;
            first = second;
            second = third;


        }

        return third;

    }
}