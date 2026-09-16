
/**
 * @继承Array
 */
export class SuperArray<T> extends Array<T> {

    myMap<U>(callback: (currentValue: T, currenrIndex: number, array: T[]) => U, thisArg?: any): U[] {
        // 使用reduce完成
        return this.reduce((previousValue, currentValue, currentIndex, array) => {
            previousValue.push(callback.call(thisArg, currentValue, currentIndex, array))
            return previousValue
        }, [] as U[])
    }
}


