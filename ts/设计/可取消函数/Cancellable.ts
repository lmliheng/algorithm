
/**
 * 
 * @可取消函数
 * 
 * 
 */

type CancellableFn<T extends any[], R> = (...args: T) => {
    promise: Promise<R>;
    cancel: () => void;
};
/**
 * 
 * @错误
 * 这里cancel 只是"忽略结果"，不是"中止执行"
 * 
 */
export function Cancellable<T extends any[], R>(fn: (...args: T) => Promise<R>): CancellableFn<T, R> {

    return (...args: T) => {
        let cancelled = false;
        let rejectCancel: (reason: Error) => void;

        const promise = new Promise<R>((resolve, reject) => {
            rejectCancel = reject;

            // 如果创建前就已经 cancel 了，直接拒绝
            if (cancelled) {
                reject(new Error('Cancelled'));
                return;
            }

            fn(...args)
                .then((result) => {
                    if (cancelled) {
                        reject(new Error('Cancelled'));
                    } else {
                        resolve(result);
                    }
                })
                .catch(reject);
        });

        return {
            promise,
            cancel: () => {
                cancelled = true;
                rejectCancel?.(new Error('Cancelled'));
            },
        };
    };
}


