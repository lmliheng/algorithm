package 航班预订统计.src.main;

import java.util.Arrays;

public class Solution {
    public int[] corpFlightBookings(int[][] bookings, int n) {
// 如何补全booking至5*3
        int[][] paddedBookings = padBookings(bookings, 3,5);
        int[] answer = new int[n];
        for(int i=1;i<=n;++i){
            for(int j=paddedBookings[1][i];j<=paddedBookings[2][i];++i){
                answer[j]+=paddedBookings[3][i];
            }

        }

        return answer;
    }

    public int[][] padBookings(int[][] bookings, int targetRows, int targetColumns) {
        int currentRows = bookings.length;
        int currentColumns = bookings.length > 0 ? bookings[0].length : 0;

        // 创建一个新的数组，大小为目标行数和列数
        int[][] paddedBookings = new int[targetRows][targetColumns];

        // 将原始数据复制到新数组中
        for (int i = 0; i < currentRows; i++) {
            for (int j = 0; j < currentColumns && j < targetColumns; j++) {
                paddedBookings[i][j] = bookings[i][j];
            }
        }

        // 填充剩余的行
        for (int i = currentRows; i < targetRows; i++) {
            Arrays.fill(paddedBookings[i], 0);
        }

        // 填充每行剩余的列
        for (int i = 0; i < targetRows; i++) {
            for (int j = currentColumns; j < targetColumns; j++) {
                paddedBookings[i][j] = 0;
            }
        }

        return paddedBookings;
    }
}



