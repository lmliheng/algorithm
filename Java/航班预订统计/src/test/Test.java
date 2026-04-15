package 航班预订统计.src.test;

import 航班预订统计.src.main.Solution;

public class Test {
    public static void main(String[] args) {

        Solution solution = new Solution();

        int[][] bookings = {{1, 2, 10}, {2, 3, 20}, {2, 5, 25}};

        System.out.println(solution.corpFlightBookings(bookings, 5));



    }


}
