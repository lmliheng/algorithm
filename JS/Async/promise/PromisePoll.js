"use strict";
/**
 * @Promise对象池
 *
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function promisePool(functions, n) {
    return __awaiter(this, void 0, void 0, function* () {
        let i = 0;
        const work = () => __awaiter(this, void 0, void 0, function* () {
            while (i < functions.length) {
                const idx = i++;
                yield functions[idx]();
            }
        });
        // 数组内放n个work并发执行
        yield Promise.all(Array(n).fill(0).map(() => work));
    });
}
if (process.argv[2] == 'test') {
    const tasks = [
        () => new Promise(r => { console.log('A start'); setTimeout(() => { console.log('A done'); r(1); }, 1000); }),
        () => new Promise(r => { console.log('B start'); setTimeout(() => { console.log('B done'); r(2); }, 500); }),
        () => new Promise(r => { console.log('C start'); setTimeout(() => { console.log('C done'); r(2); }, 1500); }),
    ];
    console.log('start');
    promisePool(tasks, 2).then(() => console.log('all done'));
}
