/**
 *
 * @可取消函数
 *
 *
 */
/**
 *
 * @错误
 * 这里cancel 只是"忽略结果"，不是"中止执行"
 *
 */
export function Cancellable(fn) {
    return (...args) => {
        let cancelled = false;
        let rejectCancel;
        const promise = new Promise((resolve, reject) => {
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
                }
                else {
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
