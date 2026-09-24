package com.algorithm;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TestMerge {

    private final Alogorithm algorithm = new Alogorithm();

    @Test
    public void testBasicCase() {
        int[][] input = {{1,3},{2,6},{8,10},{15,18}};
        int[][] expected = {{1,6},{8,10},{15,18}};
        assertArrayEquals(expected, algorithm.merge(input));
    }

    @Test
    public void testEmptyInput() {
        int[][] input = {};
        int[][] expected = {};
        assertArrayEquals(expected, algorithm.merge(input));
    }

    @Test
    public void testSingleInterval() {
        int[][] input = {{1,5}};
        int[][] expected = {{1,5}};
        assertArrayEquals(expected, algorithm.merge(input));
    }

    @Test
    public void testAllOverlapping() {
        int[][] input = {{1,4},{2,5},{3,6}};
        int[][] expected = {{1,6}};
        assertArrayEquals(expected, algorithm.merge(input));
    }

    @Test
    public void testNoOverlap() {
        int[][] input = {{1,2},{3,4},{5,6}};
        int[][] expected = {{1,2},{3,4},{5,6}};
        assertArrayEquals(expected, algorithm.merge(input));
    }

    @Test
    public void testAdjacentIntervals() {
        int[][] input = {{1,3},{3,6}};
        int[][] expected = {{1,6}};
        assertArrayEquals(expected, algorithm.merge(input));
    }
}